// app/dashboard/customer/components/MerchantSelector.tsx

"use client";

import type { Merchant } from "@/types/dashboard";

interface MerchantSelectorProps {

    merchants: Merchant[];

    selectedMerchantId: number | null;

    onChange: (merchantId: number | null) => void;

}

export default function MerchantSelector({

    merchants,

    selectedMerchantId,

    onChange,

}: MerchantSelectorProps) {

    return (

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        Browse Subscription Businesses

                    </h2>

                    <p className="mt-2 text-slate-400">

                        Select a merchant to filter the available subscription
                        businesses.

                    </p>

                </div>

                <div className="w-full max-w-md">

                    <label
                        htmlFor="merchant-selector"
                        className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-500"
                    >

                        Merchant

                    </label>

                    <select

                        id="merchant-selector"

                        value={selectedMerchantId ?? ""}

                        onChange={(event) => {

                            const value = event.target.value;

                            onChange(

                                value === ""

                                    ? null

                                    : Number(value),

                            );

                        }}

                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"

                    >

                        <option value="">

                            All Businesses

                        </option>

                        {

                            merchants

                                .slice()

                                .sort(

                                    (a, b) =>

                                        a.name.localeCompare(

                                            b.name,

                                        ),

                                )

                                .map(

                                    merchant => (

                                        <option

                                            key={merchant.merchantId}

                                            value={merchant.merchantId}

                                        >

                                            {merchant.name}

                                            {" · "}

                                            {merchant.status}

                                        </option>

                                    ),

                                )

                        }

                    </select>

                </div>

            </div>

        </section>

    );

}