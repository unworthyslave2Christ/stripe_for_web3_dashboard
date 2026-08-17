import {
    ArrowUpRight,
    CheckCircle2,
    CreditCard,
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
} from "@/components/ui/card";

export function CustomerTransactionHighlight() {
    return (
        <Card className="overflow-hidden border-primary/20">

            <CardContent className="p-5">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-start gap-4">

                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                            <CreditCard className="size-5 text-primary" />
                        </div>

                        <div>

                            <div className="flex flex-wrap items-center gap-2">

                                <p className="text-sm font-semibold">
                                    Latest transaction
                                </p>

                                <Badge variant="secondary">
                                    <CheckCircle2 />
                                    Successful
                                </Badge>

                            </div>

                            <p className="mt-1 text-lg font-semibold">
                                Pro subscription billing
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Jun 12, 2025 · 09:41
                            </p>

                        </div>

                    </div>

                    <div className="text-left lg:text-right">

                        <p className="text-2xl font-semibold">
                            19 USDC
                        </p>

                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                        >
                            View transaction
                            <ArrowUpRight />
                        </Button>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}