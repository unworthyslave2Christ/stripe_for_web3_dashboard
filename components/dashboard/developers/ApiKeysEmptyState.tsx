import {
    KeyRound,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function ApiKeysEmptyState() {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <KeyRound className="size-5 text-muted-foreground" />
            </div>

            <h3 className="mt-4 text-base font-semibold">
                No API keys yet
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Create an API key to connect your server-side application to Stripe for Web3.
            </p>

            <Button className="mt-5">
                Create API key
            </Button>

        </div>
    );
}