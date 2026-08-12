// src/repositories/UserOperationRepository.ts

import { SupabaseClient } from "@supabase/supabase-js";

export type UserOperationType =
  | "CREATE_MERCHANT"
  | "UPDATE_MERCHANT"
  | "CREATE_PLAN"
  | "UPDATE_PLAN"
  | "PAUSE_PLAN"
  | "RESUME_PLAN"
  | "ARCHIVE_PLAN"
  | "CREATE_PERMISSION"
  | "UPDATE_PERMISSION"
  | "REVOKE_PERMISSION"
  | "CREATE_SUBSCRIPTION"
  | "PAUSE_SUBSCRIPTION"
  | "RESUME_SUBSCRIPTION"
  | "CANCEL_SUBSCRIPTION"
  | "BILLING";

export type UserOperationStatus = "QUEUED" | "PENDING" | "CONFIRMED" | "FAILED";

export interface CanonicalUserOperation {
  operation: UserOperationType;

  resourceType: string;

  resourceId: string;

  merchantId?: number;

  customerId?: string;

  walletAddress?: `0x${string}`;

  smartAccount?: `0x${string}`;

  payload: Record<string, unknown>;
}

export class UserOperationRepository {
  constructor(private readonly db: SupabaseClient) {}

  ////////////////////////////////////////////////////////////
  // CREATE
  ////////////////////////////////////////////////////////////

  async create(operation: CanonicalUserOperation) {
    const { data, error } = await this.db
      .from("user_operations")
      .insert({
        operation: operation.operation,

        resource_type: operation.resourceType,

        resource_id: operation.resourceId,

        merchant_id: operation.merchantId ?? null,

        customer_id: operation.customerId ?? null,

        owner_wallet: operation.walletAddress ?? null,

        smart_account: operation.smartAccount ?? null,

        payload: operation.payload,

        status: "QUEUED",

        retry_count: 0,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  ////////////////////////////////////////////////////////////
  // LOOKUPS
  ////////////////////////////////////////////////////////////

  async findById(id: string) {
    const { data, error } = await this.db
      .from("user_operations")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }

  async findByOperationHash(hash: `0x${string}`) {
    const { data, error } = await this.db
      .from("user_operations")
      .select("*")
      .eq("operation_hash", hash)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }

  async findByTransactionHash(hash: `0x${string}`) {
    const { data, error } = await this.db
      .from("user_operations")
      .select("*")
      .eq("transaction_hash", hash)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }

  async findByMerchantId(merchantId: number) {
    const { data, error } = await this.db
      .from("user_operations")
      .select("*")
      .eq("merchant_id", merchantId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return data;
  }

  async findByCustomerId(customerId: string) {
    const { data, error } = await this.db
      .from("user_operations")
      .select("*")
      .eq("customer_id", customerId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return data;
  }

  ////////////////////////////////////////////////////////////
  // WORKER QUEUES
  ////////////////////////////////////////////////////////////

  async findQueued() {
    const { data, error } = await this.db
      .from("user_operations")
      .select("*")
      .eq("status", "QUEUED")
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    return data;
  }

  async findPending() {
    const { data, error } = await this.db
      .from("user_operations")
      .select("*")
      .eq("status", "PENDING")
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    return data;
  }

  async findFailed() {
    const { data, error } = await this.db
      .from("user_operations")
      .select("*")
      .eq("status", "FAILED")
      .order("failed_at", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    return data;
  }

  async findConfirmed() {
    const { data, error } = await this.db
      .from("user_operations")
      .select("*")
      .eq("status", "CONFIRMED")
      .order("confirmed_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return data;
  }

  ////////////////////////////////////////////////////////////
  // STATUS
  ////////////////////////////////////////////////////////////

  async markPending(id: string, operationHash: `0x${string}`) {
    const { data, error } = await this.db
      .from("user_operations")
      .update({
        status: "PENDING",

        operation_hash: operationHash,

        last_attempt_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async markConfirmed(
    id: string,
    transactionHash: `0x${string}`,
    blockNumber?: bigint,
  ) {
    const { data, error } = await this.db
      .from("user_operations")
      .update({
        status: "CONFIRMED",

        transaction_hash: transactionHash,

        block_number: blockNumber ? Number(blockNumber) : null,

        confirmed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async markFailed(id: string, reason: string) {
    const operation = await this.findById(id);

    const retryCount = (operation?.retry_count ?? 0) + 1;

    const { data, error } = await this.db
      .from("user_operations")
      .update({
        status: "FAILED",

        failure_reason: reason,

        retry_count: retryCount,

        failed_at: new Date().toISOString(),

        last_attempt_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async requeue(id: string) {
    const operation = await this.findById(id);

    const retryCount = (operation?.retry_count ?? 0) + 1;

    const { data, error } = await this.db
      .from("user_operations")
      .update({
        status: "QUEUED",

        retry_count: retryCount,

        last_attempt_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
}
