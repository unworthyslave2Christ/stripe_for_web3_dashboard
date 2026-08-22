import {
    Card,
    CardContent,
} from "@/components/ui/card";

import type {
    ApiKeyRecord,
} from "./developer.types";

import {
    ApiKeyIdentity,
} from "./ApiKeyIdentity";

import {
    ApiKeyEnvironment,
} from "./ApiKeyEnvironment";

import {
    ApiKeyScopes,
} from "./ApiKeyScopes";

import {
    ApiKeyStatusBadge,
} from "./ApiKeyStatusBadge";

import {
    ApiKeyActions,
} from "./ApiKeyActions";

export function ApiKeysTable({
    apiKeys,
    available,
}: {
    apiKeys: ApiKeyRecord[];

    available: boolean;
}) {
    if (!available) {
        return (
            <Card>

                <CardContent className="flex min-h-48 items-center justify-center p-6 text-center">

                    <div className="max-w-md">

                        <p className="text-sm font-medium">
                            API key management is not connected
                        </p>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            No API-key records are displayed because the current merchant SDK/API does not yet expose the API-key resource.
                        </p>

                    </div>

                </CardContent>

            </Card>
        );
    }

    if (apiKeys.length === 0) {
        return (
            <Card>

                <CardContent className="flex min-h-48 items-center justify-center p-6 text-center">

                    <div>

                        <p className="text-sm font-medium">
                            No API keys found
                        </p>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Create an API key when key-management operations are available.
                        </p>

                    </div>

                </CardContent>

            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1100px]">

                        <thead>
                            <tr className="border-b bg-muted/30">

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    API key
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Environment
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Scopes
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Last used
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Created
                                </th>

                                <th className="px-4 py-3" />

                            </tr>
                        </thead>

                        <tbody>

                            {apiKeys.map(
                                (apiKey) => (
                                    <tr
                                        key={
                                            apiKey.id
                                        }
                                        className="border-b transition-colors hover:bg-muted/40 last:border-0"
                                    >
                                        <td className="px-4 py-4">
                                            <ApiKeyIdentity
                                                apiKey={
                                                    apiKey
                                                }
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
                                                scopes={
                                                    apiKey.scopes
                                                }
                                            />
                                        </td>

                                        <td className="px-4 py-4">
                                            <ApiKeyStatusBadge
                                                status={
                                                    apiKey.status
                                                }
                                            />
                                        </td>

                                        <td className="px-4 py-4 text-sm">
                                            {
                                                apiKey.lastUsedAt ??
                                                "Never"
                                            }
                                        </td>

                                        <td className="px-4 py-4 text-sm text-muted-foreground">
                                            {
                                                apiKey.createdAt
                                            }
                                        </td>

                                        <td className="px-4 py-4 text-right">
                                            <ApiKeyActions
                                                keyId={
                                                    apiKey.keyId
                                                }
                                                available
                                            />
                                        </td>
                                    </tr>
                                ),
                            )}

                        </tbody>

                    </table>

                </div>

            </CardContent>

        </Card>
    );
}