import Link from "next/link";

import {
    FileKey2,
    Plus,
    Webhook,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function QuickActions() {
    return (
        <div className="rounded-xl border bg-card p-6">

            <div>

                <h3 className="text-base font-medium">
                    Quick actions
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                    Common merchant operations.
                </p>

            </div>

            <div className="mt-5 flex flex-wrap gap-2">

                <Button
                    render={
                        <Link
                            href="/dashboard/platform/plans"
                        >
                            <Plus />
                            Create plan
                        </Link>
                    }
                />

                <Button
                    render={
                        <Link
                            href="/dashboard/developers/api-keys"
                        >
                            <FileKey2 />
                            API keys
                        </Link>
                    }
                    variant="outline"
                />

                <Button
                    render={
                        <Link
                            href="/dashboard/developers/webhooks"
                        >
                            <Webhook />
                            Webhooks
                        </Link>
                    }
                    variant="outline"
                />

            </div>

        </div>
    );
}