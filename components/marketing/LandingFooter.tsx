import Link from "next/link";

export function LandingFooter() {
    return (
        <footer className="border-t bg-muted/20">

            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

                <div>

                    <p className="font-semibold">
                        Stripe for Web3
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Billing infrastructure for decentralized businesses.
                    </p>

                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">

                    <Link
                        href="/get-started"
                        className="hover:text-foreground"
                    >
                        Get started
                    </Link>

                    <Link
                        href="/merchant/onboarding"
                        className="hover:text-foreground"
                    >
                        Merchant
                    </Link>

                    <Link
                        href="/customer/onboarding"
                        className="hover:text-foreground"
                    >
                        Customer
                    </Link>

                    <Link
                        href="#developers"
                        className="hover:text-foreground"
                    >
                        Developers
                    </Link>

                </div>

            </div>

        </footer>
    );
}