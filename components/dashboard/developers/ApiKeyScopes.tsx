import {
    Badge,
} from "@/components/ui/badge";

import type {
    ApiKeyScope,
} from "./developer.types";

export function ApiKeyScopes({
    scopes,
}: {
    scopes: ApiKeyScope[];
}) {
    return (
        <div className="flex flex-wrap gap-1">

            {scopes
                .slice(0, 2)
                .map((scope) => (
                    <Badge
                        key={scope}
                        variant="secondary"
                        className="text-[10px]"
                    >
                        {formatScope(scope)}
                    </Badge>
                ))}

            {scopes.length > 2 && (
                <Badge
                    variant="outline"
                    className="text-[10px]"
                >
                    +{scopes.length - 2}
                </Badge>
            )}

        </div>
    );
}

function formatScope(
    scope: ApiKeyScope,
) {
    return scope
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(
            /^./,
            (character) =>
                character.toUpperCase(),
        );
}