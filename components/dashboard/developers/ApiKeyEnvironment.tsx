import {
    Badge,
} from "@/components/ui/badge";

import type {
    DeveloperEnvironment,
} from "./developer.types";

export function ApiKeyEnvironment({
    environment,
}: {
    environment:
        DeveloperEnvironment;
}) {
    return environment === "LIVE"
        ? (
            <Badge variant="outline">
                Live
            </Badge>
        )
        : (
            <Badge variant="secondary">
                Test
            </Badge>
        );
}