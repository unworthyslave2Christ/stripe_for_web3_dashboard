import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    ApiKeyTableRow,
} from "./ApiKeyTableRow";

import type {
    ApiKeyRecord,
} from "./developer.types";

const apiKeys: ApiKeyRecord[] = [
    {
        id: "key_001",
        keyId: "key_live_primary",
        name: "Production backend",
        prefix: "sw_live_91a7",
        environment: "LIVE",
        status: "ACTIVE",
        scopes: [
            "READ_CUSTOMERS",
            "READ_PLANS",
            "READ_SUBSCRIPTIONS",
            "READ_BILLING",
        ],
        createdAt: "Jun 01, 2025",
        lastUsedAt: "2 minutes ago",
        expiresAt: null,
        createdBy: "ACMEFLOW",
    },
    {
        id: "key_002",
        keyId: "key_live_worker",
        name: "Billing worker",
        prefix: "sw_live_72bc",
        environment: "LIVE",
        status: "ACTIVE",
        scopes: [
            "READ_SUBSCRIPTIONS",
            "READ_BILLING",
            "WRITE_BILLING",
            "WRITE_SUBSCRIPTIONS",
        ],
        createdAt: "May 27, 2025",
        lastUsedAt: "8 minutes ago",
        expiresAt: null,
        createdBy: "ACMEFLOW",
    },
    {
        id: "key_003",
        keyId: "key_test_frontend",
        name: "Test integration",
        prefix: "sw_test_21df",
        environment: "TEST",
        status: "ACTIVE",
        scopes: [
            "READ_CUSTOMERS",
            "READ_PLANS",
        ],
        createdAt: "May 21, 2025",
        lastUsedAt: "42 minutes ago",
        expiresAt: null,
        createdBy: "ACMEFLOW",
    },
    {
        id: "key_004",
        keyId: "key_test_old",
        name: "Legacy test key",
        prefix: "sw_test_19ad",
        environment: "TEST",
        status: "REVOKED",
        scopes: [
            "READ_CUSTOMERS",
        ],
        createdAt: "Apr 12, 2025",
        lastUsedAt: "Apr 29, 2025",
        expiresAt: null,
        createdBy: "ACMEFLOW",
    },
    {
        id: "key_005",
        keyId: "key_test_expired",
        name: "Temporary integration",
        prefix: "sw_test_11ac",
        environment: "TEST",
        status: "EXPIRED",
        scopes: [
            "READ_CUSTOMERS",
            "READ_BILLING",
        ],
        createdAt: "Mar 01, 2025",
        lastUsedAt: "Apr 02, 2025",
        expiresAt: "Apr 30, 2025",
        createdBy: "ACMEFLOW",
    },
];

export function ApiKeysTable() {
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

                            {apiKeys.map((apiKey) => (
                                <ApiKeyTableRow
                                    key={apiKey.id}
                                    apiKey={apiKey}
                                />
                            ))}

                        </tbody>

                    </table>

                </div>

            </CardContent>

        </Card>
    );
}