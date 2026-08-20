import {
    Badge,
} from "@/components/ui/badge";

import type {
    CustomerPermissionScope as PermissionScope,
} from "@/types/customer-permission";

export function CustomerPermissionScope({
    scopes,
}: {
    scopes:
        PermissionScope[];
}) {
    return (
        <div className="flex flex-wrap gap-1">

            {scopes.map(
                (
                    scope,
                ) => (
                    <Badge
                        key={
                            scope
                        }
                        variant="secondary"
                        className="text-[10px]"
                    >
                        {
                            formatScope(
                                scope,
                            )
                        }
                    </Badge>
                ),
            )}

        </div>
    );
}

function formatScope(
    scope:
        PermissionScope,
) {
    switch (
        scope
    ) {
        case "SUBSCRIPTION_BILLING":
            return "Subscription billing";

        case "SUBSCRIPTION_MANAGEMENT":
            return "Subscription management";

        case "ACCOUNT_OPERATION":
            return "Account operation";

        case "REFUND":
            return "Refund";
    }
}