import Link from "next/link";

import {
    ArrowRight,
    CheckCircle2,
    Info,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerActivityPreview({
    items,
    demo,
}: {
    items: {
        id: string;

        title: string;

        description: string;

        timestamp: string;

        status:
            | "success"
            | "info";
    }[];

    demo: boolean;
}) {
    return (
        <Card>

            <CardHeader>

                <div className="flex items-center justify-between gap-3">

                    <div>

                        <CardTitle>
                            Recent activity
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Recent events involving your account.
                        </p>

                    </div>

                    <Button
                        render={
                            <Link href="/portal/transactions">
                                View all
                                <ArrowRight />
                            </Link>
                        }
                        variant="ghost"
                        size="sm"
                    />

                </div>

            </CardHeader>

            <CardContent>

                {demo && (
                    <p className="mb-4 text-xs text-muted-foreground">
                        Activity preview is currently using test data.
                    </p>
                )}

                <div className="space-y-4">

                    {items.map(
                        (item) => (
                            <div
                                key={item.id}
                                className="flex gap-3"
                            >

                                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">

                                    {item.status ===
                                    "success" ? (
                                        <CheckCircle2 className="size-4 text-primary" />
                                    ) : (
                                        <Info className="size-4 text-muted-foreground" />
                                    )}

                                </div>

                                <div className="min-w-0">

                                    <p className="text-sm font-medium">
                                        {item.title}
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        {item.description}
                                    </p>

                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {item.timestamp}
                                    </p>

                                </div>

                            </div>
                        ),
                    )}

                </div>

            </CardContent>

        </Card>
    );
}