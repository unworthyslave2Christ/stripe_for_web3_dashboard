import {
    CalendarClock,
    CreditCard,
    KeyRound,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    CustomerPermissionActions,
} from "./CustomerPermissionActions";

import {
    CustomerPermissionScope,
} from "./CustomerPermissionScope";

import {
    CustomerPermissionStatusBadge,
} from "./CustomerPermissionStatusBadge";

import type {
    CustomerPermissionRecord,
} from "./customer-permission.types";

export function CustomerPermissionListItem({
    permission,
}: {
    permission: CustomerPermissionRecord;
}) {
    return (
        <Card className="transition-colors hover:border-foreground/20">

            <CardContent className="p-5">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                    {/* IDENTITY */}

                    <div className="flex min-w-0 flex-1 items-start gap-3">

                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/40">

                            <KeyRound className="size-4 text-muted-foreground" />

                        </div>

                        <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                                <p className="text-sm font-semibold">
                                    {permission.name}
                                </p>

                                <CustomerPermissionStatusBadge
                                    status={
                                        permission.status
                                    }
                                />

                            </div>

                            <p className="mt-1 max-w-md text-xs leading-5 text-muted-foreground">
                                {permission.description}
                            </p>

                        </div>

                    </div>

                    {/* SCOPE */}

                    <div className="min-w-[220px]">

                        <p className="text-xs text-muted-foreground">
                            Capabilities
                        </p>

                        <div className="mt-2">

                            <CustomerPermissionScope
                                scopes={
                                    permission.scope
                                }
                            />

                        </div>

                    </div>

                    {/* SUBSCRIPTIONS */}

                    <div className="min-w-[150px]">

                        <p className="text-xs text-muted-foreground">
                            Subscriptions
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">

                            <CreditCard className="size-3.5 text-muted-foreground" />

                            {permission.subscriptionNames.length} active

                        </p>

                    </div>

                    {/* UPDATED */}

                    <div className="min-w-[150px]">

                        <p className="text-xs text-muted-foreground">
                            Updated
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm">

                            <CalendarClock className="size-3.5 text-muted-foreground" />

                            {permission.updatedAt}

                        </p>

                    </div>

                    {/* ACTION */}

                    <div className="shrink-0">

                        <CustomerPermissionActions
                            permissionId={
                                permission.permissionId
                            }
                        />

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}