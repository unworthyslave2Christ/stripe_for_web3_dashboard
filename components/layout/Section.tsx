import type {
    ReactNode,
} from "react";

import { cn } from "@/lib/utils";

////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface SectionProps {
    children: ReactNode;

    title?: ReactNode;

    description?: ReactNode;

    actions?: ReactNode;

    className?: string;
}

////////////////////////////////////////////////////////////
// SECTION
////////////////////////////////////////////////////////////

export function Section({
    children,

    title,

    description,

    actions,

    className,
}: SectionProps) {
    return (
        <section
            className={cn(
                "space-y-4",
                className,
            )}
        >
            {(title || description || actions) && (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        {title && (
                            <h2 className="text-lg font-semibold tracking-tight">
                                {title}
                            </h2>
                        )}

                        {description && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>

                    {actions && (
                        <div className="shrink-0">
                            {actions}
                        </div>
                    )}
                </div>
            )}

            {children}
        </section>
    );
}