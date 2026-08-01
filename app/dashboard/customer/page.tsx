"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAccount } from "wagmi";

import CustomerForm from "./components/CustomerForm";
import { getMerchantByOwnerWallet } from "@/services/merchant";
import { getCustomerByWallet } from "@/services/customer";
import { Address } from "viem";
import { useRouter } from "next/router";

export default function CustomerPage() {

    const { address, isConnected } =
            useAccount();
    
    // const router = useRouter();

    // const merchant =  await getCustomerByWallet(address as Address);
    

    // if (merchant){
    //     router.replace("/dashboard/customer/home");
    // }


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