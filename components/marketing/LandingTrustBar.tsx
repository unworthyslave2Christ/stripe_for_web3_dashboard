import {
    Badge,
} from "@/components/ui/badge";

export function LandingTrustBar() {
    return (
        <section className="border-b bg-muted/20">

            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-5 text-sm text-muted-foreground sm:px-6 lg:px-8">

                <span>
                    Merchant billing
                </span>

                <span>
                    Smart Accounts
                </span>

                <span>
                    Recurring subscriptions
                </span>

                <span>
                    Developer APIs
                </span>

                <Badge variant="outline">
                    Built for Web3
                </Badge>

            </div>

        </section>
    );
}