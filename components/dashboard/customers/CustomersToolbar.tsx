import { Stack } from "@/components/layout/Stack";

import { CustomerActions } from "./CustomerActions";
import { CustomerFilters } from "./CustomerFilters";
import { CustomerSearch } from "./CustomerSearch";

export function CustomersToolbar() {
    return (
        <div className="rounded-xl border bg-card p-4">
            <Stack gap={4}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <CustomerSearch />

                    <CustomerActions />
                </div>

                <CustomerFilters />
            </Stack>
        </div>
    );
}