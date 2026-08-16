import {
    Badge,
} from "@/components/ui/badge";

export function EnvironmentBadge() {
    return (
        <Badge
            variant="secondary"
            className="hidden sm:inline-flex"
        >
            <span className="mr-1.5 size-1.5 rounded-full bg-amber-500" />
            Sandbox
        </Badge>
    );
}