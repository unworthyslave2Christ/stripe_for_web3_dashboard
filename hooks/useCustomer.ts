"use client";

import { useState } from "react";

import { usePublicClient, useWalletClient } from "wagmi";

import { createCustomer, createCustomerKernel, getCustomerByWallet} from "@/services/customer";

export function useCustomer() {
  const publicClient = usePublicClient();

  const { data: walletClient } = useWalletClient();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string>();

  async function registerCustomer(
    displayName: string,

    email: string,
  ) {
    if (!walletClient) throw new Error("Wallet not connected.");

    if (!publicClient) throw new Error("Public client unavailable.");

    setLoading(true);

    setError(undefined);

    try {
      /*
       * ----------------------------------------------------------
       * Connected wallet
       * ----------------------------------------------------------
       */

      const [wallet] = await walletClient.getAddresses();

      /*
       * ----------------------------------------------------------
       * Already registered?
       * ----------------------------------------------------------
       */

      
      let existingCustomer = null;

      try {

        existingCustomer = await getCustomerByWallet(wallet);

      } catch (error){

        existingCustomer = null;
      }
      
      if (existingCustomer) {
        return {
          customer: existingCustomer,

          alreadyRegistered: true,
        };
      }

      /*
       * ----------------------------------------------------------
       * Create Customer Kernel
       * ----------------------------------------------------------
       */

      const {

        smartAccount,

        sessionPrivateKey,

        serializedPermissionAccount
    } = await createCustomerKernel({
        ownerWalletClient: walletClient,

        publicClient,
      });

      /*
       * ----------------------------------------------------------
       * Register Customer
       * ----------------------------------------------------------
       */

      await createCustomer({
        wallet,

        smartAccount: smartAccount,

        displayName,

        email,

        sessionPrivateKey,

        serializedPermissionAccount

      });

      /*
       * ----------------------------------------------------------
       * Retrieve mirrored customer
       * ----------------------------------------------------------
       */

      const customer = await getCustomerByWallet(wallet);

      if (!customer) {
        throw new Error("Customer registration failed.");
      }

      return {
        customer,

        alreadyRegistered: false,
      };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Customer registration failed.";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,

    error,

    registerCustomer,
  };
}
