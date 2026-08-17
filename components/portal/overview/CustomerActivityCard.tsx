import Link from "next/link";

import {
    ArrowRight,
    CreditCard,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const activity = [
    {
        title: "Billing completed",
        description: "Pro subscription billed successfully.",
        time: "2 hours ago",
        icon: CreditCard,
    },
    {
        title: "Smart Account verified",
        description: "Your Smart Account permission was checked.",
        time: "Yesterday",
        icon: ShieldCheck,
    },
    {
        title: "Smart Account created",
        description: "Your Stripe for Web3 account was created.",
        time: "12 days ago",
        icon: WalletCards,
    },
];

export function CustomerActivityCard() {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Recent activity
                </CardTitle>

            </CardHeader>

            <CardContent>

                <div className="space-y-0">

                    {activity.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="flex gap-3 border-b py-4 first:pt-0 last:border-0 last:pb-0"
                            >

                                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                                    <Icon className="size-4 text-muted-foreground" />
                                </div>

                                <div className="min-w-0 flex-1">

                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                                        <p className="text-sm font-medium">
                                            {item.title}
                                        </p>

                                        <span className="text-xs text-muted-foreground">
                                            {item.time}
                                        </span>

                                    </div>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {item.description}
                                    </p>

                                </div>

                            </div>
                        );
                    })}

                </div>

                <Link
                    href="/portal/transactions"
                    className="mt-4 flex items-center justify-center gap-2 text-sm font-medium hover:underline"
                >
                    View account activity
                    <ArrowRight className="size-4" />
                </Link>

            </CardContent>

        </Card>
    );
}