import Link from "next/link";

import {
    ArrowRight,
    CheckCircle2,
    Copy,
    ShieldCheck,
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
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerSmartAccountCard({
    smartAccount,
}: {
    smartAccount:
        | string
        | undefined;
}) {
    const ready =
        Boolean(
            smartAccount,
        );

    return (
        <Card>

            <CardHeader>

                <div className="flex items-center justify-between gap-3">

                    <CardTitle>
                        Smart Account
                    </CardTitle>

                    {ready ? (
                        <Badge variant="secondary">
                            <CheckCircle2 />
                            Ready
                        </Badge>
                    ) : (
                        <Badge variant="outline">
                            Not created
                        </Badge>
                    )}

                </div>

            </CardHeader>

            <CardContent className="space-y-5">

                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">

                    <ShieldCheck className="size-5 text-primary" />

                </div>

                {ready ? (
                    <>
                        <div>

                            <p className="text-sm text-muted-foreground">
                                Your account
                            </p>

                            <code className="mt-2 block break-all rounded-lg border bg-muted/20 p-3 font-mono text-xs leading-5">
                                {smartAccount}
                            </code>

                        </div>

                        <div className="flex flex-wrap gap-2">

                            <Button
                                variant="outline"
                                size="sm"
                            >
                                <Copy />
                                Copy
                            </Button>

                            <Button
                                render={
                                    <Link href="/portal/smart-account">
                                        Manage
                                        <ArrowRight />
                                    </Link>
                                }
                                size="sm"
                                variant="outline"
                            />

                        </div>
                    </>
                ) : (
                    <div>

                        <p className="text-sm font-medium">
                            Your Smart Account is not available yet.
                        </p>

                        <p className="mt-2 text-xs leading-5 text-muted-foreground">
                            Complete customer onboarding to create your Smart Account.
                        </p>

                    </div>
                )}

            </CardContent>

        </Card>
    );
}