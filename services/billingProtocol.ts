// services/billingProtocol.ts

"use client";

import { encodeFunctionData, PublicClient, type Address } from "viem";

import type { KernelAccountClient, CreateKernelAccountReturnType,} from "@zerodev/sdk";

// import type { KernelSmartAccount } from "@zerodev/sdk";

import protocolAbi from "@/abi/Web3BillingProtocol.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type KernelAccount =
    CreateKernelAccountReturnType<"0.7">;


export interface BillingProtocolContext {
  kernel: KernelAccount;

  kernelClient: KernelAccountClient;
}

export interface SubscribeParams extends BillingProtocolContext {
  planId: bigint;

  smartAccount: Address;

  permissionId: `0x${string}`;

  publicClient: PublicClient;


}

export interface PauseSubscriptionParams extends BillingProtocolContext {
  subscriptionId: bigint;
}

export interface ResumeSubscriptionParams extends BillingProtocolContext {
  subscriptionId: bigint;
}

export interface CancelSubscriptionParams extends BillingProtocolContext {
  subscriptionId: bigint;
}

export type SubscriptionCreatedArgs = {
        subscriptionId: bigint,
        planId: bigint;
        subscriber: string;
    };

/* -------------------------------------------------------------------------- */
/* Subscribe                                                                   */
/* -------------------------------------------------------------------------- */

export async function subscribeToBillingPlan({
  kernel,

  kernelClient,

  planId,

  smartAccount,

  permissionId,

  publicClient
}: SubscribeParams) {
  /*
    --------------------------------------------------------------------------
    Encode subscribe()
    --------------------------------------------------------------------------
    */

  const data = encodeFunctionData({
    abi: protocolAbi,

    functionName: "subscribe",

    args: [planId, smartAccount, permissionId],
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

  const hash = await kernelClient.sendUserOperation({
    callData,
  });

  /*
    --------------------------------------------------------------------------
    Wait For Receipt
    --------------------------------------------------------------------------
    */

  const receipt = await kernelClient.waitForUserOperationReceipt({
    hash,
  });

  const events =
    await publicClient.getContractEvents({
        address: process.env.NEXT_PUBLIC_BILLING_CONTRACT_ADDRESS as Address,
        abi: protocolAbi,
        eventName: "SubscriptionCreated",
        fromBlock: receipt.receipt.blockNumber,
        toBlock: receipt.receipt.blockNumber,
    });

  if(events.length !== 1) {
    throw new Error("SubscriptionCreated event not emitted.");
  }

  const subscriptionCreated = events[0];

  if (!("args" in subscriptionCreated)) {
      throw new Error("SubscriptionCreated event has no args.");
  }

  const argsSubscriptionCreated = subscriptionCreated.args as SubscriptionCreatedArgs;


  return {
    userOperationHash: hash,

    receipt,

    subscriptionId: argsSubscriptionCreated.subscriptionId
  };
}

/* -------------------------------------------------------------------------- */
/* Pause Subscription                                                          */
/* -------------------------------------------------------------------------- */

export async function pauseSubscription({
  kernel,

  kernelClient,

  subscriptionId,
}: PauseSubscriptionParams) {
  /*
    --------------------------------------------------------------------------
    Encode pauseSubscription()
    --------------------------------------------------------------------------
    */

  const data = encodeFunctionData({
    abi: protocolAbi,

    functionName: "pauseSubscription",

    args: [subscriptionId],
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

  const hash = await kernelClient.sendUserOperation({
    callData,
  });

  /*
    --------------------------------------------------------------------------
    Wait For Receipt
    --------------------------------------------------------------------------
    */

  const receipt = await kernelClient.waitForUserOperationReceipt({
    hash,
  });



  return {
    userOperationHash: hash,

    receipt,
  };
}

/* -------------------------------------------------------------------------- */
/* Resume Subscription                                                         */
/* -------------------------------------------------------------------------- */

export async function resumeSubscription({
  kernel,

  kernelClient,

  subscriptionId,
}: ResumeSubscriptionParams) {
  /*
    --------------------------------------------------------------------------
    Encode resumeSubscription()
    --------------------------------------------------------------------------
    */

  const data = encodeFunctionData({
    abi: protocolAbi,

    functionName: "resumeSubscription",

    args: [subscriptionId],
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

  const hash = await kernelClient.sendUserOperation({
    callData,
  });

  /*
    --------------------------------------------------------------------------
    Wait For Receipt
    --------------------------------------------------------------------------
    */

  const receipt = await kernelClient.waitForUserOperationReceipt({
    hash,
  });

  return {
    userOperationHash: hash,

    receipt,
  };
}

/* -------------------------------------------------------------------------- */
/* Cancel Subscription                                                         */
/* -------------------------------------------------------------------------- */

export async function cancelSubscription({
  kernel,

  kernelClient,

  subscriptionId,
}: CancelSubscriptionParams) {
  /*
    --------------------------------------------------------------------------
    Encode cancelSubscription()
    --------------------------------------------------------------------------
    */

  const data = encodeFunctionData({
    abi: protocolAbi,

    functionName: "cancelSubscription",

    args: [subscriptionId],
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

  const hash = await kernelClient.sendUserOperation({
    callData,
  });

  /*
    --------------------------------------------------------------------------
    Wait For Receipt
    --------------------------------------------------------------------------
    */

  const receipt = await kernelClient.waitForUserOperationReceipt({
    hash,
  });

  return {
    userOperationHash: hash,

    receipt,
  };
}



export interface ApproveBillingOperatorParams
    extends BillingProtocolContext {

    merchantId: bigint;

    operator: Address;
}

export async function approveBillingOperator({
    kernel,
    kernelClient,
    merchantId,
    operator,
}: ApproveBillingOperatorParams) {

    const data = encodeFunctionData({
        abi: protocolAbi,
        functionName: "approveBillingOperator",
        args: [
            merchantId,
            operator,
        ],
    });

    const callData = await kernel.encodeCalls([
        {
            to: CONTRACT_ADDRESS as Address,
            value: 0n,
            data,
        },
    ]);

    const hash =
        await kernelClient.sendUserOperation({
            callData,
        });

    const receipt =
        await kernelClient.waitForUserOperationReceipt({
            hash,
        });

    return {
        userOperationHash: hash,
        receipt,
    };
}

