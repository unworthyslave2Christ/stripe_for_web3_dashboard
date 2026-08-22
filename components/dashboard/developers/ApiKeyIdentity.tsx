import {
    KeyRound,
} from "lucide-react";

import Link from "next/link";

import {
    ApiKeyRecord,
} from "./developer.types";

export function ApiKeyIdentity({
    apiKey,
}: {
    apiKey: ApiKeyRecord;
}) {
    return (
        <div className="flex min-w-0 items-center gap-3">

            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                <KeyRound className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0">

                <Link
                    href={`/dashboard/developers/api-keys/${apiKey.id}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    {apiKey.name}
                </Link>

                <p className="truncate font-mono text-xs text-muted-foreground">
                    {apiKey.prefix}••••••••
                </p>

            </div>

        </div>
    );
}