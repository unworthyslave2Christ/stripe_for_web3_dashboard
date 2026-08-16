import type {
    ActivityActorType,
} from "./activity.types";

export function ActivityActor({
    actorType,
    actorName,
}: {
    actorType: ActivityActorType;
    actorName: string;
}) {
    return (
        <div>

            <p className="text-sm font-medium">
                {actorName}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
                {formatActorType(actorType)}
            </p>

        </div>
    );
}

function formatActorType(
    actorType: ActivityActorType,
) {
    switch (actorType) {
        case "API":
            return "API";

        case "WEBHOOK":
            return "Webhook";

        case "SYSTEM":
            return "System";

        case "CUSTOMER":
            return "Customer";

        case "OPERATOR":
            return "Billing operator";

        case "MERCHANT":
            return "Merchant";

        default:
            return actorType;
    }
}