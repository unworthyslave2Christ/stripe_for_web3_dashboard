import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface InlineProps {
    children: ReactNode;

    className?: string;

    gap?: 1 | 2 | 3 | 4 | 6 | 8;
}

const gapClasses = {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
};

////////////////////////////////////////////////////////////
// INLINE
////////////////////////////////////////////////////////////

export function Inline({
    children,

    className,

    gap = 4,
}: InlineProps) {
    return (
        <div
            className={cn(
                "flex items-center",
                gapClasses[gap],
                className,
            )}
        >
            {children}
        </div>
    );
}