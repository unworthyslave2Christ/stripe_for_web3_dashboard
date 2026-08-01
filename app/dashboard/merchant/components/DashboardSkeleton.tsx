// dashboard/components/DashboardSkeleton.tsx

"use client";

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function DashboardSkeleton() {

    return (

        <div className="space-y-8">

            {/* ---------------------------------------------------------- */}
            {/* Merchant Header                                            */}
            {/* ---------------------------------------------------------- */}

            <section className="rounded-xl border border-slate-800 bg-slate-900 p-8">

                <div className="flex flex-col justify-between gap-8 lg:flex-row">

                    <div className="space-y-4">

                        <div className="h-8 w-64 animate-pulse rounded bg-slate-800" />

                        <div className="h-4 w-40 animate-pulse rounded bg-slate-800" />

                        <div className="mt-4 flex gap-3">

                            <div className="h-8 w-24 animate-pulse rounded bg-slate-800" />

                            <div className="h-8 w-20 animate-pulse rounded bg-slate-800" />

                        </div>

                    </div>

                    <div className="h-56 w-full animate-pulse rounded-lg bg-slate-800 lg:w-96" />

                </div>

            </section>

            {/* ---------------------------------------------------------- */}
            {/* Stats                                                      */}
            {/* ---------------------------------------------------------- */}

            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                {Array.from({ length: 9 }).map((_, index) => (

                    <div

                        key={index}

                        className="rounded-xl border border-slate-800 bg-slate-900 p-6"

                    >

                        <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />

                        <div className="mt-5 h-10 w-20 animate-pulse rounded bg-slate-800" />

                    </div>

                ))}

            </section>

            {/* ---------------------------------------------------------- */}
            {/* Quick Actions                                              */}
            {/* ---------------------------------------------------------- */}

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                {Array.from({ length: 4 }).map((_, index) => (

                    <div

                        key={index}

                        className="h-36 animate-pulse rounded-xl border border-slate-800 bg-slate-900"

                    />

                ))}

            </section>

            {/* ---------------------------------------------------------- */}
            {/* Recent Plans                                               */}
            {/* ---------------------------------------------------------- */}

            <section className="rounded-xl border border-slate-800 bg-slate-900">

                <div className="border-b border-slate-800 p-6">

                    <div className="h-6 w-52 animate-pulse rounded bg-slate-800" />

                </div>

                <div className="space-y-4 p-6">

                    {Array.from({ length: 5 }).map((_, index) => (

                        <div

                            key={index}

                            className="h-16 animate-pulse rounded bg-slate-800"

                        />

                    ))}

                </div>

            </section>

            {/* ---------------------------------------------------------- */}
            {/* Bottom Grid                                                */}
            {/* ---------------------------------------------------------- */}

            <section className="grid gap-6 xl:grid-cols-2">

                {Array.from({ length: 4 }).map((_, index) => (

                    <div

                        key={index}

                        className="rounded-xl border border-slate-800 bg-slate-900"

                    >

                        <div className="border-b border-slate-800 p-6">

                            <div className="h-6 w-48 animate-pulse rounded bg-slate-800" />

                        </div>

                        <div className="space-y-4 p-6">

                            {Array.from({ length: 4 }).map((__, row) => (

                                <div

                                    key={row}

                                    className="h-14 animate-pulse rounded bg-slate-800"

                                />

                            ))}

                        </div>

                    </div>

                ))}

            </section>

        </div>

    );

}