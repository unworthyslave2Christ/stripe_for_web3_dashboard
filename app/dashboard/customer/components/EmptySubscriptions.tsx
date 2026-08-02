"use client";

interface EmptySubscriptionsProps {

    onBrowseMerchants?: () => void;

}

export default function EmptySubscriptions({

    onBrowseMerchants,

}: EmptySubscriptionsProps) {

    return (

        <section className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 px-8 py-16">

            <div className="mx-auto max-w-2xl text-center">

                <div className="text-7xl">

                    📦

                </div>

                <h2 className="mt-8 text-3xl font-bold text-white">

                    No Active Subscriptions

                </h2>

                <p className="mt-4 text-lg leading-relaxed text-slate-400">

                    You haven't subscribed to any billing plans yet.

                    Browse merchants, discover subscription businesses,

                    and subscribe using your smart account.

                </p>

                <div className="mt-10 flex justify-center">

                    <button

                        type="button"

                        onClick={onBrowseMerchants}

                        className="rounded-xl bg-cyan-600 px-8 py-3 font-semibold text-white transition hover:bg-cyan-500"

                    >

                        Browse Merchants

                    </button>

                </div>

                <div className="mt-12 grid gap-6 text-left md:grid-cols-3">

                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

                        <div className="text-3xl">

                            🛍️

                        </div>

                        <h3 className="mt-4 font-semibold text-white">

                            Discover

                        </h3>

                        <p className="mt-2 text-sm text-slate-400">

                            Explore merchants building subscription

                            businesses on Stripe for Web3.

                        </p>

                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

                        <div className="text-3xl">

                            ⚡

                        </div>

                        <h3 className="mt-4 font-semibold text-white">

                            Subscribe

                        </h3>

                        <p className="mt-2 text-sm text-slate-400">

                            Approve recurring billing once using

                            Account Abstraction.

                        </p>

                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

                        <div className="text-3xl">

                            🔄

                        </div>

                        <h3 className="mt-4 font-semibold text-white">

                            Automated Billing

                        </h3>

                        <p className="mt-2 text-sm text-slate-400">

                            Future payments execute automatically

                            without repeated wallet confirmations.

                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}