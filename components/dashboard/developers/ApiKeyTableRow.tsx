import {
    ApiKeyActions,
} from "./ApiKeyActions";

import {
    ApiKeyEnvironment,
} from "./ApiKeyEnvironment";

import {
    ApiKeyIdentity,
} from "./ApiKeyIdentity";

import {
    ApiKeyScopes,
} from "./ApiKeyScopes";

import {
    ApiKeyStatusBadge,
} from "./ApiKeyStatusBadge";

import type {
    ApiKeyRecord,
} from "./developer.types";

export function ApiKeyTableRow({
    apiKey,
}: {
    apiKey: ApiKeyRecord;
}) {
    return (
        <tr className="border-b transition-colors hover:bg-muted/40 last:border-0">

            <td className="px-4 py-4">
                <ApiKeyIdentity
                    apiKey={apiKey}
                />
            </td>

            <td className="px-4 py-4">
                <ApiKeyEnvironment
                    environment={
                        apiKey.environment
                    }
                />
            </td>

            <td className="px-4 py-4">
                <ApiKeyScopes
                    scopes={apiKey.scopes}
                />
            </td>

            <td className="px-4 py-4">
                <ApiKeyStatusBadge
                    status={apiKey.status}
                />
            </td>

            <td className="px-4 py-4 text-sm">
                {apiKey.lastUsedAt || "Never"}
            </td>

            <td className="px-4 py-4 text-sm text-muted-foreground">
                {apiKey.createdAt}
            </td>

            <td className="px-4 py-4 text-right">
                <ApiKeyActions
                    keyId={apiKey.keyId}
                />
            </td>

        </tr>
    );
}