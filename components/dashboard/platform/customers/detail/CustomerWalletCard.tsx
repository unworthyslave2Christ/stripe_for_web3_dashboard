
import {
    ExternalLink,
    Wallet,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Button,
} from "@/components/ui/button";

export function CustomerWalletCard({
    wallet,
}: {
    wallet: string;
}) {
    return (
        <Card>

            <CardHeader>

                <CardTitle className="flex items-center gap-2">
                    <Wallet className="size-4" />
                    Owner wallet
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

                <div className="rounded-lg border bg-muted/30 p-3">

                    <p className="break-all font-mono text-xs">
                        {wallet}
                    </p>

                </div>

                <Button
                    variant="outline"
                    className="w-full"
                    // onClick={() =>
                    //     console.log(
                    //         "Open wallet"
                    //     )
                    // }
                >
                    View wallet
                    <ExternalLink />
                </Button>

            </CardContent>

        </Card>
    );
}