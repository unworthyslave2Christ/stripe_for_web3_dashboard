import {
    ExternalLink,
    MoreHorizontal,
    Wallet,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface CustomerTableRowProps {
    customer: {
        id: string;

        name: string;

        email: string;

        wallet: string;

        smartAccount:
            | string
            | null;

        smartAccountReady:
            boolean;

        status: string;

        subscriptions: number;

        lastActivity: string;
    };
}

////////////////////////////////////////////////////////////
// ROW
////////////////////////////////////////////////////////////

export function CustomerTableRow({
    customer,
}: CustomerTableRowProps) {
    return (
        <tr className="border-b transition-colors last:border-0 hover:bg-muted/30">

            {/* CUSTOMER */}

            <td className="px-6 py-4">

                <div className="flex items-center gap-3">

                    <Avatar className="size-9">

                        <AvatarFallback>
                            <Wallet className="size-4" />
                        </AvatarFallback>

                    </Avatar>

                    <div className="min-w-0">

                        <p className="truncate font-medium">
                            {customer.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                            {customer.email}
                        </p>

                    </div>

                </div>

            </td>

            {/* WALLET */}

            <td className="px-6 py-4">

                <code className="rounded bg-muted px-2 py-1 text-xs">
                    {customer.wallet}
                </code>

            </td>

            {/* SMART ACCOUNT */}

            <td className="px-6 py-4">

                <div className="space-y-1">

                    {customer.smartAccountReady ? (
                        <Badge>
                            Ready
                        </Badge>
                    ) : (
                        <Badge variant="secondary">
                            Not created
                        </Badge>
                    )}

                    {customer.smartAccount && (
                        <p>
                            <code className="text-xs text-muted-foreground">
                                {customer.smartAccount}
                            </code>
                        </p>
                    )}

                </div>

            </td>

            {/* STATUS */}

            <td className="px-6 py-4">

                {customer.status === "ACTIVE" ? (
                    <Badge>
                        Active
                    </Badge>
                ) : (
                    <Badge variant="secondary">
                        Pending
                    </Badge>
                )}

            </td>

            {/* SUBSCRIPTIONS */}

            <td className="px-6 py-4 font-medium">
                {customer.subscriptions}
            </td>

            {/* ACTIVITY */}

            <td className="px-6 py-4 text-muted-foreground">
                {customer.lastActivity}
            </td>

            {/* ACTIONS */}

            <td className="px-6 py-4">

                <div className="flex justify-end gap-1">

                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <ExternalLink />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <MoreHorizontal />
                    </Button>

                </div>

            </td>

        </tr>
    );
}