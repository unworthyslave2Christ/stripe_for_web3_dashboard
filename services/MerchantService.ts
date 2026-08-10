// src/services/MerchantService.ts

import type { Address, WalletClient } from "viem";

import {
    MerchantRepository,
} from "@/repositories/MerchantRepository";

import {
    UserOperationRepository,
    type CanonicalUserOperation,
} from "@/repositories/UserOperationRepository";

import {
    MerchantBlockchain,
} from "@/blockchain/MerchantBlockchain";

import type {
    MerchantRecord,
} from "@/types/Merchant";

export interface MerchantServiceConfig {

    billingOperator: Address;

}

export interface RegisterMerchantRequest {

    walletClient: WalletClient;

    ownerWallet: Address;

    payoutWallet: Address;

    businessName: string;

    metadataURI?: string;

}

export interface RegisterMerchantResponse {

    merchant: MerchantRecord;

    blockchain: Awaited<
        ReturnType<
            MerchantBlockchain["registerMerchant"]
        >
    >;

}

export class MerchantService {

    constructor(

        private readonly merchantRepository: MerchantRepository,

        private readonly userOperationRepository: UserOperationRepository,

        private readonly merchantBlockchain: MerchantBlockchain,

        private readonly config: MerchantServiceConfig,

    ) {}

    ////////////////////////////////////////////////////////////
    // Register Merchant
    ////////////////////////////////////////////////////////////

    async registerMerchant(
        request: RegisterMerchantRequest,
    ): Promise<RegisterMerchantResponse> {

        ////////////////////////////////////////////////////////
        // Already Exists?
        ////////////////////////////////////////////////////////

        const existing =
            await this.merchantRepository
                .findByOwnerWallet(
                    request.ownerWallet,
                );

        if (existing) {

            throw new Error(
                "Merchant already exists.",
            );

        }

        ////////////////////////////////////////////////////////
        // Queue User Operation
        ////////////////////////////////////////////////////////

        const operation =
            await this.userOperationRepository
                .create({

                    operation:
                        "CREATE_MERCHANT",

                    resourceType:
                        "merchant",

                    resourceId:
                        request.ownerWallet,

                    walletAddress:
                        request.ownerWallet,

                    payload: {

                        ownerWallet:
                            request.ownerWallet,

                        payoutWallet:
                            request.payoutWallet,

                        businessName:
                            request.businessName,

                        metadataURI:
                            request.metadataURI ?? "",

                    },

                });

        try {

            ////////////////////////////////////////////////////
            // Blockchain
            ////////////////////////////////////////////////////

            const blockchain =
                await this.merchantBlockchain
                    .registerMerchant({

                        walletClient:
                            request.walletClient,

                        ownerWallet:
                            request.ownerWallet,

                        payoutWallet:
                            request.payoutWallet,

                        billingOperator:
                            this.config.billingOperator,

                        name:
                            request.businessName,

                        metadataURI:
                            request.metadataURI,

                    });

            ////////////////////////////////////////////////////
            // Persist Merchant
            ////////////////////////////////////////////////////

            const merchant =
                await this.merchantRepository
                    .create({

                        merchantId:
                            Number(
                                blockchain.merchantId,
                            ),

                        owner:
                            request.ownerWallet,

                        businessName:
                            request.businessName,

                        metadataURI:
                            request.metadataURI ?? "",

                        status:
                            "ACTIVE",

                        createdAt:
                            Date.now(),

                        smartAccount:
                            blockchain.smartAccount,

                        payoutWallet:
                            request.payoutWallet,

                        billingOperator:
                            this.config.billingOperator,

                    });

            ////////////////////////////////////////////////////
            // Confirm User Operation
            ////////////////////////////////////////////////////

            await this.userOperationRepository
                .markPending(
                    operation.id,
                    blockchain.approvalReceipt
                        .userOperationHash,
                );

            await this.userOperationRepository
                .markConfirmed(

                    operation.id,

                    blockchain.transactionHash,

                    blockchain.receipt
                        .receipt
                        .blockNumber,

                );

            ////////////////////////////////////////////////////
            // Return
            ////////////////////////////////////////////////////

            return {

                merchant,

                blockchain,

            };

        }

        catch (error) {

            await this.userOperationRepository
                .markFailed(

                    operation.id,

                    error instanceof Error
                        ? error.message
                        : "Merchant registration failed.",

                );

            throw error;

        }

    }

    ////////////////////////////////////////////////////////////
    // Reads
    ////////////////////////////////////////////////////////////

    async getMerchantById(
        merchantId: number,
    ) {

        return this.merchantRepository
            .findByMerchantId(
                merchantId,
            );

    }

    async getMerchantByOwnerWallet(
        ownerWallet: Address,
    ) {

        return this.merchantRepository
            .findByOwnerWallet(
                ownerWallet,
            );

    }

    async listMerchants() {

        return this.merchantRepository
            .all();

    }

    ////////////////////////////////////////////////////////////
    // Status
    ////////////////////////////////////////////////////////////

    async suspendMerchant(
        merchantId: number,
    ) {

        return this.merchantRepository
            .updateStatus(
                merchantId,
                "SUSPENDED",
            );

    }

    async activateMerchant(
        merchantId: number,
    ) {

        return this.merchantRepository
            .updateStatus(
                merchantId,
                "ACTIVE",
            );

    }

}