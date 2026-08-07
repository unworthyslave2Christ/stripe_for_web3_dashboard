import { SupabaseClient } from "@supabase/supabase-js";

import { MerchantRecord } from "@/types/Merchant";

export class MerchantRepository {

    constructor(
        private readonly db: SupabaseClient,
    ) {}

    async create(
        merchant: MerchantRecord & {
            smartAccount: `0x${string}`;
            payoutWallet: `0x${string}`;
            billingOperator: `0x${string}`;
        },
    ) {

        const { data, error } =
            await this.db
                .from("merchants")
                .insert({
                    merchant_id: merchant.merchantId,

                    owner_wallet: merchant.owner,

                    payout_wallet: merchant.payoutWallet,

                    smart_account: merchant.smartAccount,

                    billing_operator:
                        merchant.billingOperator,

                    name: merchant.businessName,

                    metadata_uri:
                        merchant.metadataURI,

                    status: merchant.status,
                })
                .select()
                .single();

        if (error) {

            throw error;

        }

        return data;

    }

    async findByMerchantId(
        merchantId: number,
    ) {

        const { data, error } =
            await this.db
                .from("merchants")
                .select("*")
                .eq("merchant_id", merchantId)
                .single();

        if (error) {

            return null;

        }

        return data;

    }

    async findByOwnerWallet(
        ownerWallet: `0x${string}`,
    ) {

        const { data, error } =
            await this.db
                .from("merchants")
                .select("*")
                .eq("owner_wallet", ownerWallet)
                .single();

        if (error) {

            return null;

        }

        return data;

    }

    async updateStatus(
        merchantId: number,
        status: "ACTIVE" | "SUSPENDED",
    ) {

        const { data, error } =
            await this.db
                .from("merchants")
                .update({
                    status,

                    updated_at:
                        new Date().toISOString(),
                })
                .eq("merchant_id", merchantId)
                .select()
                .single();

        if (error) {

            throw error;

        }

        return data;

    }

    async all() {

        const { data, error } =
            await this.db
                .from("merchants")
                .select("*")
                .order("merchant_id");

        if (error) {

            throw error;

        }

        return data;

    }

}