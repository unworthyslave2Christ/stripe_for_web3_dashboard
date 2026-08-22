import Link from "next/link";
import {
    ChevronRight,
} from "lucide-react";

export function PlanDetailBreadcrumb({
    planName,
}: {
    planName: string;
}) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm"
        >
            <Link
                href="/dashboard/platform/plans"
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                Plans
            </Link>

            <ChevronRight className="size-4 text-muted-foreground" />

            <span className="truncate font-medium">
                {planName}
            </span>
        </nav>
    );
}