"use client";

import { useState } from "react";

import { useWalletClients } from "@/hooks/useWalletClients";

import {
  modifySubscriptionService,
  ModifySubscriptionParams,
} from "@/services/subscription";
import { getCustomerKernel } from "@/services/customer";

type ModifySubscriptionInput = Omit<
    ModifySubscriptionParams,
    "kernel" |
    "kernelClient" |
    "publicClient" |
    "customer"
>;

export function useSubscriptions() {
  const {
    walletClient,

    publicClient,
  } = useWalletClients();

  const [loading2, setLoading2] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const [modificationSuccessful, setModificationSuccessful] =
          useState(false);

  async function modifySubscription({
    subscriptionId,
    operation,
    statusValue,
    apiSegment,
}: ModifySubscriptionInput) {
    if (!walletClient) {
      throw new Error("Wallet not connected.");
    }

    if (!publicClient) {
      throw new Error("Public client unavailable.");
    }

    try {
      setLoading2(true);

      setError(null);

      setModificationSuccessful(false);

      const {
        customer,

        kernel,

        kernelClient
      } = await getCustomerKernel(walletClient, publicClient);

      await modifySubscriptionService({
        kernel: kernel,

        kernelClient: kernelClient,

        publicClient,

        customer,

        subscriptionId,

        operation,

        statusValue,

        apiSegment,
      });

      setModificationSuccessful(true)
      setLoading2(false);
    } catch (err) {
      const e =
        err instanceof Error
          ? err
          : new Error("Unable to update subscription.");

      setError(e);
        setModificationSuccessful(false)
      throw e;
    } finally {
      setLoading2(false);
    }
  }

  return {
    modifySubscription,

    loading2,

    error,

    modificationSuccessful
  };
}
