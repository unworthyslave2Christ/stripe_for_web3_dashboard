import {
    CalendarDays,
    Copy,
    MoreHorizontal,
    WalletCards,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
} from "@/components/ui/card";

import {
    CustomerStatusBadge,
} from "../CustomerStatusBadge";

import {
    CustomerDetailActions,
} from "./CustomerDetailActions";
import { CustomerStatus } from "../customer.types";

type Customer = {
    id: string;
    displayName: string;
    status: "ACTIVE" | "PAUSED" | "CANCELLED";
    ownerWallet: string;
    smartAccount: string;
    createdAt: string;
};

export function CustomerDetailHeader({
    customer,
}: {
    customer: Customer;
}) {
    return (
        <Card className="p-5 sm:p-6">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex min-w-0 items-start gap-4">

                    <Avatar className="size-14 shrink-0">

                        <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                            {customer.displayName
                                .slice(0, 2)
                                .toUpperCase()}
                        </AvatarFallback>

                    </Avatar>

                    <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                            <h1 className="text-2xl font-semibold tracking-tight">
                                {customer.displayName}
                            </h1>

                            <CustomerStatusBadge
                                status={customer.status as CustomerStatus}
                            />

                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">

                            <span>
                                {customer.id}
                            </span>

                            <span className="hidden sm:inline">
                                •
                            </span>

                            <span className="inline-flex items-center gap-1.5">
                                <CalendarDays className="size-3.5" />
                                Joined {customer.createdAt}
                            </span>

                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">

                            <Badge variant="secondary">
                                <WalletCards />
                                Smart account
                            </Badge>

                            <Badge variant="outline">
                                Customer
                            </Badge>

                        </div>

                    </div>

                </div>

                <CustomerDetailActions />

            </div>

        </Card>
    );
}