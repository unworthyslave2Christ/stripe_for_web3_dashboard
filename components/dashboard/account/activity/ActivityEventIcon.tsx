import {
    Activity,
    AlertTriangle,
    Bell,
    Bot,
    CheckCircle2,
    CreditCard,
    KeyRound,
    Layers3,
    ShieldCheck,
    User,
    Users,
    Webhook,
} from "lucide-react";

import type {
    ActivityEntityType,
    ActivitySeverity,
} from "./activity.types";

export function ActivityEventIcon({
    entityType,
    severity,
}: {
    entityType: ActivityEntityType;
    severity: ActivitySeverity;
}) {
    const Icon =
        getIcon(entityType);

    const className =
        severity === "ERROR"
            ? "text-destructive"
            : severity === "WARNING"
              ? "text-amber-600 dark:text-amber-400"
              : severity === "SUCCESS"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-muted-foreground";

    return (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
            <Icon
                className={`size-4 ${className}`}
            />
        </div>
    );
}

function getIcon(
    entityType: ActivityEntityType,
) {
    switch (entityType) {
        case "CUSTOMER":
            return User;

        case "PLAN":
            return Layers3;

        case "SUBSCRIPTION":
            return CreditCard;

        case "BILLING":
            return CheckCircle2;

        case "PERMISSION":
            return ShieldCheck;

        case "OPERATOR":
            return Users;

        case "API_KEY":
            return KeyRound;

        case "WEBHOOK":
            return Webhook;

        case "NOTIFICATION":
            return Bell;

        case "MERCHANT":
            return Bot;

        default:
            return Activity;
    }
}