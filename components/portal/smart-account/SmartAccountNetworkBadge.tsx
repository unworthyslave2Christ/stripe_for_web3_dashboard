import {
    Badge,
} from "@/components/ui/badge";

export function SmartAccountNetworkBadge({
    network,
}: {
    network: string;
}) {
    return (
        <Badge variant="outline">
            {network}
        </Badge>
    );
}