// services/billingProtocol.ts

"use client";

import { encodeFunctionData, type Address } from "viem";

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

/* -------------------------------------------------------------------------- */
/* Subscribe                                                                   */
/* -------------------------------------------------------------------------- */

export async function subscribeToBillingPlan({
  kernel,

  kernelClient,

  planId,

  smartAccount,

  permissionId,
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

  return {
    userOperationHash: hash,

    receipt,
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
