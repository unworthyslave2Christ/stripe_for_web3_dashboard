"use client";

import {
    useMemo,
} from "react";

import {
    appConfig,
} from "@/app/config";

import {
    merchantActivityDemo,
} from "@/lib/demo/merchantActivityDemo";

import type {
    ActivityRecord,
} from "@/components/dashboard/account/activity/activity.types";

export type MerchantActivityStatus =
    | "waiting"
    | "loading"
    | "ready"
    | "unsupported"
    | "error";

export function useMerchantActivity() {
    const demo =
        appConfig.demoMode;

    /*
     * The current SDK does not yet expose the
     * merchant activity operation.
     *
     * Keep the resource boundary in place now so
     * the eventual SDK operation can replace the
     * live branch without changing page composition.
     */

    const data =
        useMemo<ActivityRecord[]>(
            () =>
                demo
                    ? merchantActivityDemo
                    : [],
            [
                demo,
            ],
        );

    const status: MerchantActivityStatus =
        demo
            ? "ready"
            : "unsupported";

    return {
        activities:
            data,

        status,

        // loading:
        //     status === "loading",

        refreshing:
            false,

        // error:
        //     status === "error"
        //         ? new Error(
        //               "Unable to load merchant activity.",
        //           )
        //         : null,

        refresh:
            async () => {
                /*
                 * Intentionally no API call yet.
                 *
                 * Replace this body when the SDK
                 * exposes getActivity / listActivity.
                 */
            },
    };
}