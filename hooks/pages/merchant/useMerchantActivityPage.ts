"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    useMerchantActivity,
} from "@/hooks/merchant/useMerchantActivity";

import type {
    ActivityEntityType,
    ActivitySeverity,
    ActivityRecord,
} from "@/components/dashboard/account/activity/activity.types";

type EntityFilter =
    | "all"
    | "customer"
    | "plan"
    | "subscription"
    | "billing"
    | "permission"
    | "developer";

type PeriodFilter =
    | "today"
    | "7d"
    | "30d"
    | "90d";

export function useMerchantActivityPage() {
    const resource =
        useMerchantActivity();

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        entity,
        setEntity,
    ] = useState<EntityFilter>("all");

    const [
        severity,
        setSeverity,
    ] = useState<
        "all" | Lowercase<ActivitySeverity>
    >("all");

    const [
        period,
        setPeriod,
    ] = useState<PeriodFilter>("30d");

    const filtered =
        useMemo(() => {
            const normalizedSearch =
                search
                    .trim()
                    .toLowerCase();

            return resource.activities.filter(
                (
                    activity,
                ) => {
                    const matchesSearch =
                        normalizedSearch.length ===
                            0 ||
                        [
                            activity.summary,
                            activity.description,
                            activity.entityName,
                            activity.entityId,
                            activity.actorName,
                            activity.eventId,
                        ]
                            .join(" ")
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            );

                    const matchesEntity =
                        entity === "all"
                            ? true
                            : matchesEntityType(
                                  activity,
                                  entity,
                              );

                    const matchesSeverity =
                        severity === "all"
                            ? true
                            : activity.severity ===
                              severity.toUpperCase();

                    /*
                     * Until backend timestamps are exposed,
                     * period remains a view-model control.
                     *
                     * The actual server-side range filter
                     * should move into the resource hook when
                     * the activity API supports it.
                     */
                    void period;

                    return (
                        matchesSearch &&
                        matchesEntity &&
                        matchesSeverity
                    );
                },
            );
        }, [
            resource.activities,
            search,
            entity,
            severity,
            period,
        ]);

    const summary =
        useMemo(() => {
            const successful =
                filtered.filter(
                    (item) =>
                        item.status ===
                        "COMPLETED",
                ).length;

            const pending =
                filtered.filter(
                    (item) =>
                        item.status ===
                        "PENDING",
                ).length;

            const errors =
                filtered.filter(
                    (item) =>
                        item.status ===
                        "FAILED",
                ).length;

            return {
                events:
                    filtered.length,

                successful,

                pending,

                errors,
            };
        }, [
            filtered,
        ]);

    const refresh =
        () => {
            void resource.refresh();
        };

    return {
        status:
            resource.status,

        data:
            filtered,

        summary,

        filters: {
            search,
            entity,
            severity,
            period,

            setSearch,
            setEntity,
            setSeverity,
            setPeriod,
        },

        actions: {
            refresh: {
                run:
                    refresh,

                loading:
                    resource.refreshing,

                available:
                    resource.status ===
                    "ready",
            },
        },

        // error:
        //     resource.error,
    };
}

function matchesEntityType(
    activity: ActivityRecord,
    entity: EntityFilter,
) {
    switch (entity) {
        case "customer":
            return activity.entityType === "CUSTOMER";

        case "plan":
            return activity.entityType === "PLAN";

        case "subscription":
            return activity.entityType === "SUBSCRIPTION";

        case "billing":
            return activity.entityType === "BILLING";

        case "permission":
            return activity.entityType === "PERMISSION";

        case "developer":
            return [
                "API_KEY",
                "WEBHOOK",
                "NOTIFICATION",
            ].includes(
                activity.entityType,
            );

        default:
            return true;
    }
}