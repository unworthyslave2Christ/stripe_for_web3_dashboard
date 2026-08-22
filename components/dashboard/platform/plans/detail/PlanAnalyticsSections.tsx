import {
    CircleDollarSign,
    Users,
} from "lucide-react";

import {
    Section,
} from "@/components/layout/Section";

import {
    PlanUnavailableSection,
} from "./PlanUnavailableSection";

export function PlanAnalyticsSections() {
    return (
        <>
            <Section
                title="Subscribers"
                description="Subscriber analytics will appear when subscription aggregation is exposed through the merchant SDK/API."
            >
                <PlanUnavailableSection
                    title="Subscriber analytics"
                    icon={Users}
                    description="The current merchant SDK exposes the plan record itself, but not subscriber aggregation for a specific plan yet."
                />
            </Section>

            <Section
                title="Revenue"
                description="Revenue analytics will appear when merchant billing metrics are exposed through the merchant SDK/API."
            >
                <PlanUnavailableSection
                    title="Revenue analytics"
                    icon={CircleDollarSign}
                    description="Monthly revenue, lifetime revenue, and historical revenue series are intentionally not fabricated from the plan record."
                />
            </Section>
        </>
    );
}