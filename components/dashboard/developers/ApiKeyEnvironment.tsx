import {
    Badge,
} from "@/components/ui/badge";

import type {
    DeveloperEnvironment,
} from "./developer.types";

export function ApiKeyEnvironment({
    environment,
}: {
    environment: DeveloperEnvironment;
}) {
    if (environment === "LIVE") {
        return (
            <Badge variant="outline">
                Live
            </Badge>
        );
    }

    return (
        <Badge variant="secondary">
            Test
        </Badge>
    );
}