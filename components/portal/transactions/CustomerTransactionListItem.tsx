import Link from "next/link";

import {
    Activity,
    Blocks,
    CalendarClock,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    CustomerTransactionAction,
} from "./CustomerTransactionAction";

import {
    CustomerTransactionAmount,
} from "./CustomerTransactionAmount";

import {
    CustomerTransactionStatusBadge,
} from "./CustomerTransactionStatusBadge";

import type {
    CustomerTransactionRecord,
} from "./customer-transaction.types";

export function CustomerTransactionListItem({
    transaction,
}: {
    transaction: CustomerTransactionRecord;
}) {
    return (
        <Card className="transition-colors hover:border-foreground/20">

            <CardContent className="p-5">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                    {/* IDENTITY */}

                    <div className="flex min-w-0 flex-1 items-start gap-3">

                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                            <Activity className="size-4 text-muted-foreground" />
                        </div>

                        <div className="min-w-0">

                            <p className="truncate text-sm font-semibold">
                                {transaction.title}
                            </p>

                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                {transaction.description}
                            </p>

                            <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                                <Blocks className="size-3" />

                                {formatAddress(
                                    transaction.transactionHash,
                                )}
                            </p>

                        </div>

                    </div>

                    {/* TYPE */}

                    <div className="min-w-[160px]">

                        <p className="text-xs text-muted-foreground">
                            Type
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {formatType(
                                transaction.type,
                            )}
                        </p>

                    </div>

                    {/* AMOUNT */}

                    <div className="min-w-[130px]">
                        <CustomerTransactionAmount
                            amount={
                                transaction.amount
                            }
                            currency={
                                transaction.currency
                            }
                        />
                    </div>

                    {/* STATUS */}

                    <div>
                        <CustomerTransactionStatusBadge
                            status={
                                transaction.status
                            }
                        />
                    </div>

                    {/* TIME */}

                    <div className="min-w-[160px]">

                        <p className="flex items-center gap-1.5 text-sm">

                            <CalendarClock className="size-3.5 text-muted-foreground" />

                            {transaction.timestamp}

                        </p>

                        {transaction.blockNumber && (
                            <p className="mt-1 text-xs text-muted-foreground">
                                Block {transaction.blockNumber}
                            </p>
                        )}

                    </div>

                    {/* ACTION */}

                    <div className="shrink-0">
                        <CustomerTransactionAction
                            explorerUrl={
                                transaction.explorerUrl
                            }
                        />
                    </div>

                </div>

            </CardContent>

        </Card>
    );
}

function formatAddress(
    hash: string,
) {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

function formatType(
    type: CustomerTransactionRecord["type"],
) {
    switch (type) {
        case "SUBSCRIPTION_BILLING":
            return "Subscription billing";

        case "PERMISSION_UPDATE":
            return "Permission update";

        case "ACCOUNT_OPERATION":
            return "Account operation";

        case "REFUND":
            return "Refund";

        default:
            return "Other";
    }
}