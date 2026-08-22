"use client";

import Link from "next/link";
import {
    AlertTriangle,
    ArrowLeft,
    ArrowUpRight,
    RefreshCw,
    ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CustomerDetailLoadingState() {
    return (
        <div className="space-y-4">
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="h-36 animate-pulse rounded-xl bg-muted" />
            <div className="grid gap-4 md:grid-cols-2">
                <div className="h-40 animate-pulse rounded-xl bg-muted" />
                <div className="h-40 animate-pulse rounded-xl bg-muted" />
            </div>
        </div>
    );
}

export function CustomerDetailInvalidState({
    customerId,
}: {
    customerId: string;
}) {
    return (
        <Card className="border-destructive/20">
            <CardContent className="p-6">
                <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                        <AlertTriangle className="size-5 text-destructive" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="font-medium">
                            Invalid customer identifier
                        </p>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            The customer route parameter could not be
                            interpreted as a valid customer identifier.
                        </p>

                        <code className="mt-4 block break-all rounded-lg border bg-muted/20 p-3 font-mono text-xs">
                            {customerId}
                        </code>

                        <Button
                            render={
                                <Link href="/dashboard/platform/customers">
                                    <ArrowLeft />
                                    Back to customers
                                </Link>
                            }
                            variant="outline"
                            size="sm"
                            className="mt-4"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function CustomerDetailErrorState({
    error,
    onRetry,
}: {
    error: Error;
    onRetry: () => void;
}) {
    return (
        <Card className="border-destructive/20">
            <CardContent className="p-6">
                <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                        <AlertTriangle className="size-5 text-destructive" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="font-medium">
                            Unable to load customer
                        </p>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            {error.message}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <Button
                                onClick={onRetry}
                                variant="outline"
                                size="sm"
                            >
                                <RefreshCw />
                                Try again
                            </Button>

                            <Button
                                render={
                                    <Link href="/dashboard/platform/customers">
                                        Back to customers
                                        <ArrowUpRight />
                                    </Link>
                                }
                                size="sm"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}