"use client";

import {
    SlidersHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import type {
    PermissionScope,
    PermissionStatus,
} from "@/types/merchant/permission.types";

interface PermissionFiltersProps {
    status:
        | "all"
        | PermissionStatus;

    scope:
        | "all"
        | PermissionScope;

    onStatusChange: (
        value:
            | "all"
            | PermissionStatus,
    ) => void;

    onScopeChange: (
        value:
            | "all"
            | PermissionScope,
    ) => void;

    disabled?: boolean;
}

export function PermissionFilters({
    status,
    scope,
    onStatusChange,
    onScopeChange,
    disabled = false,
}: PermissionFiltersProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Select
                value={status}
                onValueChange={(value) =>
                    onStatusChange(
                        value as
                            | "all"
                            | PermissionStatus,
                    )
                }
                disabled={disabled}
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All statuses
                    </SelectItem>

                    <SelectItem value="ACTIVE">
                        Active
                    </SelectItem>

                    <SelectItem value="PENDING">
                        Pending
                    </SelectItem>

                    <SelectItem value="REVOKED">
                        Revoked
                    </SelectItem>

                    <SelectItem value="EXPIRED">
                        Expired
                    </SelectItem>

                </SelectContent>
            </Select>

            <Select
                value={scope}
                onValueChange={(value) =>
                    onScopeChange(
                        value as
                            | "all"
                            | PermissionScope,
                    )
                }
                disabled={disabled}
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Scope" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All scopes
                    </SelectItem>

                    <SelectItem value="CHARGE">
                        Charge
                    </SelectItem>

                    <SelectItem value="REFUND">
                        Refund
                    </SelectItem>

                    <SelectItem value="PAUSE">
                        Pause
                    </SelectItem>

                    <SelectItem value="RESUME">
                        Resume
                    </SelectItem>

                    <SelectItem value="CANCEL">
                        Cancel
                    </SelectItem>

                    <SelectItem value="RECONCILE">
                        Reconcile
                    </SelectItem>

                </SelectContent>
            </Select>

            <Button
                variant="outline"
                size="sm"
                disabled={disabled}
            >
                <SlidersHorizontal />
                More filters
            </Button>

        </div>
    );
}