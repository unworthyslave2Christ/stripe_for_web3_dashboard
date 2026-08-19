"use client";

import {
    useAnimatedNumber,
} from "@/hooks/ui/useAnimatedNumber";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerRevenueCard({
    monthlyUsd,
    previousMonthlyUsd,
    series,
    demo,
}: {
    monthlyUsd: number;

    previousMonthlyUsd: number;

    series: {
        label: string;

        value: number;
    }[];

    demo: boolean;
}) {
    const animatedValue =
        useAnimatedNumber(
            monthlyUsd,
        );

    const change =
        previousMonthlyUsd ===
        0
            ? 0
            : (
                (
                    monthlyUsd -
                    previousMonthlyUsd
                ) /
                previousMonthlyUsd
            ) *
                100;

    const width =
        700;

    const height =
        220;

    const padding =
        24;

    const values =
        series.map(
            (item) =>
                item.value,
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
        series.map(
            (
                item,
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
                            padding * 2
                        );

                const y =
                    height -
                    padding -
                    (
                        (
                            item.value -
                            min
                        ) /
                        range
                    ) *
                        (
                            height -
                            padding * 2
                        );

                return {
                    x,
                    y,
                };
            },
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
            .join(" ");

    return (
        <Card>

            <CardHeader>

                <div className="flex items-start justify-between gap-4">

                    <div>

                        <CardTitle>
                            Billing value
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Estimated recurring value.
                        </p>

                    </div>

                    {demo && (
                        <Badge variant="outline">
                            Test mode
                        </Badge>
                    )}

                </div>

            </CardHeader>

            <CardContent>

                <div className="flex items-end justify-between gap-4">

                    <div>

                        <p className="text-3xl font-semibold tracking-tight">
                            $
                            {animatedValue.toFixed(
                                2,
                            )}
                        </p>

                        <p className="mt-2 text-xs text-muted-foreground">
                            {change >= 0
                                ? "+"
                                : ""}
                            {change.toFixed(
                                1,
                            )}
                            % from previous period
                        </p>

                    </div>

                </div>

                <div className="mt-6 overflow-hidden rounded-xl border bg-muted/20 p-3">

                    <svg
                        viewBox={`0 0 ${width} ${height}`}
                        className="h-[220px] w-full"
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
                                    key={index}
                                    cx={
                                        point.x
                                    }
                                    cy={
                                        point.y
                                    }
                                    r="3.5"
                                    className="fill-primary"
                                />
                            ),
                        )}

                    </svg>

                    <div className="grid grid-cols-6 gap-2">

                        {series.map(
                            (
                                item,
                            ) => (
                                <p
                                    key={
                                        item.label
                                    }
                                    className="text-center text-[10px] text-muted-foreground"
                                >
                                    {
                                        item.label
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