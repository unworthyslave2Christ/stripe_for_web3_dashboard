// hooks/useCreatePlan.ts

"use client";

import { useCallback, useState } from "react";

import { useWalletClient, usePublicClient } from "wagmi";

import type { Address } from "viem";

import { createPlan } from "@/services/plans";

export interface CreateBillingPlanParams {
  name: string;

  paymentToken: Address;

  amount: bigint;

  billingInterval: bigint;

  trialPeriod?: bigint;

  maxSubscribers?: number | null;

  metadataURI?: string;

  billingPeriodNamed: string;

  trialPeriodNamed: string;
}

export function useCreatePlan() {
  const { data: walletClient } = useWalletClient();

  const publicClient = usePublicClient();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const [planId, setPlanId] = useState<bigint | null>(null);

  const [userOpHash, setUserOpHash] = useState<`0x${string}` | null>(null);

  const createBillingPlan = useCallback(
    async (params: CreateBillingPlanParams) => {
      if (!walletClient) {
        throw new Error("Wallet not connected.");
      }

      if (!publicClient) {
        throw new Error("Public client unavailable.");
      }

      setLoading(true);

      setError(null);

      try {
        const result = await createPlan({
          walletClient,

          publicClient,

          contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,

          name: params.name,

          paymentToken: params.paymentToken,

          amount: params.amount,

          billingInterval: params.billingInterval,

          trialPeriod: params.trialPeriod,

          maxSubscribers: params.maxSubscribers,

          metadataURI: params.metadataURI,

          billingPeriodNamed: params.billingPeriodNamed,

          trialPeriodNamed: params.trialPeriodNamed
        });

        setPlanId(result.planId);

        setUserOpHash(result.userOpHash);

        return result;
      } catch (err) {
        const e =
          err instanceof Error
            ? err
            : new Error("Failed to create billing plan.");

        setError(e);

        throw e;
      } finally {
        setLoading(false);
      }
    },

    [walletClient, publicClient],
  );

  return {
    createBillingPlan,

    loading,

    error,

    planId,

    userOpHash,
  };
}
