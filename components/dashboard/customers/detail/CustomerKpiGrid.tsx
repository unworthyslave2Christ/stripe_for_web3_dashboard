import {
    CalendarClock,
    CreditCard,
    DollarSign,
    ShieldCheck,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    CustomerKpiCard,
} from "./CustomerKpiCard";

export function CustomerKpiGrid({
    totalBilled,
    activeSubscriptions,
    nextBilling,
    permissionStatus,
}: {
    totalBilled: string;
    activeSubscriptions: number;
    nextBilling: string;
    permissionStatus: string;
}) {
    return (
        <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <CustomerKpiCard
                title="Total billed"
                value={totalBilled}
                description="Lifetime billing volume"
                icon={DollarSign}
            />

            <CustomerKpiCard
                title="Subscriptions"
                value={String(activeSubscriptions)}
                description="Currently active"
                icon={CreditCard}
            />

            <CustomerKpiCard
                title="Next billing"
                value={nextBilling}
                description="Next scheduled charge"
                icon={CalendarClock}
            />

            <CustomerKpiCard
                title="Permission"
                value={permissionStatus}
                description="Billing authorization"
                icon={ShieldCheck}
            />

        </Grid>
    );
}