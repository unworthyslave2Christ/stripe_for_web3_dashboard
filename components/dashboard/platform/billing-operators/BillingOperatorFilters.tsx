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

export function BillingOperatorFilters({
    disabled = false,
}: {
    disabled?: boolean;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Select
                defaultValue="all"
                disabled={disabled}
            >
                <SelectTrigger className="w-[145px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All statuses
                    </SelectItem>

                    <SelectItem value="active">
                        Active
                    </SelectItem>

                    <SelectItem value="pending">
                        Pending
                    </SelectItem>

                    <SelectItem value="revoked">
                        Revoked
                    </SelectItem>

                    <SelectItem value="expired">
                        Expired
                    </SelectItem>

                </SelectContent>
            </Select>

            <Select
                defaultValue="all"
                disabled={disabled}
            >
                <SelectTrigger className="w-[145px]">
                    <SelectValue placeholder="Type" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All types
                    </SelectItem>

                    <SelectItem value="human">
                        Human
                    </SelectItem>

                    <SelectItem value="service">
                        Service
                    </SelectItem>

                </SelectContent>
            </Select>

            <Button
                variant="outline"
                size="sm"
                disabled={disabled}
            >
                <SlidersHorizontal />
                Permissions
            </Button>

        </div>
    );
}