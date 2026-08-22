"use client";

import {
    useCallback,
} from "react";

export function useCreateWebhook() {
    const createWebhook =
        useCallback(
            async (_input: {
                name: string;

                endpointUrl: string;

                environment:
                    | "TEST"
                    | "LIVE";

                events: string[];
            }) => {
                throw new Error(
                    "Webhook creation is not yet exposed by the merchant SDK.",
                );
            },
            [],
        );

    return {
        available: false,

        loading: false,

        error: null,

        createWebhook,
    };
}