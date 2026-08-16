import type {
    ReactNode,
} from "react";

import { cn } from "@/lib/utils";

////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface PageHeaderProps {
    eyebrow?: ReactNode;

    title: ReactNode;

    description?: ReactNode;

    actions?: ReactNode;

    className?: string;
}

////////////////////////////////////////////////////////////
// PAGE HEADER
////////////////////////////////////////////////////////////

export function PageHeader({
    eyebrow,

    title,

    description,

    actions,

    className,
}: PageHeaderProps) {
    return (
        <header
            className={cn(
                "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
                className,
            )}
        >
            <div className="min-w-0">
                {eyebrow && (
                    <div className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        {eyebrow}
                    </div>
                )}

                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {title}
                </h1>

                {description && (
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                        {description}
                    </p>
                )}
            </div>

            {actions && (
                <div className="flex shrink-0 items-center gap-2">
                    {actions}
                </div>
            )}
        </header>
    );
}