import {
    CheckCircle2,
    CreditCard,
    ShieldCheck,
    UserPlus,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerActivity() {
    const events = [
        {
            icon: UserPlus,
            title: "Customer created",
            description:
                "Customer account was registered.",
            date: "Jun 1, 2025",
        },
        {
            icon: ShieldCheck,
            title: "Billing permission granted",
            description:
                "A billing permission was associated with the smart account.",
            date: "Jun 1, 2025",
        },
        {
            icon: CreditCard,
            title: "Subscription created",
            description:
                "Customer subscribed to Pro Plan.",
            date: "Jun 12, 2025",
        },
        {
            icon: CheckCircle2,
            title: "Payment succeeded",
            description:
                "Recurring payment completed successfully.",
            date: "Jun 12, 2025",
        },
    ];

    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Recent activity
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="space-y-5">

                    {events.map(
                        (event, index) => {
                            const Icon =
                                event.icon;

                            return (
                                <div
                                    key={
                                        event.title
                                    }
                                    className="flex gap-3"
                                >

                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-muted/40">

                                        <Icon className="size-4 text-muted-foreground" />

                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                                            <p className="text-sm font-medium">
                                                {
                                                    event.title
                                                }
                                            </p>

                                            <span className="text-xs text-muted-foreground">
                                                {
                                                    event.date
                                                }
                                            </span>

                                        </div>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {
                                                event.description
                                            }
                                        </p>

                                    </div>

                                </div>
                            );
                        }
                    )}

                </div>

            </CardContent>

        </Card>
    );
}