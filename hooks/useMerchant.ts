"use client";

import { useState } from "react";
import { usePublicClient, useWalletClient } from "wagmi";

import {
  registerMerchant,
  merchantExists,
  getMerchantIdBySmartAccount,
  getMerchantById,
  getMerchantByOwnerWallet,
} from "@/services/merchant";

import { createMerchantKernel } from "@/services/kernel.client";
import { approveBillingOperator } from "@/services/billingProtocol";

const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_BILLING_CONTRACT_ADDRESS! as `0x${string}`;

export function useMerchant() {
  const publicClient = usePublicClient();

  const { data: walletClient } = useWalletClient();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string>();

  const [merchantId, setMerchantId] = useState<bigint>();

  async function createMerchant(
    ownerWallet: `0x${string}`,
    payoutWallet: `0x${string}`,
    name: string,
    metadataURI = "",
  ) {
    if (!walletClient) throw new Error("Wallet not connected.");

    if (!publicClient) throw new Error("Public client unavailable.");

    setError(undefined);

    setLoading(true);

    try {
      /*
       * Already registered?
       */
      let merchantFromSupabase = null;

      try {

          merchantFromSupabase =
              await getMerchantByOwnerWallet(ownerWallet);

      }

      catch (error) {

          // Merchant not yet mirrored into Supabase.
          merchantFromSupabase = null;
      }

      if (merchantFromSupabase){
        const exists = await merchantExists({
          publicClient,
          contractAddress: CONTRACT_ADDRESS,
          smartAccount: merchantFromSupabase.smart_account,
        });


        if (exists) {
          const id = await getMerchantIdBySmartAccount({
            publicClient,
            contractAddress: CONTRACT_ADDRESS,
            smartAccount: merchantFromSupabase.smart_account,
          });

          setMerchantId(id);

          const merchant = await getMerchantById(id);
          console.log("merchant: ", merchant);

          return {
            merchantId: id,
            merchant,
            alreadyRegistered: true,
          };
        }

      }

      const merchantKernel = await createMerchantKernel({
        ownerWalletClient: walletClient,
        publicClient,
      });

     
  

      /*
       * Register new merchant.
       */

      const [account] = await walletClient.getAddresses();

      const result = await registerMerchant({
        walletClient,
        publicClient,
        contractAddress: CONTRACT_ADDRESS,
        ownerWallet: account,
        merchantSmartAccount: merchantKernel.address,
        payoutWallet: account,
        name,
        metadataURI,
        billingOperator: process.env.NEXT_PUBLIC_BILLING_OPERATOR_ADDRESS as `0x${string}`
      });

      /*
      --------------------------------------------------------------------------
      Approve Billing Operator
      --------------------------------------------------------------------------
      */
      
      await approveBillingOperator({
          kernel: merchantKernel.account,
          kernelClient: merchantKernel.client,
          merchantId: BigInt(result.merchantId),
          operator:
              process.env.NEXT_PUBLIC_BILLING_OPERATOR_ADDRESS as `0x${string}`,
      });

      setMerchantId(result.merchantId);

      return {
        ...result,
        alreadyRegistered: false,
      };
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Merchant registration failed.",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,

    error,

    merchantId,

    createMerchant,
  };
}
