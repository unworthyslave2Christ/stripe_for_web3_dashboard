import Link from "next/link";

import {
    ArrowRight,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function LandingCta() {
    return (
        <section>

            <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">

                <p className="text-sm font-medium text-muted-foreground">
                    Ready to build?
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Bring recurring billing to your Web3 product.
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                    Start as a merchant, connect as a customer, or integrate
                    the Stripe for Web3 SDK into an existing application.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                    <Button
                        render={
                            <Link href="/get-started">
                                Get started
                                <ArrowRight />
                            </Link>
                        }
                        size="lg"
                    />
                    

                    <Button
                        render={
                            <Link href="/customer/onboarding">
                                Customer portal
                            </Link>
                        }
                        size="lg"
                        variant="outline"
                    />
                        
                    

                </div>

            </div>

        </section>
    );
}