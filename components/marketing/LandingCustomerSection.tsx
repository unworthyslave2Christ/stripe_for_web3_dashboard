import Link from "next/link";

import {
    ArrowRight,
    Bell,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

export function LandingCustomerSection() {
    return (
        <section
            id="customers"
            className="border-b bg-muted/20"
        >

            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

                    <div>

                        <p className="text-sm font-medium text-muted-foreground">
                            For customers
                        </p>

                        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                            A simpler way to use Web3 subscriptions.
                        </h2>

                        <p className="mt-4 max-w-xl text-muted-foreground">
                            Create a Smart Account, manage subscriptions,
                            review billing, inspect transactions, and control
                            authorization from one place.
                        </p>

                        <Button
                            render={
                                <Link href="/customer/onboarding">
                                    Create your Smart Account
                                    <ArrowRight />
                                </Link>
                            }
                            className="mt-8"
                        />
                            

                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">

                        <CustomerFeature
                            icon={WalletCards}
                            title="Smart Account"
                            description="One account for your decentralized billing experience."
                        />

                        <CustomerFeature
                            icon={ShieldCheck}
                            title="Explicit authorization"
                            description="See what your Smart Account is authorized to do."
                        />

                        <CustomerFeature
                            icon={Bell}
                            title="Notifications"
                            description="Know when billing and subscription events happen."
                        />

                        <CustomerFeature
                            icon={WalletCards}
                            title="Transactions"
                            description="Inspect the blockchain activity behind your account."
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}

function CustomerFeature({
    icon: Icon,
    title,
    description,
}: {
    icon: typeof WalletCards;
    title: string;
    description: string;
}) {
    return (
        <Card>

            <CardContent className="p-5">

                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-4" />
                </div>

                <p className="mt-4 text-sm font-semibold">
                    {title}
                </p>

                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {description}
                </p>

            </CardContent>

        </Card>
    );
}