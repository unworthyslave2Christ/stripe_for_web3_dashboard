// services/customerDashboard.ts

import { createSupabaseClient } from "@/utils/supabase/client";

import type { Merchant, Customer, Subscription } from "@/types/dashboard";

// import protocolAbi from "@/abi/Web3BillingProtocol.json";

import {
  createPublicClient,
  erc20Abi,
  formatUnits,
  getContract,
  type Address,
  type PublicClient,
  type WalletClient,
  http
} from "viem";


/* -------------------------------------------------------------------------- */
/* Current Customer                                                            */
/* -------------------------------------------------------------------------- */

const supabase = createSupabaseClient();

export async function getCurrentCustomer(
  wallet: `0x${string}`,
): Promise<Customer | null> {
  const { data, error } = await supabase

    .from("customers")

    .select("*")

    .eq("wallet_address", wallet)

    .maybeSingle();

  if (error) throw error;

  if (!data) return null;

  return {
    customerId: data.customer_id,

    displayName: data.display_name,

    email: data.email,

    walletAddress: data.wallet_address,

    smartAccount: data.smart_account,

    status: data.status,

    createdAt: data.created_at,

    updatedAt: data.updated_at,
  };
}

/* -------------------------------------------------------------------------- */
/* Featured Merchants                                                          */
/* -------------------------------------------------------------------------- */

export async function getFeaturedMerchants(): Promise<Merchant[]> {
  const { data, error } = await supabase

    .from("merchants")

    .select("*")

    .eq("status", "ACTIVE")

    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []).map((merchant) => ({
    merchantId: merchant.merchant_id,

    smartAccount: merchant.smart_account,

    payoutWallet: merchant.payout_wallet,

    ownerWallet: merchant.owner_wallet,

    name: merchant.name,

    metadataURI: merchant.metadata_uri,

    status: merchant.status,

    createdAt: merchant.created_at,

    updatedAt: merchant.updated_at,
  }));
}

/* -------------------------------------------------------------------------- */
/* Active Subscriptions                                                        */
/* -------------------------------------------------------------------------- */

export async function getActiveSubscriptions(
  customerId: string,
): Promise<Subscription[]> {
  const { data, error } = await supabase

    .from("subscriptions")

    .select("*")

    .eq("customer_id", customerId)

    .eq("status", "ACTIVE")

    .order("next_billing_time");

  if (error) throw error;

  return (data ?? []).map((subscription) => ({
    subscriptionId: subscription.subscription_id,

    merchantId: subscription.merchant_id,

    planId: subscription.plan_id,

    customerId: subscription.customer_id,

    customerName: "",

    smartAccount: subscription.smart_account,

    status: subscription.status,

    nextBillingTime: subscription.next_billing_time,

    lastChargedAt: subscription.last_charged_at,

    cancelledAt: subscription.cancelled_at,

    createdAt: subscription.created_at,
  }));
}

/* -------------------------------------------------------------------------- */
/* Blockchain                                                                  */
/* -------------------------------------------------------------------------- */



import type { BillingPlan } from "@/types/dashboard";

/* -------------------------------------------------------------------------- */
/* Wallet Balance                                                              */
/* -------------------------------------------------------------------------- */

export interface WalletBalance {
  token: `0x${string}`;

  symbol: string;

  decimals: number;

  raw: bigint;

  formatted: string;
}

export async function getWalletBalance(
  wallet: `0x${string}`,

  token: `0x${string}`,

  publicClient?: PublicClient,
): Promise<WalletBalance> {
  const client =
    publicClient ??
    createPublicClient({
      chain,

      transport: http(),
    });

  const contract = getContract({
    address: token,

    abi: erc20Abi,

    client,
  });

  const [raw, decimals, symbol] = await Promise.all([
    contract.read.balanceOf([wallet]),

    contract.read.decimals(),

    contract.read.symbol(),
  ]);

  return {
    token,

    symbol,

    decimals,

    raw,

    formatted: formatUnits(raw, decimals),
  };
}

/* -------------------------------------------------------------------------- */
/* Wallet Balances For Every Active Plan Token                                */
/* -------------------------------------------------------------------------- */

export async function getWalletBalances(
  wallet: `0x${string}`,

  plans: BillingPlan[],

  publicClient?: PublicClient,
): Promise<WalletBalance[]> {
  const uniqueTokens = [...new Set(plans.map((plan) => plan.paymentToken))];

  return Promise.all(
    uniqueTokens.map((token) =>
      getWalletBalance(
        wallet,

        token,

        publicClient,
      ),
    ),
  );
}

/* -------------------------------------------------------------------------- */
/* Merchant Plans                                                              */
/* -------------------------------------------------------------------------- */

export async function getMerchantPlans(
  merchantId: number,
): Promise<BillingPlan[]> {
  const { data, error } = await supabase

    .from("billing_plans")

    .select("*")

    .eq(
      "merchant_id",

      merchantId,
    )

    .eq(
      "status",

      "ACTIVE",
    )

    .order(
      "amount",

      {
        ascending: true,
      },
    );

  if (error) throw error;

  return (data ?? []).map((plan) => ({
    planId: plan.plan_id,

    merchantId: plan.merchant_id,

    paymentToken: plan.payment_token,

    amount: plan.amount,

    billingIntervalSeconds: plan.billing_interval_seconds,

    name: plan.name,

    status: plan.status,

    trialPeriod: plan.trial_period,

    maxSubscribers: plan.max_subscribers,

    allowRenewal: plan.allow_renewal,

    createdAt: plan.created_at,

    updatedAt: plan.updated_at,

    subscriberCount: plan.subscriber_count,
  }));
}

/* -------------------------------------------------------------------------- */
/* Balance Check                                                               */
/* -------------------------------------------------------------------------- */

export async function hasEnoughBalance(
  wallet: `0x${string}`,

  plan: BillingPlan,

  publicClient?: PublicClient,
): Promise<boolean> {
  const balance = await getWalletBalance(
    wallet,

    plan.paymentToken,

    publicClient,
  );

  return balance.raw >= BigInt(plan.amount);
}

/* -------------------------------------------------------------------------- */
/* Subscribe                                                                   */
/* -------------------------------------------------------------------------- */


import { chain } from "@/services/kernel.client";

import { getCustomerKernel } from "@/services/customer";

import { getMerchantById } from "@/services/merchant";

import { createSubscription } from "@/services/subscription";

import { approveTokenIfNeeded } from "@/services/token";

import { subscribeToBillingPlan } from "@/services/billingProtocol";

export interface SubscribeParams {
  walletClient: WalletClient;

  publicClient: PublicClient;

  customerId: string;

  plan: BillingPlan;
}

export async function subscribe({
  walletClient,

  publicClient,

  customerId,

  plan,
}: SubscribeParams) {
  /*
    --------------------------------------------------------------------------
    Balance
    --------------------------------------------------------------------------
    */

  const enoughBalance = await hasEnoughBalance(
    (await walletClient.getAddresses())[0],

    plan,

    publicClient,
  );

  if (!enoughBalance) {
    throw new Error("Insufficient token balance for recurring billing.");
  }

  /*
    --------------------------------------------------------------------------
    Customer Kernel
    --------------------------------------------------------------------------
    */

  const {
    kernel,

    customer,
  } = await getCustomerKernel(
    walletClient,

    publicClient,
  );

  /*
    --------------------------------------------------------------------------
    Merchant
    --------------------------------------------------------------------------
    */

  const merchant = await getMerchantById(plan.merchantId as unknown as bigint);

  /*
    --------------------------------------------------------------------------
    ERC20 Approval
    --------------------------------------------------------------------------
    */

  await approveTokenIfNeeded({
    walletClient,

    publicClient,

    owner: customer.smartAccount,

    spender: process.env.NEXT_PUBLIC_BILLING_CONTRACT_ADDRESS as `0x${string}`,

    token: plan.paymentToken,

    amount: BigInt(plan.amount),
  });

  /*
    --------------------------------------------------------------------------
    Subscribe On Chain
    --------------------------------------------------------------------------
    */

  const result = await subscribeToBillingPlan({
    kernelClient: kernel.client!,

    contractAddress: process.env
      .NEXT_PUBLIC_BILLING_CONTRACT_ADDRESS as `0x${string}`,

    merchantSmartAccount: merchant.smartAccount,

    customerSmartAccount: customer.smartAccount!,

    planId: BigInt(plan.planId),
  });

  /*
    --------------------------------------------------------------------------
    Persist Subscription
    --------------------------------------------------------------------------
    */

  const subscription = await createSubscription({
    customerId,

    merchantId: plan.merchantId,

    planId: plan.planId,

    smartAccount: customer.smartAccount!,

    transactionHash: result.userOperationHash,
  });

  return {
    subscription,

    transactionHash: result.userOperationHash,
  };
}
