"use client";

import { createSupabaseClient } from "@/utils/supabase/client";

import type { Address } from "viem";

import type { Subscription } from "@/types/dashboard";

/* -------------------------------------------------------------------------- */
/* Supabase                                                                    */
/* -------------------------------------------------------------------------- */

const supabase = createSupabaseClient();

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export interface CreateSubscriptionParams {
  customerId: string;

  merchantId: number;

  planId: number;

  smartAccount: Address;

  transactionHash: `0x${string}`;
}

export interface SubscriptionRecord extends Subscription {
  transactionHash: `0x${string}`;
}

/* -------------------------------------------------------------------------- */
/* Create Subscription Record                                                  */
/* -------------------------------------------------------------------------- */

export async function createSubscription({
  customerId,
  merchantId,
  planId,
  smartAccount,
  transactionHash,
}: CreateSubscriptionParams): Promise<SubscriptionRecord> {
  /*
    --------------------------------------------------------------------------
    Lookup Billing Permission
    --------------------------------------------------------------------------
    */

  const { data: permission, error: permissionError } = await supabase

    .from("billing_permissions")

    .select("permission_id")

    .eq("customer_id", customerId)

    .eq("revoked", false)

    .single();

  if (permissionError || !permission) {
    throw new Error("Active billing permission not found.");
  }

  /*
    --------------------------------------------------------------------------
    Create Subscription Row
    --------------------------------------------------------------------------
    */

  const { data, error } = await supabase

    .from("subscriptions")

    .insert({
      merchant_id: merchantId,

      customer_id: customerId,

      plan_id: planId,

      smart_account: smartAccount,

      permission_id: permission.permission_id,

      status: "ACTIVE",

      transaction_hash: transactionHash,

      last_charged_at: null,

      cancelled_at: null,
    })

    .select()

    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Unable to create subscription.");
  }

  return data as SubscriptionRecord;
}

/* -------------------------------------------------------------------------- */
/* Get Customer Subscriptions                                                  */
/* -------------------------------------------------------------------------- */

export async function getCustomerSubscriptions(
  customerId: string,
): Promise<SubscriptionRecord[]> {
  const { data, error } = await supabase

    .from("subscriptions")

    .select("*")

    .eq("customer_id", customerId)

    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as SubscriptionRecord[];
}

/* -------------------------------------------------------------------------- */
/* Get Subscription                                                            */
/* -------------------------------------------------------------------------- */

export async function getSubscription(
  subscriptionId: number,
): Promise<SubscriptionRecord | null> {
  const { data, error } = await supabase

    .from("subscriptions")

    .select("*")

    .eq("subscription_id", subscriptionId)

    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(error.message);
  }

  return data as SubscriptionRecord;
}

/* -------------------------------------------------------------------------- */
/* Pause Subscription Record                                                   */
/* -------------------------------------------------------------------------- */

export async function pauseSubscriptionRecord(
  subscriptionId: number,
): Promise<void> {
  const { error } = await supabase

    .from("subscriptions")

    .update({
      status: "PAUSED",
    })

    .eq(
      "subscription_id",

      subscriptionId,
    );

  if (error) {
    throw new Error(error.message);
  }
}

/* -------------------------------------------------------------------------- */
/* Resume Subscription Record                                                  */
/* -------------------------------------------------------------------------- */

export async function resumeSubscriptionRecord(
  subscriptionId: number,
): Promise<void> {
  const { error } = await supabase

    .from("subscriptions")

    .update({
      status: "ACTIVE",
    })

    .eq(
      "subscription_id",

      subscriptionId,
    );

  if (error) {
    throw new Error(error.message);
  }
}

/* -------------------------------------------------------------------------- */
/* Cancel Subscription Record                                                  */
/* -------------------------------------------------------------------------- */

export async function cancelSubscriptionRecord(
  subscriptionId: number,
): Promise<void> {
  const { error } = await supabase

    .from("subscriptions")

    .update({
      status: "CANCELLED",

      cancelled_at: new Date().toISOString(),
    })

    .eq(
      "subscription_id",

      subscriptionId,
    );

  if (error) {
    throw new Error(error.message);
  }
}

/* -------------------------------------------------------------------------- */
/* Update Billing Information                                                  */
/* -------------------------------------------------------------------------- */

export async function updateBillingInformation(
  subscriptionId: number,
  nextBillingTime: string,
): Promise<void> {
  const { error } = await supabase

    .from("subscriptions")

    .update({
      last_charged_at: new Date().toISOString(),

      next_billing_time: nextBillingTime,
    })

    .eq(
      "subscription_id",

      subscriptionId,
    );

  if (error) {
    throw new Error(error.message);
  }
}
