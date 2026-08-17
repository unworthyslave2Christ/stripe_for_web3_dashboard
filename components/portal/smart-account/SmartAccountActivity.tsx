import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    SmartAccountActivityItem,
} from "./SmartAccountActivityItem";

const activity = [
    {
        title: "Billing authorization verified",
        description:
            "The active subscription permission was verified.",
        time: "2 hours ago",
    },
    {
        title: "Billing completed",
        description:
            "A recurring subscription charge completed successfully.",
        time: "2 hours ago",
    },
    {
        title: "Smart Account created",
        description:
            "Your Stripe for Web3 Smart Account was created.",
        time: "12 days ago",
    },
];

export function SmartAccountActivity() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Smart Account activity
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="space-y-0">

                    {activity.map((event) => (
                        <SmartAccountActivityItem
                            key={event.title}
                            {...event}
                        />
                    ))}

                </div>

            </CardContent>

        </Card>
    );
}