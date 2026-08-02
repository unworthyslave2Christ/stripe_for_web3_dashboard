"use client";

import type { Customer } from "@/types/dashboard";

interface CustomerGreetingProps {

    customer: Customer | null;

}

export default function CustomerGreeting({

    customer,

}: CustomerGreetingProps) {

    const name =

        customer?.displayName?.trim()

            ? customer.displayName

            : "Customer";

    return (

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm uppercase tracking-widest text-cyan-400">

                        Web3 Subscription Billing

                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-white">

                        Welcome back,

                        <span className="text-cyan-400">

                            {" "}

                            {name}

                        </span>

                    </h1>

                    <p className="mt-4 max-w-3xl text-slate-400">

                        Discover subscription businesses powered by Account

                        Abstraction. Browse merchants, inspect subscription

                        plans, verify token balances, and subscribe using

                        your smart account with gas-sponsored transactions.

                    </p>

                </div>

                <div className="hidden lg:flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20">

                    <span className="text-5xl">

                        👤

                    </span>

                </div>

            </div>

        </section>

    );

}