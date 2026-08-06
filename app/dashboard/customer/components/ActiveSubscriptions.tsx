"use client";

import type {

    Subscription,

} from "@/types/dashboard";

import EmptySubscriptions from "./EmptySubscriptions";

import SubscriptionCard from "./SubscriptionCard";

interface ActiveSubscriptionsProps {

    subscriptions: Subscription[];

    onBrowseMerchants?: () => void
    
}

export default function ActiveSubscriptions({

    subscriptions,
    
    onBrowseMerchants

}: ActiveSubscriptionsProps) {

    if (

        subscriptions.length === 0

    ) {

        return <EmptySubscriptions 
            onBrowseMerchants={onBrowseMerchants}
        />;


    }

    

    const activeCount =

        subscriptions.filter(

            subscription =>

                subscription.status === "ACTIVE",

        ).length;

    return (

        <section className="space-y-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h2 className="text-3xl font-bold text-white">

                        Active Subscriptions

                    </h2>

                    <p className="mt-2 text-slate-400">

                        View every recurring subscription connected to your
                        Account Abstraction wallet.

                    </p>

                </div>

                <div className="inline-flex w-fit items-center rounded-full bg-cyan-600/10 px-5 py-2">

                    <span className="font-semibold text-cyan-400">

                        {activeCount}

                    </span>

                    <span className="ml-2 text-sm text-slate-300">

                        Active

                    </span>

                </div>

            </div>

            <div className="grid gap-5">

                {

                    [...subscriptions]

                        .sort(

                            (a, b) =>

                                new Date(

                                    a.nextBillingTime,

                                ).getTime()

                                -

                                new Date(

                                    b.nextBillingTime,

                                ).getTime(),

                        )

                        .map(

                            subscription => (

                                <SubscriptionCard

                                    key={

                                        subscription.subscriptionId

                                    }

                                    subscription={

                                        subscription

                                    }

                                />

                            ),

                        )

                }

            </div>

        </section>

    );

}