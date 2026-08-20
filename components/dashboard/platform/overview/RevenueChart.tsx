"use client";

import {
    useMemo,
} from "react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    useAnimatedNumber,
} from "@/hooks/ui/useAnimatedNumber";

interface RevenuePoint {
    label:
        string;

    value:
        number;
}

export function RevenueChart({
    monthlyRevenue,
    series,
    demo,
}: {
    monthlyRevenue:
        number;

    series:
        RevenuePoint[];

    demo:
        boolean;
}) {
    const animatedRevenue =
        useAnimatedNumber(
            monthlyRevenue,
        );

    const width =
        700;

    const height =
        240;

    const padding =
        24;

    const values =
        series.map(
            (
                point,
            ) =>
                point.value,
        );

    const max =
        Math.max(
            ...values,
            1,
        );

    const min =
        Math.min(
            ...values,
            0,
        );

    const range =
        Math.max(
            max -
                min,
            1,
        );

    const coordinates =
        useMemo(
            () =>
                series.map(
                    (
                        point,
                        index,
                    ) => {
                        const x =
                            padding +
                            (
                                index /
                                Math.max(
                                    series.length -
                                        1,
                                    1,
                                )
                            ) *
                                (
                                    width -
                                    padding *
                                        2
                                );

                        const y =
                            height -
                            padding -
                            (
                                (
                                    point.value -
                                    min
                                ) /
                                range
                            ) *
                                (
                                    height -
                                    padding *
                                        2
                                );

                        return {
                            x,
                            y,
                        };
                    },
                ),
            [
                series,
                min,
                range,
            ],
        );

    const path =
        coordinates
            .map(
                (
                    point,
                    index,
                ) =>
                    `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`,
            )
            .join(
                " ",
            );

    return (
        <Card className="xl:col-span-2">

            <CardHeader>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                        <CardTitle>
                            Revenue
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Monthly recurring revenue.
                        </p>

                    </div>

                    {demo && (
                        <Badge variant="outline">
                            Test mode
                        </Badge>
                    )}

                </div>

                <p className="pt-3 text-3xl font-semibold tracking-tight">
                    $
                    {Math.round(
                        animatedRevenue,
                    ).toLocaleString()}
                </p>

            </CardHeader>

            <CardContent>

                <div className="overflow-hidden rounded-xl border bg-muted/20 p-3">

                    <svg
                        viewBox={`0 0 ${width} ${height}`}
                        className="h-[240px] w-full"
                        role="img"
                        aria-label="Revenue trend"
                    >

                        <path
                            d={path}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                        />

                        {coordinates.map(
                            (
                                point,
                                index,
                            ) => (
                                <circle
                                    key={
                                        index
                                    }
                                    cx={
                                        point.x
                                    }
                                    cy={
                                        point.y
                                    }
                                    r="4"
                                    className="fill-primary"
                                />
                            ),
                        )}

                    </svg>

                    <div className="grid grid-cols-6 gap-2 px-2 pb-1">

                        {series.map(
                            (
                                point,
                            ) => (
                                <p
                                    key={
                                        point.label
                                    }
                                    className="text-center text-[10px] text-muted-foreground"
                                >
                                    {
                                        point.label
                                    }
                                </p>
                            ),
                        )}

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}