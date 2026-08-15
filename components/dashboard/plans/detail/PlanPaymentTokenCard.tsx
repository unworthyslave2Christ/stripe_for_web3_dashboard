import {
    Coins,
    Copy,
    ExternalLink,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function PlanPaymentTokenCard({
    symbol,
    address,
}: {
    symbol: string;
    address: string;
}) {
    return (
        <Card>

            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Coins className="size-4" />
                    Payment token
                </CardTitle>
            </CardHeader>

            <CardContent>

                <p className="text-sm font-medium">
                    {symbol}
                </p>

                <p className="mt-2 break-all rounded-lg border bg-muted/30 p-3 font-mono text-xs leading-5">
                    {address}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                    <Button
                        variant="outline"
                        size="sm"
                    >
                        <Copy />
                        Copy
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                    >
                        <ExternalLink />
                        Explorer
                    </Button>

                </div>

            </CardContent>

        </Card>
    );
}