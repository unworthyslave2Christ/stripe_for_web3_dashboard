import {
    Filter,
    Search,
    SlidersHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Input,
} from "@/components/ui/input";

////////////////////////////////////////////////////////////
// TOOLBAR
////////////////////////////////////////////////////////////

export function CustomersToolbar() {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            {/* SEARCH */}

            <div className="relative w-full sm:max-w-sm">

                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder="Search customers..."
                    className="pl-9"
                />

            </div>

            {/* FILTERS */}

            <div className="flex flex-wrap gap-2">

                <Button
                    variant="outline"
                >
                    <Filter />
                    Status
                </Button>

                <Button
                    variant="outline"
                >
                    <SlidersHorizontal />
                    Smart account
                </Button>

            </div>

        </div>
    );
}