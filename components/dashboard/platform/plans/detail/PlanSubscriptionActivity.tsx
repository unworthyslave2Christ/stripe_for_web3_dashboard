import {
    CreditCard,
    UserCheck,
    UserMinus,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    PlanSubscriptionActivityItem,
} from "./PlanSubscriptionActivityItem";

const activity = [
    {
        title: "New subscription",
        description: "A customer subscribed to Pro.",
        time: "5 minutes ago",
        icon: UserCheck,
    },
    {
        title: "Subscription renewed",
        description: "Recurring billing completed successfully.",
        time: "2 hours ago",
        icon: CreditCard,
    },
    {
        title: "Subscription cancelled",
        description: "A customer cancelled their Pro subscription.",
        time: "Yesterday",
        icon: UserMinus,
    },
];

export function PlanSubscriptionActivity() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Recent subscription activity
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-0">

                {activity.map((event, index) => (
                    <PlanSubscriptionActivityItem
                        key={index}
                        {...event}
                    />
                ))}

            </CardContent>

        </Card>
    );
}