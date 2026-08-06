"use client";

import type { Address } from "viem";
import type { Subscription } from "@/types/dashboard";
import type {Customer} from "@/types/dashboard";

export interface MirrorSubscriptionParams {
  subscriptionId: number;

  customerId: string;

  merchantId: number;

  planId: number;

  planBillingIntervalSeconds: number;

  smartAccount: Address;

  transactionHash: `0x${string}`;

  permissionId: `0x${string}`;
}

export interface SubscriptionRecord extends Subscription {
  transactionHash: `0x${string}`;
}

/* -------------------------------------------------------------------------- */
/* Mirror Subscription                                                         */
/* -------------------------------------------------------------------------- */

// 0xA6B0921999d8D862B87eaCb3DDA1eb8805a096cD MockERC20
// 0xb5161Ce568ab94eF2AD55BBd823d5d3F3eEBbdCE MockERC20_2

export async function mirrorSubscription(
  payload: MirrorSubscriptionParams,
): Promise<SubscriptionRecord> {
  const response = await fetch("/api/customers/subscriptions", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.error ?? "Unable to mirror subscription.");
  }

  return await response.json();
}

/* -------------------------------------------------------------------------- */
/* Customer Subscriptions                                                      */
/* -------------------------------------------------------------------------- */

export async function getCustomerSubscriptions(
  customerId: string,
): Promise<SubscriptionRecord[]> {
  const response = await fetch(`/api/customers/${customerId}/subscriptions`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch subscriptions.");
  }

  return await response.json();
}

/* -------------------------------------------------------------------------- */
/* Subscription                                                                */
/* -------------------------------------------------------------------------- */

export async function getSubscription(
  subscriptionId: number,
): Promise<SubscriptionRecord | null> {
  const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to load subscription.");
  }

  return await response.json();
}

import { encodeFunctionData } from "viem";

import { createKernelAccount, type KernelAccountClient} from "@zerodev/sdk";

import protocolAbi from "@/abi/Web3BillingProtocol.json";

import { CONTRACT_ADDRESS } from "@/constants";

type KernelSmartAccount = Awaited<
    ReturnType<typeof createKernelAccount>
>



export interface ModifySubscriptionParams {
  kernel: KernelSmartAccount;

  kernelClient: KernelAccountClient;

  publicClient: any;

  customer: Customer;

  subscriptionId: bigint;

  operation: "pauseSubscription" | "resumeSubscription" | "cancelSubscription";

  statusValue: number;

  apiSegment: "pause" | "resume" | "cancel";
}

export async function modifySubscriptionService({
  kernel,

  kernelClient,

  publicClient,

  customer,

  subscriptionId,

  operation,

  statusValue,

  apiSegment,
}: ModifySubscriptionParams) {
  /*
    --------------------------------------------------------------------------
    Encode Contract Call
    --------------------------------------------------------------------------
    */

  const encodedData = encodeFunctionData({
    abi: protocolAbi,

    functionName: operation,

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

      data: encodedData,
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
    Verify On-chain State
    --------------------------------------------------------------------------
    */

  const subscription = await publicClient.readContract({
    address: CONTRACT_ADDRESS,

    abi: protocolAbi,

    functionName: "getSubscription",

    args: [subscriptionId],
  });

  if (Number(subscription.status) !== statusValue) {
    throw new Error("Subscription state verification failed.");
  }

  /*
    --------------------------------------------------------------------------
    Mirror Into Supabase
    --------------------------------------------------------------------------
    */

    console.log("apiSegment: ", apiSegment);

  const response = await fetch(
    `/api/subscriptions/${apiSegment}`,

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        subscriptionId: Number(subscriptionId),

        customerId: customer.customer_id,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.error ?? `Unable to ${apiSegment} subscription.`);
  }

  /*
    --------------------------------------------------------------------------
    Return
    --------------------------------------------------------------------------
    */

  return {
    userOpHash,

    receipt,

    subscription,
  };
}
