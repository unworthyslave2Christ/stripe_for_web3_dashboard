"use client";

import {
    MoreHorizontal,
    Pause,
    Play,
    XCircle,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import type {
    CustomerSubscriptionStatus,
} from "@/types/customer-subscription";

export function CustomerSubscriptionActions({
    subscriptionId,
    status,
    onPause,
    onResume,
    onCancel,
    loading,
}: {
    subscriptionId: number;

    status:
        CustomerSubscriptionStatus;

    onPause:
        (
            subscriptionId: number,
        ) => Promise<unknown>;

    onResume:
        (
            subscriptionId: number,
        ) => Promise<unknown>;

    onCancel:
        (
            subscriptionId: number,
        ) => Promise<unknown>;

    loading: boolean;
}) {
    async function handleAction() {

        if (
            status ===
            "ACTIVE"
        ) {
            await onPause(
                subscriptionId,
            );

            return;
        }

        if (
            status ===
            "PAUSED"
        ) {
            await onResume(
                subscriptionId,
            );

            return;
        }
    }

    return (
        <div className="flex shrink-0 flex-wrap gap-2">

            {(status === "ACTIVE" ||
                status === "PAUSED") && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={
                        handleAction
                    }
                    disabled={
                        loading
                    }
                >
                    {status === "ACTIVE" ? (
                        <>
                            <Pause />
                            Pause
                        </>
                    ) : (
                        <>
                            <Play />
                            Resume
                        </>
                    )}
                </Button>
            )}

            {(status === "ACTIVE" ||
                status === "PAUSED" ||
                status === "PENDING") && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        onCancel(
                            subscriptionId,
                        )
                    }
                    disabled={
                        loading
                    }
                >
                    <XCircle />
                    Cancel
                </Button>
            )}

            <Button
                variant="ghost"
                size="icon-sm"
                aria-label={
                    `Actions for subscription ${subscriptionId}`
                }
                disabled={
                    loading
                }
            >
                <MoreHorizontal />
            </Button>

        </div>
    );
}