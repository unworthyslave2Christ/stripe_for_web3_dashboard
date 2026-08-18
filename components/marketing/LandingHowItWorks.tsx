const steps = [
    {
        number: "01",
        title: "Connect",
        description:
            "Connect a wallet and identify the account interacting with Stripe for Web3.",
    },
    {
        number: "02",
        title: "Create",
        description:
            "Merchants configure billing infrastructure while customers create their Smart Account.",
    },
    {
        number: "03",
        title: "Subscribe",
        description:
            "Customers select a merchant plan and authorize recurring billing through their Smart Account.",
    },
    {
        number: "04",
        title: "Operate",
        description:
            "Subscriptions, billing, notifications, permissions, and transactions become manageable product objects.",
    },
];

export function LandingHowItWorks() {
    return (
        <section
            id="product"
            className="border-b"
        >

            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

                <div className="max-w-2xl">

                    <p className="text-sm font-medium text-muted-foreground">
                        How it works
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                        One flow from wallet to billing.
                    </h2>

                </div>

                <div className="mt-10 grid gap-4 lg:grid-cols-4">

                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="rounded-xl border bg-card p-6"
                        >

                            <p className="font-mono text-xs text-muted-foreground">
                                {step.number}
                            </p>

                            <h3 className="mt-5 font-semibold">
                                {step.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {step.description}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}