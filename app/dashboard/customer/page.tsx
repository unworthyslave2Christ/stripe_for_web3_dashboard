"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAccount } from "wagmi";

import CustomerForm from "./components/CustomerForm";

export default function CustomerPage() {

    const {

        isConnected,

    } = useAccount();

    return (

        <main className="mx-auto max-w-5xl p-10">

            <h1 className="mb-6 text-4xl font-bold">

                Customer Portal

            </h1>

            <p className="mb-8 text-slate-400">

                Register your customer account to begin subscribing to
                merchant billing plans.

            </p>

            <ConnectButton />

            {!isConnected && (

                <p className="mt-6 text-slate-400">

                    Connect your wallet to continue.

                </p>

            )}

            {isConnected && (

                <div className="mt-8">

                    <CustomerForm />

                </div>

            )}

        </main>

    );

}