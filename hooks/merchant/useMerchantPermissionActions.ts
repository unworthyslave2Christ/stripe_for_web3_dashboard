"use client";

import type {
    PermissionScope,
} from "@/types/merchant/permission.types";

////////////////////////////////////////////////////////////
// INPUTS
////////////////////////////////////////////////////////////

export interface CreatePermissionInput {
    name: string;

    description: string;

    operatorId: string;

    scope: PermissionScope[];

    expiresAt?: Date | null;
}

////////////////////////////////////////////////////////////
// ACTION RESULT
////////////////////////////////////////////////////////////

export interface MerchantPermissionActions {
    create: {
        available: boolean;
        loading: boolean;
        execute: (
            input: CreatePermissionInput,
        ) => Promise<never>;
    };

    revoke: {
        available: boolean;
        loading: boolean;
        execute: (
            permissionId: string,
        ) => Promise<never>;
    };

    refresh: {
        available: boolean;
        loading: boolean;
        execute: () => Promise<never>;
    };

    export: {
        available: boolean;
        loading: boolean;
        execute: () => Promise<never>;
    };
}

////////////////////////////////////////////////////////////
// UNSUPPORTED OPERATION
////////////////////////////////////////////////////////////

function unsupported(
    operation: string,
): never {
    throw new Error(
        `${operation} is not yet available through the merchant SDK/API.`,
    );
}

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useMerchantPermissionActions(): MerchantPermissionActions {
    return {
        create: {
            available: false,

            loading: false,

            execute:
                async () =>
                    unsupported(
                        "Creating permission policies",
                    ),
        },

        revoke: {
            available: false,

            loading: false,

            execute:
                async () =>
                    unsupported(
                        "Revoking permission policies",
                    ),
        },

        refresh: {
            available: false,

            loading: false,

            execute:
                async () =>
                    unsupported(
                        "Refreshing permission policies",
                    ),
        },

        export: {
            available: false,

            loading: false,

            execute:
                async () =>
                    unsupported(
                        "Exporting permission policies",
                    ),
        },
    };
}