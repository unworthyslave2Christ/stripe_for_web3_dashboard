import {
    Badge,
} from "@/components/ui/badge";

export function SmartAccountNetworkBadge({
    network,
}: {
    network:
        | string
        | undefined;
}) {
    if (!network) {
        return (
            <Badge variant="outline">
                Unknown network
            </Badge>
        );
    }

    return (
        <Badge variant="outline">
            {network}
        </Badge>
    );
}