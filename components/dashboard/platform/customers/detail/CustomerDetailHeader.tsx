"use client";

import {
    ArrowLeft,
    ArrowUpRight,
    ShieldCheck,
    WalletCards,
} from "lucide-react";
import Link from "next/link";
import type { Address } from "viem";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface CustomerDetailRecord {
    customerId: string;
    ownerWallet: Address;
    smartAccount: Address;
    displayName: string;
    email: string;
    status: "ACTIVE" | "SUSPENDED";
    createdAt: Date;
    updatedAt: Date;
}

function formatDate(value: Date) {
    return value.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric",
        },
    );
}

export function CustomerDetailHeader({
    customer,
}: {
    customer: CustomerDetailRecord;
}) {
    const initials =
        customer.displayName
            .split(/\s+/)
            .filter(Boolean)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

    return (
        <div className="space-y-5">
            <Button
                render={
                    <Link href="/dashboard/platform/customers">
                        <ArrowLeft />
                        Customers
                    </Link>
                }
                variant="ghost"
                size="sm"
                className="-ml-2"
            />

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                    <Avatar className="size-14">
                        <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                            {initials || "C"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                {customer.displayName}
                            </h1>

                            <Badge
                                variant={
                                    customer.status === "ACTIVE"
                                        ? "secondary"
                                        : "destructive"
                                }
                            >
                                {customer.status === "ACTIVE"
                                    ? "Active"
                                    : "Suspended"}
                            </Badge>

                            <Badge variant="outline">
                                Customer
                            </Badge>
                        </div>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {customer.customerId}
                        </p>

                        <p className="mt-2 break-all font-mono text-xs text-muted-foreground">
                            {customer.smartAccount}
                        </p>

                        <p className="mt-2 text-xs text-muted-foreground">
                            Created {formatDate(customer.createdAt)}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button
                        render={
                            <Link href="/dashboard/platform/customers">
                                <WalletCards />
                                Customer collection
                            </Link>
                        }
                        variant="outline"
                    />

                    <Button variant="outline">
                        <ShieldCheck />
                        Smart Account
                    </Button>
                </div>
            </div>
        </div>
    );
}