import Link from "next/link";

import {
    ArrowRight,
    BarChart3,
    CreditCard,
    Users,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

export function LandingMerchantSection() {
    return (
        <section
            id="merchants"
            className="border-b"
        >

            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

                <div className="max-w-2xl">

                    <p className="text-sm font-medium text-muted-foreground">
                        For merchants
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Run recurring billing without rebuilding your infrastructure.
                    </h2>

                    <p className="mt-4 text-muted-foreground">
                        Create plans, manage subscriptions, operate billing,
                        configure webhooks, and understand your customers from one platform.
                    </p>

                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">

                    <MerchantFeature
                        icon={CreditCard}
                        title="Plans & subscriptions"
                        description="Define pricing and give customers a predictable recurring billing experience."
                    />

                    <MerchantFeature
                        icon={Users}
                        title="Customer management"
                        description="Understand customer Smart Accounts, subscriptions, permissions, and billing activity."
                    />

                    <MerchantFeature
                        icon={BarChart3}
                        title="Operational visibility"
                        description="Monitor revenue, billing success, webhooks, notifications, and activity."
                    />

                </div>

                <Button
                    render={
                        <Link href="/merchant/onboarding">
                            Build as a merchant
                            <ArrowRight />
                        </Link>
                    }
                    variant="outline"
                    className="mt-8"
                />
            </div>

        </section>
    );
}

function MerchantFeature({
    icon: Icon,
    title,
    description,
}: {
    icon: typeof CreditCard;
    title: string;
    description: string;
}) {
    return (
        <Card>

            <CardContent className="p-6">

                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5" />
                </div>

                <h3 className="mt-5 font-semibold">
                    {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                </p>

            </CardContent>

        </Card>
    );
}