"use client";

import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

export function CustomerDetailUnavailable({
    customerId,
}: {
    customerId: string;
}) {
    return (
        <Card className="border-amber-500/20">
            <CardContent className="p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <ShieldCheck className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium">
                                Customer detail lookup is not exposed yet
                            </p>

                            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                                SDK capability boundary
                            </span>
                        </div>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            This route is implemented and ready for the
                            merchant customer-detail resource, but the current
                            customer SDK only exposes wallet-based customer
                            lookup. No synthetic customer, subscription,
                            billing, permission, transaction, or revenue
                            values are displayed.
                        </p>

                        <div className="mt-4 rounded-lg border bg-muted/20 p-3">
                            <p className="text-xs text-muted-foreground">
                                Requested customer ID
                            </p>

                            <code className="mt-1 block break-all font-mono text-xs">
                                {customerId}
                            </code>
                        </div>

                        <div className="mt-4 rounded-lg border bg-muted/20 p-4">
                            <p className="text-sm font-medium">
                                Current supported lookup
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                The currently exposed customer SDK operation
                                resolves a customer from its owner wallet.
                                A merchant-side customerId lookup needs to be
                                exposed before this route can safely retrieve
                                an arbitrary customer.
                            </p>

                            <code className="mt-3 block rounded-md border bg-background p-3 font-mono text-xs">
                                customerClient.getByWallet(ownerWallet)
                            </code>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <Button
                                render={
                                    <Link href="/dashboard/platform/customers">
                                        <ArrowLeft />
                                        Back to customers
                                    </Link>
                                }
                                variant="outline"
                                size="sm"
                            />

                            <Button
                                render={
                                    <Link href="/dashboard/platform/customers">
                                        Customer collection
                                        <ArrowUpRight />
                                    </Link>
                                }
                                size="sm"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}