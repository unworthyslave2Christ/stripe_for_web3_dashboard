import {
    CreditCard,
    UserPlus,
    Wallet,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const activity = [
    {
        title: "New customer created",
        description: "Customer smart account registered.",
        time: "4 minutes ago",
        icon: UserPlus,
    },
    {
        title: "Subscription activated",
        description: "Pro subscription activated.",
        time: "18 minutes ago",
        icon: CreditCard,
    },
    {
        title: "Smart account funded",
        description: "Customer wallet received funds.",
        time: "31 minutes ago",
        icon: Wallet,
    },
];

export function ActivityFeed() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Recent activity
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="space-y-5">

                    {activity.map((item) => {

                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="flex gap-3"
                            >

                                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                                    <Icon className="size-4 text-muted-foreground" />
                                </div>

                                <div className="min-w-0 flex-1">

                                    <p className="text-sm font-medium">
                                        {item.title}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {item.description}
                                    </p>

                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {item.time}
                                    </p>

                                </div>

                            </div>
                        );
                    })}

                </div>

            </CardContent>

        </Card>
    );
}