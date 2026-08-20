import {
    MoreHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    CustomerIdentity,
} from "./CustomerIdentity";

import {
    CustomerSmartAccount,
} from "./CustomerSmartAccount";

import {
    CustomerStatusBadge,
} from "./CustomerStatusBadge";

import {
    CustomerWallet,
} from "./CustomerWallet";

import type {
    CustomerRecord,
} from "./customer.types";

export function CustomerTableRow({
    customer,
}: {
    customer: CustomerRecord;
}) {
    return (
        <tr className="border-b transition-colors hover:bg-muted/40 last:border-0">

            <td className="px-4 py-4">
                <CustomerIdentity
                    customer={customer}
                />
            </td>

            <td className="px-4 py-4">
                <CustomerWallet
                    address={
                        customer.ownerWallet!
                    }
                />
            </td>

            <td className="px-4 py-4">
                <CustomerSmartAccount
                    address={
                        customer.smartAccount
                    }
                />
            </td>

            <td className="px-4 py-4">
                <CustomerStatusBadge
                    status={
                        customer.status
                    }
                />
            </td>

            <td className="px-4 py-4 text-sm text-muted-foreground">
                —
            </td>

            <td className="px-4 py-4 text-sm text-muted-foreground">
                —
            </td>

            <td className="px-4 py-4 text-sm text-muted-foreground">
                {customer.updatedAt!.toLocaleString()}
            </td>

            <td className="px-4 py-4 text-right">

                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    aria-label={`Actions for ${customer.displayName}`}
                >
                    <MoreHorizontal />
                </Button>

            </td>

        </tr>
    );
}