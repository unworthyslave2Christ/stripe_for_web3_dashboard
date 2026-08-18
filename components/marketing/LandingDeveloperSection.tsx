import {
    Code2,
    KeyRound,
    Webhook,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

export function LandingDeveloperSection() {
    return (
        <section
            id="developers"
            className="border-b"
        >

            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

                <div className="max-w-2xl">

                    <p className="text-sm font-medium text-muted-foreground">
                        Developers
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Infrastructure you can integrate, not just a dashboard you can click.
                    </h2>

                    <p className="mt-4 text-muted-foreground">
                        Use the SDK and API to bring customer onboarding,
                        plans, subscriptions, permissions, billing, and webhooks
                        into your own application.
                    </p>

                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">

                    <DeveloperFeature
                        icon={Code2}
                        title="SDK"
                        description="A reusable application-facing SDK for customer and merchant workflows."
                    />

                    <DeveloperFeature
                        icon={KeyRound}
                        title="API"
                        description="Server-side integration through merchant-scoped API credentials."
                    />

                    <DeveloperFeature
                        icon={Webhook}
                        title="Webhooks"
                        description="Receive events when billing, subscriptions, and account state change."
                    />

                </div>

            </div>

        </section>
    );
}

function DeveloperFeature({
    icon: Icon,
    title,
    description,
}: {
    icon: typeof Code2;
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