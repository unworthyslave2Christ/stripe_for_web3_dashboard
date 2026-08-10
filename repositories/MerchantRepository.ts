// src/repositories/MerchantRepository.ts

import { SupabaseClient } from "@supabase/supabase-js";

export type MerchantStatus =
    | "PENDING"
    | "ACTIVE"
    | "SUSPENDED";

export interface CanonicalMerchant {

    merchantId: number;

    ownerWallet: `0x${string}`;

    smartAccount: `0x${string}`;

    payoutWallet: `0x${string}`;

    billingOperator: `0x${string}`;

    name: string;

    metadataURI: string;

    status: MerchantStatus;

}

export class MerchantRepository {

    constructor(
        private readonly db: SupabaseClient,
    ) {}

    ////////////////////////////////////////////////////////////
    // CREATE
    ////////////////////////////////////////////////////////////

    async create(
        merchant: CanonicalMerchant,
    ) {

        const { data, error } =
            await this.db
                .from("merchants")
                .insert({

                    merchant_id:
                        merchant.merchantId,

                    owner_wallet:
                        merchant.ownerWallet,

                    smart_account:
                        merchant.smartAccount,

                    payout_wallet:
                        merchant.payoutWallet,

                    billing_operator:
                        merchant.billingOperator,

                    name:
                        merchant.name,

                    metadata_uri:
                        merchant.metadataURI,

                    status:
                        merchant.status,

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

    async findByMerchantId(
        merchantId: number,
    ) {

        const { data, error } =
            await this.db
                .from("merchants")
                .select("*")
                .eq("merchant_id", merchantId)
                .maybeSingle();

        if (error) {

            throw error;

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
                .maybeSingle();

        if (error) {

            throw error;

        }

        return data;

    }

    async findBySmartAccount(
        smartAccount: `0x${string}`,
    ) {

        const { data, error } =
            await this.db
                .from("merchants")
                .select("*")
                .eq("smart_account", smartAccount)
                .maybeSingle();

        if (error) {

            throw error;

        }

        return data;

    }

    ////////////////////////////////////////////////////////////
    // EXISTS
    ////////////////////////////////////////////////////////////

    async existsByOwnerWallet(
        ownerWallet: `0x${string}`,
    ) {

        const merchant =
            await this.findByOwnerWallet(ownerWallet);

        return merchant !== null;

    }

    async existsBySmartAccount(
        smartAccount: `0x${string}`,
    ) {

        const merchant =
            await this.findBySmartAccount(smartAccount);

        return merchant !== null;

    }

    ////////////////////////////////////////////////////////////
    // STATUS
    ////////////////////////////////////////////////////////////

    async updateStatus(
        merchantId: number,
        status: MerchantStatus,
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

    ////////////////////////////////////////////////////////////
    // UPDATE
    ////////////////////////////////////////////////////////////

    async updateMetadata(
        merchantId: number,
        values: {

            name?: string;

            metadataURI?: string;

            payoutWallet?: `0x${string}`;

        },
    ) {

        const { data, error } =
            await this.db
                .from("merchants")
                .update({

                    ...(values.name && {
                        name: values.name,
                    }),

                    ...(values.metadataURI && {
                        metadata_uri:
                            values.metadataURI,
                    }),

                    ...(values.payoutWallet && {
                        payout_wallet:
                            values.payoutWallet,
                    }),

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

    ////////////////////////////////////////////////////////////
    // LIST
    ////////////////////////////////////////////////////////////

    async list() {

        const { data, error } =
            await this.db
                .from("merchants")
                .select("*")
                .order(
                    "merchant_id",
                    {
                        ascending: true,
                    },
                );

        if (error) {

            throw error;

        }

        return data;

    }

}