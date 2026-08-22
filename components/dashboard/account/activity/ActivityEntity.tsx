import Link from "next/link";

import type {
    ActivityEntityType,
} from "./activity.types";

export function ActivityEntity({
    entityType,
    entityId,
    entityName,
}: {
    entityType: ActivityEntityType;
    entityId: string;
    entityName: string;
}) {
    const href =
        getEntityHref(
            entityType,
            entityId,
        );

    if (!href) {
        return (
            <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                    {entityName}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                    {entityId}
                </p>
            </div>
        );
    }

    return (
        <div className="min-w-0">
            <Link
                href={href}
                className="block truncate text-sm font-medium hover:underline"
            >
                {entityName}
            </Link>

            <p className="truncate text-xs text-muted-foreground">
                {entityId}
            </p>
        </div>
    );
}

function getEntityHref(
    entityType: ActivityEntityType,
    entityId: string,
) {
    switch (entityType) {
        case "CUSTOMER":
            return `/dashboard/platform/customers/${entityId}`;

        case "PLAN":
            return `/dashboard/platform/plans/${entityId}`;

        case "SUBSCRIPTION":
            return `/dashboard/platform/subscriptions/${entityId}`;

        case "WEBHOOK":
            return `/dashboard/developers/webhooks/${entityId}`;

        case "API_KEY":
            return `/dashboard/developers/api-keys/${entityId}`;

        case "NOTIFICATION":
            return `/dashboard/developers/notifications/${entityId}`;

        case "OPERATOR":
            return `/dashboard/platform/billing-operators/${entityId}`;

        case "PERMISSION":
            return `/dashboard/platform/permissions/${entityId}`;

        default:
            return null;
    }
}