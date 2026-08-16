import type {
    ComponentProps,
} from "react";

import {
    cn,
} from "@/lib/utils";

export function Grid({
    className,
    ...props
}: ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "grid gap-4",
                className,
            )}
            {...props}
        />
    );
}