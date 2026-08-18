import {
    Badge,
} from "@/components/ui/badge";

import {
    CustomerAddress,
} from "../shared/CustomerAddress";

export function CustomerOverviewHeader() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

            <div>

                <p className="text-sm font-medium text-muted-foreground">
                    Customer portal
                </p>

                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Welcome back, Alex.
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    Manage your Smart Account, subscriptions, billing,
                    permissions, and notifications from one place.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">

                    <Badge variant="secondary">
                        Smart Account active
                    </Badge>

                    <CustomerAddress
                        address="0xf1cc103c9b156eE9c2C496f582075a3086eC2347"
                    />

                </div>

            </div>

        </div>
    );
}