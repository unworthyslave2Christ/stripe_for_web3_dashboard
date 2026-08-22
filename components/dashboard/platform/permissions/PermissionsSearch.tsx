import {
    Search,
} from "lucide-react";

import {
    Input,
} from "@/components/ui/input";

interface PermissionsSearchProps {
    value: string;

    onChange: (
        value: string,
    ) => void;

    disabled?: boolean;
}

export function PermissionsSearch({
    value,
    onChange,
    disabled = false,
}: PermissionsSearchProps) {
    return (
        <div className="relative w-full sm:w-80">

            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
                value={value}
                onChange={(event) =>
                    onChange(
                        event.target.value,
                    )
                }
                placeholder="Search permissions..."
                className="pl-9"
                disabled={disabled}
            />

        </div>
    );
}