// components/dashboard/RecentCustomers.tsx

"use client";

import Link from "next/link";

import {
    ArrowRight,
    UserRound,
    Wallet,
    ShieldCheck,
} from "lucide-react";

interface RecentCustomersProps {
    customers: any[];
}

export default function RecentCustomers({
    customers,
}: RecentCustomersProps) {

    return (

        <section className="mt-10">

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-semibold">

                        Customers

                    </h2>

                    <p className="mt-1 text-slate-400">

                        Customers currently using your subscription plans.

                    </p>

                </div>

                <Link
                    href="/dashboard/customers"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                >

                    View All

                    <ArrowRight size={16} />

                </Link>

            </div>

            {customers.length === 0 ? (

                <EmptyState />

            ) : (

                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

                    <table className="w-full">

                        <thead className="border-b border-slate-800 bg-slate-950">

                            <tr>

                                <Header>

                                    Customer

                                </Header>

                                <Header>

                                    Wallet

                                </Header>

                                <Header>

                                    Smart Account

                                </Header>

                                <Header>

                                    Status

                                </Header>

                            </tr>

                        </thead>

                        <tbody>

                            {customers.map((entry: any) => {

                                const customer =
                                    entry.customers;

                                return (

                                    <tr
                                        key={
                                            customer.customer_id
                                        }
                                        className="border-b border-slate-800 last:border-0 hover:bg-slate-800/40"
                                    >

                                        <Cell>

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">

                                                    <UserRound
                                                        size={18}
                                                    />

                                                </div>

                                                <div>

                                                    <div className="font-medium">

                                                        {
                                                            customer.display_name
                                                        }

                                                    </div>

                                                    <div className="font-mono text-xs text-slate-500">

                                                        {
                                                            customer.customer_id
                                                        }

                                                    </div>

                                                </div>

                                            </div>

                                        </Cell>

                                        <Cell>

                                            <AddressText
                                                icon={
                                                    <Wallet
                                                        size={15}
                                                    />
                                                }
                                                address={
                                                    customer.wallet_address
                                                }
                                            />

                                        </Cell>

                                        <Cell>

                                            <AddressText
                                                icon={
                                                    <ShieldCheck
                                                        size={15}
                                                    />
                                                }
                                                address={
                                                    customer.smart_account
                                                }
                                            />

                                        </Cell>

                                        <Cell>

                                            <StatusBadge
                                                status={
                                                    customer.status
                                                }
                                            />

                                        </Cell>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                </div>

            )}

        </section>

    );

}

/* -------------------------------------------------------------------------- */
/* Address                                                                     */
/* -------------------------------------------------------------------------- */

function AddressText({

    address,

    icon,

}: {

    address: string;

    icon: React.ReactNode;

}) {

    return (

        <div className="flex items-center gap-2">

            <span className="text-slate-400">

                {icon}

            </span>

            <span className="font-mono text-xs">

                {address.slice(0, 8)}

                ...

                {address.slice(-6)}

            </span>

        </div>

    );

}

/* -------------------------------------------------------------------------- */
/* Empty State                                                                 */
/* -------------------------------------------------------------------------- */

function EmptyState() {

    return (

        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 py-16">

            <div className="mx-auto flex max-w-sm flex-col items-center text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">

                    <UserRound
                        size={30}
                    />

                </div>

                <h3 className="mt-6 text-xl font-semibold">

                    No Customers Yet

                </h3>

                <p className="mt-3 text-sm text-slate-400">

                    Customers will automatically appear here after subscribing to one of your billing plans.

                </p>

            </div>

        </div>

    );

}

/* -------------------------------------------------------------------------- */
/* Status Badge                                                                */
/* -------------------------------------------------------------------------- */

function StatusBadge({
    status,
}: {
    status: string;
}) {

    const colors: Record<string, string> = {

        ACTIVE:
            "bg-emerald-500/20 text-emerald-400",

        SUSPENDED:
            "bg-yellow-500/20 text-yellow-400",

        INACTIVE:
            "bg-slate-700 text-slate-300",

        BLOCKED:
            "bg-red-500/20 text-red-400",

    };

    return (

        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                colors[status] ??
                "bg-slate-700 text-slate-300"
            }`}
        >

            {status}

        </span>

    );

}

/* -------------------------------------------------------------------------- */
/* Table Helpers                                                               */
/* -------------------------------------------------------------------------- */

function Header({
    children,
}: {
    children: React.ReactNode;
}) {

    return (

        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">

            {children}

        </th>

    );

}

function Cell({
    children,
}: {
    children: React.ReactNode;
}) {

    return (

        <td className="px-6 py-5 text-sm">

            {children}

        </td>

    );

}