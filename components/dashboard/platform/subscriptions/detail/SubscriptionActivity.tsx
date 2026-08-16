import {
    CheckCircle2,
    CreditCard,
    PauseCircle,
    PlayCircle,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    SubscriptionActivityItem,
} from "./SubscriptionActivityItem";

const activity = [
    {
        title: "Subscription created",
        description:
            "Customer subscribed to the Pro plan.",
        time: "May 12, 2025",
        icon: PlayCircle,
    },
    {
        title: "Billing completed",
        description:
            "Recurring payment completed successfully.",
        time: "Jun 12, 2025",
        icon: CreditCard,
    },
    {
        title: "Billing authorization verified",
        description:
            "The customer Smart Account permission was verified.",
        time: "Jun 12, 2025",
        icon: CheckCircle2,
    },
];

export function SubscriptionActivity() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Recent activity
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="space-y-0">

                    {activity.map((event, index) => (
                        <SubscriptionActivityItem
                            key={index}
                            {...event}
                        />
                    ))}

                </div>

            </CardContent>

        </Card>
    );
}