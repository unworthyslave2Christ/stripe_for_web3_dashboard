// services/plans.ts

import {
  encodeFunctionData,
  type Address,
  type PublicClient,
  type WalletClient,
} from "viem";

import protocolAbi from "@/abi/Web3BillingProtocol.json";

import { getMerchantKernel } from "@/services/merchant";
import { createKernelAccountClient } from "@zerodev/sdk";

import { arbitrumSepolia } from "viem/chains";

import { BillingProtocolContext } from "./billingProtocol";
import { BillingPlan } from "@/types/dashboard";

import { redirect } from "next/navigation";


const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address;

export interface CreatePlanParams {
  walletClient: WalletClient;

  publicClient: PublicClient;

  contractAddress: Address;

  name: string;

  paymentToken: Address;

  amount: bigint;

  billingInterval: bigint;

  trialPeriod?: bigint;

  maxSubscribers?: number | null;

  metadataURI?: string;

  billingPeriodNamed?: string;

  trialPeriodNamed?: string;
}

export async function createPlan({
  walletClient,

  publicClient,

  contractAddress,

  name,

  paymentToken,

  amount,

  billingInterval,

  trialPeriod = 0n,

  maxSubscribers = null,

  metadataURI = "",

  billingPeriodNamed,

  trialPeriodNamed,
}: CreatePlanParams) {
  /*
   --------------------------------------------------------------------------
   Rebuild Merchant Kernel
   --------------------------------------------------------------------------
   */

  const { merchant, kernel } = await getMerchantKernel(
    walletClient,
    publicClient,
  );

  console.log("Kernel client:", kernel.client);
  console.log("Bundler RPC:", process.env.NEXT_BUNDLER_RPC);
  console.log("Public RPC:", process.env.RPC_URL);

  //   const [ownerWallet] = await walletClient.getAddresses();

  /*
    --------------------------------------------------------------------------
    Safety Check
    --------------------------------------------------------------------------
    */

  if (kernel.address.toLowerCase() !== merchant.smart_account.toLowerCase()) {
    throw new Error("Connected wallet is not the merchant owner.");
  }

  /*
    --------------------------------------------------------------------------
    Encode Contract Call
    --------------------------------------------------------------------------
    */

  console.log({
    contractAddress,
    paymentToken,
    merchant,
    kernel,
    account: kernel.account,
  });

  const callData = await kernel.account.encodeCalls([
    {
      to: contractAddress,

      value: 0n,

      data: encodeFunctionData({
        abi: protocolAbi,

        functionName: "createPlan",

        args: [
          BigInt(merchant.merchant_id),

          name,

          paymentToken,

          amount,

          billingInterval,
        ],
      }),
    },
  ]);

  /*
    --------------------------------------------------------------------------
    Submit UserOperation
    --------------------------------------------------------------------------
    */

  const userOpHash = await kernel.client!.sendUserOperation({
    callData,
  });

  /*
    --------------------------------------------------------------------------
    Wait For Receipt
    --------------------------------------------------------------------------
    */

  const userOpReceipt = await kernel.client!.waitForUserOperationReceipt({
    hash: userOpHash,
  });

  const receipt = userOpReceipt.receipt;

  /*
    --------------------------------------------------------------------------
    Retrieve PlanCreated Event
    --------------------------------------------------------------------------
    */

  const events = await publicClient.getContractEvents({
    address: contractAddress,

    abi: protocolAbi,

    eventName: "PlanCreated",

    fromBlock: receipt.blockNumber,

    toBlock: receipt.blockNumber,
  });

  if (events.length !== 1) {
    throw new Error("PlanCreated event not found.");
  }

  const planId = (events[0] as any).args.planId as bigint;

  /*
    --------------------------------------------------------------------------
    Mirror Into Supabase
    --------------------------------------------------------------------------
    */

  const response = await fetch(
    "/api/plans",

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        planId: Number(planId),

        merchantId: merchant.merchant_id,

        paymentToken,

        amount: amount.toString(),

        billingIntervalSeconds: Number(billingInterval),

        trialPeriod: Number(trialPeriod),

        maxSubscribers,

        metadataURI,

        name,

        billingPeriodNamed,

        trialPeriodNamed,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.error ?? "Unable to mirror billing plan.");
  }

  /*
    --------------------------------------------------------------------------
    Return
    --------------------------------------------------------------------------
    */

  return {
    merchant,

    kernel,

    planId,

    userOpHash,

    receipt,
  };
}

export interface PausePlanParams extends BillingProtocolContext {
  planId: bigint;
  publicClient: PublicClient;
}

export interface ModifyPlanParams extends BillingProtocolContext {
  planId: bigint;
  publicClient: PublicClient;
  operation: string;
  statusValue: number;
  apiSegment: string;
}

export interface UpdatePlanParams extends BillingProtocolContext{
  publicClient: PublicClient;
  planId: bigint;
  originalPlan: BillingPlan;
  updatedPlan: BillingPlan;
  merchant: any;
}

export interface ArchivePlanParams extends BillingProtocolContext {
  planId: bigint;
  publicClient: PublicClient;
}

export async function modifyPlanService({
  kernel,
  kernelClient,
  planId,
  publicClient,
  operation,
  statusValue,
  apiSegment,
}: ModifyPlanParams) {
  const data = encodeFunctionData({
    abi: protocolAbi,

    functionName: operation,

    args: [planId],
  });

  /*
       --------------------------------------------------------------------------
       Encode Kernel Call
       --------------------------------------------------------------------------
       */

  const callData = await kernel.encodeCalls([
    {
      to: CONTRACT_ADDRESS as Address,

      value: 0n,

      data,
    },
  ]);

  /*
       --------------------------------------------------------------------------
       Send UserOperation
       --------------------------------------------------------------------------
       */

  const userOpHash = await kernelClient.sendUserOperation({
    callData,
  });

  /*
       --------------------------------------------------------------------------
       Wait For Receipt
       --------------------------------------------------------------------------
       */

  const userOpReceipt = await kernelClient.waitForUserOperationReceipt({
    hash: userOpHash,
  });

  const receipt = userOpReceipt.receipt;

  /*
      --------------------------------------------------------------------------
      Retrieve PlanCreated Event
      --------------------------------------------------------------------------
      */

  const events = await publicClient.getContractEvents({
    address: CONTRACT_ADDRESS,

    abi: protocolAbi,

    eventName: "PlanStatusChanged",

    fromBlock: receipt.blockNumber,

    toBlock: receipt.blockNumber,
  });

  if (events.length !== 1) {
    throw new Error("PlanStatusChanged event not found.");
  }

  const planIdReceived = (events[0] as any).args.planId as bigint;
  const planStatus = (events[0] as any).args.status as bigint;

  if (
    Number(planIdReceived) != Number(planId) ||
    Number(planStatus) != statusValue
  ) {
    throw new Error("Wrong Plan Status or Plan Id");
  }

  /*
      --------------------------------------------------------------------------
      Mirror Into Supabase
      --------------------------------------------------------------------------
      */

  const response = await fetch(
    `/api/plans/${apiSegment}`,

    {
      method: "POST",

      cache: "no-store",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        planId: Number(planId),
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.error ?? `Unable to mirror plan ${apiSegment}.`);
  }
}


export async function updatePlanService({
    kernel,
    kernelClient,
    publicClient,
    planId,
    originalPlan,
    updatedPlan,
    merchant
}:UpdatePlanParams){

  console.log("updatedPlan: ", updatedPlan);

  const encodedData1 = encodeFunctionData({
    abi: protocolAbi,

    functionName: "updatePlanAmount",

    args: [planId, updatedPlan.amount],
  });

  const encodedData2 = encodeFunctionData({
    abi: protocolAbi,

    functionName: "updatePlanName",

    args: [planId, updatedPlan.name],
  });

  const encodedData3 = encodeFunctionData({
    abi: protocolAbi,

    functionName: "updatePlanInterval",

    args: [planId, updatedPlan.billing_interval_seconds],
  });

  console.log(" updatedPlan.paymentToken: ",  updatedPlan.paymentToken);

  const encodedData4 = encodeFunctionData({
    abi: protocolAbi,

    functionName: "updatePlanPaymentToken",

    args: [planId, updatedPlan.payment_token],
  });

  const encodedData5 = encodeFunctionData({
    abi: protocolAbi,

    functionName: "updateTrialPeriod",

    args: [planId, updatedPlan.trial_period],
  });

  const encodedData6 = encodeFunctionData({
    abi: protocolAbi,

    functionName: "updateMaxSubscribers",

    args: [planId, updatedPlan.maxSubscribers],
  });

  const encodedData7 = encodeFunctionData({
    abi: protocolAbi,

    functionName: "setAutoRenewal",

    args: [planId, updatedPlan.allow_renewal],
  });

  /*
       --------------------------------------------------------------------------
       Encode Kernel Call
       --------------------------------------------------------------------------
       */

  const callData = await kernel.encodeCalls([
    {
      to: CONTRACT_ADDRESS as Address,

      value: 0n,

      data: encodedData1,
    },
    {
      to: CONTRACT_ADDRESS as Address,

      value: 0n,

      data: encodedData2,
    },
    {
      to: CONTRACT_ADDRESS as Address,

      value: 0n,

      data: encodedData3,
    },
    {
      to: CONTRACT_ADDRESS as Address,

      value: 0n,

      data: encodedData4,
    },
    {
      to: CONTRACT_ADDRESS as Address,

      value: 0n,

      data: encodedData5,
    },
    {
      to: CONTRACT_ADDRESS as Address,

      value: 0n,

      data: encodedData6,
    },
    {
      to: CONTRACT_ADDRESS as Address,

      value: 0n,

      data: encodedData7,
    },
  ]);

  /*
       --------------------------------------------------------------------------
       Send UserOperation
       --------------------------------------------------------------------------
       */

  const userOpHash = await kernelClient.sendUserOperation({
    callData,
  });

  /*
       --------------------------------------------------------------------------
       Wait For Receipt
       --------------------------------------------------------------------------
       */

  const userOpReceipt = await kernelClient.waitForUserOperationReceipt({
    hash: userOpHash,
  });

  const receipt = userOpReceipt.receipt;

  /*
      --------------------------------------------------------------------------
      Retrieve PlanCreated Event
      --------------------------------------------------------------------------
      */

  const events = await publicClient.getContractEvents({
    address: CONTRACT_ADDRESS,

    abi: protocolAbi,

    eventName: "PlanUpdated",

    fromBlock: receipt.blockNumber,

    toBlock: receipt.blockNumber,
  });

  if (events.length !== 7) {
    throw new Error("PlanUpdated events not found or not emitted");
  }

  const planId0 = (events[0] as any).args.planId as bigint;
  const planId1 = (events[1] as any).args.planId as bigint;
  const planId2 = (events[2] as any).args.planId as bigint;
  const planId3 = (events[3] as any).args.planId as bigint;
  const planId4 = (events[4] as any).args.planId as bigint;
  const planId5 = (events[5] as any).args.planId as bigint;
  const planId6 = (events[6] as any).args.planId as bigint;

  if (
      (planId0 == planId1) && 
      (planId0 == planId2) && 
      (planId0 == planId3) &&
      (planId0 == planId4) && 
      (planId0 == planId5) && 
      (planId0 == planId6) 
  )
  {
    ;
  } else {
    throw new Error("Plan Id mismatch across updates");
  }



  /*
    --------------------------------------------------------------------------
    Mirror Into Supabase
    --------------------------------------------------------------------------
    */

  const response = await fetch(
    "/api/plans",

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        planId: Number(planId),

        merchantId: merchant.merchant_id,

        paymentToken: updatedPlan.payment_token,

        amount: updatedPlan.amount.toString(),

        billingIntervalSeconds: Number(updatedPlan.billing_interval_seconds),

        trialPeriod: Number(updatedPlan.trial_period),

        maxSubscribers: updatedPlan.maxSubscribers,

        metadataURI: updatedPlan.metadataURI,

        name: updatedPlan.name,

        billingPeriodNamed: updatedPlan.billingPeriodNamed,

        trialPeriodNamed: updatedPlan.trialPeriodNamed
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.error ?? "Unable to mirror billing plan.");
  }

  /*
    --------------------------------------------------------------------------
    Return
    --------------------------------------------------------------------------
    */

    

  // return {
  //   merchant,

  //   kernel,

  //   planId,

  //   userOpHash,

  //   receipt,
  // };
}

