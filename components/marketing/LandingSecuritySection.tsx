import {
    CheckCircle2,
    LockKeyhole,
    ShieldCheck,
} from "lucide-react";

export function LandingSecuritySection() {
    return (
        <section
            id="security"
            className="border-b bg-muted/20"
        >

            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

                <div className="grid gap-10 lg:grid-cols-2">

                    <div>

                        <p className="text-sm font-medium text-muted-foreground">
                            Security
                        </p>

                        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Make authorization visible.
                        </h2>

                        <p className="mt-4 max-w-xl text-muted-foreground">
                            Stripe for Web3 is designed around explicit
                            Smart Account ownership and authorization rather
                            than hiding Web3 mechanics behind unexplained behavior.
                        </p>

                    </div>

                    <div className="space-y-4">

                        <SecurityPoint
                            icon={ShieldCheck}
                            title="Smart Account ownership"
                            description="Customers can see which wallet owns their Smart Account."
                        />

                        <SecurityPoint
                            icon={LockKeyhole}
                            title="Explicit permissions"
                            description="Billing capabilities are represented through explicit authorization."
                        />

                        <SecurityPoint
                            icon={CheckCircle2}
                            title="Operational visibility"
                            description="Billing, transactions, webhooks, notifications, and activity can be inspected."
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}

function SecurityPoint({
    icon: Icon,
    title,
    description,
}: {
    icon: typeof ShieldCheck;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-3 rounded-xl border bg-card p-5">

            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-4" />
            </div>

            <div>

                <p className="text-sm font-semibold">
                    {title}
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {description}
                </p>

            </div>

        </div>
    );
}