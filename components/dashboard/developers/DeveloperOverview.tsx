import {
    AlertTriangle,
    KeyRound,
    Radio,
    ShieldCheck,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    Card,
} from "@/components/ui/card";

function DeveloperKpiCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: string;
    description: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
}) {
    return (
        <Card className="p-5">

            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-semibold tracking-tight">
                        {value}
                    </p>

                </div>

                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                    <Icon className="size-4 text-muted-foreground" />
                </div>

            </div>

            <p className="mt-4 text-xs text-muted-foreground">
                {description}
            </p>

        </Card>
    );
}

export function DeveloperOverview({
    summary,
    available,
}: {
    summary: {
        total: number;
        active: number;
        live: number;
        attention: number;
    };

    available: boolean;
}) {
    return (
        <Section
            title="Developer access"
            description="A summary of your merchant's API credentials and integration access."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <DeveloperKpiCard
                    title="Total API keys"
                    value={
                        available
                            ? summary.total.toLocaleString()
                            : "—"
                    }
                    description={
                        available
                            ? "All environments"
                            : "API key resource unavailable"
                    }
                    icon={KeyRound}
                />

                <DeveloperKpiCard
                    title="Active keys"
                    value={
                        available
                            ? summary.active.toLocaleString()
                            : "—"
                    }
                    description={
                        available
                            ? "Currently usable"
                            : "Waiting for API implementation"
                    }
                    icon={ShieldCheck}
                />

                <DeveloperKpiCard
                    title="Live keys"
                    value={
                        available
                            ? summary.live.toLocaleString()
                            : "—"
                    }
                    description={
                        available
                            ? "Production access"
                            : "Waiting for API implementation"
                    }
                    icon={Radio}
                />

                <DeveloperKpiCard
                    title="Needs attention"
                    value={
                        available
                            ? summary.attention.toLocaleString()
                            : "—"
                    }
                    description={
                        available
                            ? "Expired or expiring"
                            : "Waiting for API implementation"
                    }
                    icon={AlertTriangle}
                />

            </Grid>
        </Section>
    );
}