import Link from "next/link";
import { UserRound } from "lucide-react";

import type {
    MerchantSubscriptionRecord,
} from "@/types/merchant/subscription";

export function SubscriptionCustomer({
    subscription,
}: {
    subscription: MerchantSubscriptionRecord;
}) {
    const initials =
        subscription.customerName
            .split(/\s+/)
            .filter(Boolean)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

    return (
        <div className="flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                {initials || (
                    <UserRound className="size-3.5 text-muted-foreground" />
                )}
            </div>

            <div className="min-w-0">
                <Link
                    href={`/dashboard/platform/customers/${subscription.customerId}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    {subscription.customerName}
                </Link>

                <p className="truncate text-xs text-muted-foreground">
                    {subscription.customerId}
                </p>
            </div>
        </div>
    );
}