import Link from "next/link";

import {
    ArrowRight,
    Building2,
    UserRound,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Container,
} from "@/components/layout/Container";

import {
    Page,
} from "@/components/layout/Page";

import {
    Stack,
} from "@/components/layout/Stack";

export default function GetStartedPage() {
    return (
        <Page>

            <Container className="flex min-h-[calc(100vh-4rem)] max-w-5xl items-center py-12">

                <Stack
                    gap={8}
                    className="w-full"
                >

                    <div className="text-center">

                        <Badge variant="secondary">
                            Stripe for Web3
                        </Badge>

                        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                            What are you here to do?
                        </h1>

                        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                            Choose the experience that matches what you're building.
                        </p>

                    </div>

                    <div className="grid gap-4 md:grid-cols-2">

                        <StartCard
                            href="/merchant/onboarding"
                            icon={Building2}
                            title="I'm a merchant"
                            description="Create billing infrastructure, plans, subscriptions, and customer experiences."
                        />

                        <StartCard
                            href="/customer/onboarding"
                            icon={UserRound}
                            title="I'm a customer"
                            description="Create or access your Smart Account and manage subscriptions and billing."
                        />

                    </div>

                    <p className="text-center text-xs text-muted-foreground">
                        You can return to this page at any time.
                    </p>

                </Stack>

            </Container>

        </Page>
    );
}

function StartCard({
    href,
    icon: Icon,
    title,
    description,
}: {
    href: string;
    icon: typeof Building2;
    title: string;
    description: string;
}) {
    return (
        <Card className="group transition-all hover:-translate-y-0.5 hover:border-foreground/20">

            <Link href={href}>

                <CardHeader>

                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                        <Icon className="size-5" />
                    </div>

                    <CardTitle className="mt-4 flex items-center justify-between">
                        {title}

                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </CardTitle>

                    <CardDescription>
                        {description}
                    </CardDescription>

                </CardHeader>

                <CardContent>
                    <span className="text-sm font-medium">
                        Continue
                    </span>
                </CardContent>

            </Link>

        </Card>
    );
}