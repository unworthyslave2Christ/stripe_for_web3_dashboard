import {
    CalendarClock,
    ShieldCheck,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerSubscriptionGuidance() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    About your subscriptions
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <GuidanceItem
                        icon={ShieldCheck}
                        title="Billing is authorized"
                        description="Active subscriptions use your Smart Account's billing authorization."
                    />

                    <GuidanceItem
                        icon={CalendarClock}
                        title="Upcoming charges"
                        description="Your next billing date and amount are shown on each subscription."
                    />

                </div>

            </CardContent>

        </Card>
    );
}

function GuidanceItem({
    icon: Icon,
    title,
    description,
}: {
    icon: typeof ShieldCheck;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-3 rounded-lg border bg-muted/20 p-4">

            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-4 text-muted-foreground" />
            </div>

            <div>

                <p className="text-sm font-medium">
                    {title}
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {description}
                </p>

            </div>

        </div>
    );
}