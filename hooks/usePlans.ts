// hooks/useCreatePlan.ts

"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";

import { useWalletClient, usePublicClient } from "wagmi";

import { erc20Abi, getContract, type Address } from "viem";

import { createPlan, modifyPlanService, updatePlanService } from "@/services/plans";
import { getMerchantKernel } from "@/services/merchant";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { BillingPlan } from "@/types/dashboard";

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
  const router = useRouter();

  const { data: walletClient } = useWalletClient();

  const publicClient = usePublicClient();

  const [loading, setLoading] = useState(false);

  const [modificationSuccessful, setmModificationSuccessful] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const [planId, setPlanId] = useState<bigint | null>(null);

  const [userOpHash, setUserOpHash] = useState<`0x${string}` | null>(null);

  async function getTokenMetadata(token: Address){

    const contract = getContract({
        address: token,
    
        abi: erc20Abi,
    
        client: publicClient!
    });
    
      const [decimals, symbol] = await Promise.all([

        contract.read.decimals(),
    
        contract.read.symbol(),
      ]);

      return {
        token,

        symbol,

        decimals
      }
  }


  async function modifyPlan(
    operation: string,
    statusValue: number,
    apiSegment: string,
    plan: BillingPlan,
  ){
    if (apiSegment === "pause" && plan?.status === "PAUSED") {
      toast.info("Plan is already paused.");
      return;
    }

    if (apiSegment === "resume" && plan?.status === "ACTIVE") {
      toast.info("Plan is already active.");
      return;
    }

    if (apiSegment === "archive" && plan?.status === "ARCHIVED") {
      toast.info("Plan has already been archived.");
      return;
    }

    if (!walletClient) throw new Error("Wallet not connected.");

    if (!publicClient) throw new Error("Public client unavailable.");

    const loadingToast = toast.loading("Updating billing plan...");

    try {
      setLoading(true);

      setError(null);

      setmModificationSuccessful(false);
      
      console.log("Received planId: ", plan.plan_id);

      const { merchant: merchantFromSupabase, kernel } =
        await getMerchantKernel(walletClient, publicClient);

      await modifyPlanService({
        kernel: kernel.account,
        kernelClient: kernel.client,
        planId: plan.plan_id,
        publicClient: publicClient,
        operation,
        statusValue,
        apiSegment,
      });

      toast.success("Billing plan updated.", {
        id: loadingToast,
      });
      setmModificationSuccessful(true)

      
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Unable to update billing plan.",
        {
          id: loadingToast,
        },
      );
      setmModificationSuccessful(false)
    } finally {
      setLoading(false);
    }
  }


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

          trialPeriodNamed: params.trialPeriodNamed,
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

  interface UpdatePlanParams {
      planId: bigint;

      originalPlan: BillingPlan;

      updatedPlan: BillingPlan;
  }

  async function updatePlan({
      planId,
      originalPlan,
      updatedPlan,
  }: UpdatePlanParams) {

      if (!walletClient) {
          throw new Error("Wallet not connected.");
      }

      if (!publicClient) {
          throw new Error("Public client unavailable.");
      }

      const toastId = toast.loading("Updating billing plan...");

      try {

          setLoading(true);

          const { merchant, kernel } =
              await getMerchantKernel(
                  walletClient,
                  publicClient,
              );

              
              // updatePlanName(uint256 planId, string calldata newName) 
              // updatePlanAmount(uint256 planId, uint256 newAmount)
              // updatePlanInterval(uint256 planId, uint256 newInterval)
              // updatePlanPaymentToken(uint256 planId, address newToken) 
              // updateTrialPeriod(uint256 planId, uint64 newTrialPeriod)
              // updateMaxSubscribers(uint256 planId, uint32 maxSubscribers)
              // setAutoRenewal(uint256 planId, bool enabled)
              
              

          await updatePlanService({
              kernel: kernel.account,
              kernelClient: kernel.client,
              publicClient,
              planId,
              originalPlan,
              updatedPlan,
              merchant
          });

          toast.success(
              "Billing plan updated.",
              { id: toastId },
          );

          router.replace(`/dashboard/merchant/plans/${planId}`)

      } catch (err) {

          toast.error(
              err instanceof Error
                  ? err.message
                  : "Unable to update billing plan.",
              { id: toastId },
          );

          throw err;

      } finally {

          setLoading(false);

      }

  }

  async function getPlan(planId: number) {
    
      const response = 
        await fetch(
          `/api/plans?planId=${planId}`,
          {
            cache: "no-store"
          },
        
        );
      
    if (!response.ok){
      throw new Error(
        "Unable to fetch plans"
      );
    }

    const data = await response.json()

    return data;
  } 



  return {
    createBillingPlan,

    loading,

    error,

    planId,

    userOpHash,

    modifyPlan,

    modificationSuccessful,

    getPlan,

    updatePlan,

    getTokenMetadata

  };
}
