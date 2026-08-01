"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAccount } from "wagmi";

import RegisterMerchantForm from "@/app/dashboard/merchant/components/RegisterMerchantForm";

export default function MerchantPage() {
    const { isConnected } =
        useAccount();

    return (
        <main className="mx-auto max-w-5xl p-10">
            <h1 className="mb-6 text-4xl font-bold">
                Merchant Portal
            </h1>

            <ConnectButton />

            {!isConnected && (
                <p className="mt-6">
                    Connect your wallet to continue.
                </p>
            )}

            {isConnected && (
                <div className="mt-8">
                    <RegisterMerchantForm />
                </div>
            )}
        </main>
    );
}