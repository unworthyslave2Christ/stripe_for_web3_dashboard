import {
    Activity,
    CheckCircle2,
    Clock3,
    XCircle,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    CustomerTransactionOverviewCard,
} from "./CustomerTransactionOverviewCard";

export function CustomerTransactionsOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of your Smart Account transaction activity."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <CustomerTransactionOverviewCard
                    title="Transactions"
                    value="27"
                    description="Lifetime transactions"
                    icon={Activity}
                />

                <CustomerTransactionOverviewCard
                    title="Successful"
                    value="26"
                    description="Completed successfully"
                    icon={CheckCircle2}
                />

                <CustomerTransactionOverviewCard
                    title="Pending"
                    value="1"
                    description="Awaiting confirmation"
                    icon={Clock3}
                />

                <CustomerTransactionOverviewCard
                    title="Failed"
                    value="0"
                    description="Failed transactions"
                    icon={XCircle}
                />

            </Grid>
        </Section>
    );
}