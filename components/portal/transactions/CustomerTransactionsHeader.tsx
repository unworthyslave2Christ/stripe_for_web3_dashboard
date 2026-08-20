import {
    Activity,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

export function CustomerTransactionsHeader({
    demo,
}: {
    demo: boolean;
}) {
    return (
        <div>

            <div className="flex items-center gap-2">

                <p className="text-sm font-medium text-muted-foreground">
                    Customer portal
                </p>

                <Badge variant="secondary">
                    Smart Account
                </Badge>

                {demo && (
                    <Badge variant="outline">
                        Test mode
                    </Badge>
                )}

            </div>

            <div className="mt-1 flex items-center gap-2">

                <Activity className="size-5 text-muted-foreground" />

                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Transactions
                </h1>

            </div>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Review the blockchain transactions performed by or for your Smart Account.
            </p>

        </div>
    );
}