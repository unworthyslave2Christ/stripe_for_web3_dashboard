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

export type UserOperationStatus =
    | "QUEUED"
    | "PENDING"
    | "CONFIRMED"
    | "FAILED";

export interface CreateUserOperation {

    operation: UserOperationType;

    resourceType: string;

    resourceId: string;

    merchantId?: number;

    customerId?: string;

    smartAccount: `0x${string}`;

    userOperationHash?: `0x${string}`;

    transactionHash?: `0x${string}`;

    payload: Record<string, unknown>;

}

export class UserOperationRepository {

    constructor(
        private readonly db: SupabaseClient,
    ) {}

    ////////////////////////////////////////////////////////////
    // CREATE
    ////////////////////////////////////////////////////////////

    async create(
        operation: CreateUserOperation,
    ) {

        const { data, error } =
            await this.db
                .from("user_operations")
                .insert({

                    operation: operation.operation,

                    resource_type:
                        operation.resourceType,

                    resource_id:
                        operation.resourceId,

                    merchant_id:
                        operation.merchantId ?? null,

                    customer_id:
                        operation.customerId ?? null,

                    smart_account:
                        operation.smartAccount,

                    user_operation_hash:
                        operation.userOperationHash ?? null,

                    transaction_hash:
                        operation.transactionHash ?? null,

                    payload:
                        operation.payload,

                    status: "QUEUED",

                })
                .select()
                .single();

        if (error) {

            throw error;

        }

        return data;

    }

    ////////////////////////////////////////////////////////////
    // LOOKUP
    ////////////////////////////////////////////////////////////

    async findById(
        id: string,
    ) {

        const { data, error } =
            await this.db
                .from("user_operations")
                .select("*")
                .eq("id", id)
                .single();

        if (error) {

            return null;

        }

        return data;

    }

    async findByHash(
        hash: `0x${string}`,
    ) {

        const { data, error } =
            await this.db
                .from("user_operations")
                .select("*")
                .eq("user_operation_hash", hash)
                .single();

        if (error) {

            return null;

        }

        return data;

    }

    ////////////////////////////////////////////////////////////
    // WORKER
    ////////////////////////////////////////////////////////////

    async queued() {

        const { data, error } =
            await this.db
                .from("user_operations")
                .select("*")
                .in("status", [
                    "QUEUED",
                    "PENDING",
                ])
                .order(
                    "created_at",
                    {
                        ascending: true,
                    },
                );

        if (error) {

            throw error;

        }

        return data;

    }

    ////////////////////////////////////////////////////////////
    // STATUS
    ////////////////////////////////////////////////////////////

    async markPending(
        id: string,
        hash: `0x${string}`,
    ) {

        const { data, error } =
            await this.db
                .from("user_operations")
                .update({

                    status: "PENDING",

                    user_operation_hash:
                        hash,

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
    ) {

        const { data, error } =
            await this.db
                .from("user_operations")
                .update({

                    status: "CONFIRMED",

                    transaction_hash:
                        transactionHash,

                    confirmed_at:
                        new Date().toISOString(),

                })
                .eq("id", id)
                .select()
                .single();

        if (error) {

            throw error;

        }

        return data;

    }

    async markFailed(
        id: string,
        reason: string,
    ) {

        const { data, error } =
            await this.db
                .from("user_operations")
                .update({

                    status: "FAILED",

                    failure_reason:
                        reason,

                    failed_at:
                        new Date().toISOString(),

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