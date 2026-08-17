import {
    ExternalLink,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerSmartAccountCard() {
    return (
        <Card className="overflow-hidden">

            <CardHeader>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                        <div className="flex items-center gap-2">

                            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                                <WalletCards className="size-4 text-primary" />
                            </div>

                            <CardTitle>
                                Your Smart Account
                            </CardTitle>

                        </div>

                        <CardDescription className="mt-2">
                            Your Stripe for Web3 Smart Account is the account
                            used to manage your decentralized subscriptions.
                        </CardDescription>

                    </div>

                    <Badge variant="secondary">
                        <ShieldCheck />
                        Active
                    </Badge>

                </div>

            </CardHeader>

            <CardContent>

                <div className="rounded-xl border bg-muted/30 p-4">

                    <p className="text-xs text-muted-foreground">
                        Smart Account address
                    </p>

                    <p className="mt-2 break-all font-mono text-sm">
                        0xf1cc103c9b156eE9c2C496f582075a3086eC2347
                    </p>

                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                    <Button>
                        Manage Smart Account
                    </Button>

                    <Button variant="outline">
                        <ExternalLink />
                        View on explorer
                    </Button>

                </div>

            </CardContent>

        </Card>
    );
}