import {
    CheckCircle2,
    ShieldCheck,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerPermissionSummary() {
    return (
        <Card>

            <CardHeader>

                <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="size-4" />
                    Billing permission
                </CardTitle>

            </CardHeader>

            <CardContent>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-start gap-3">

                        <CheckCircle2 className="mt-0.5 size-5 text-green-600" />

                        <div>

                            <p className="text-sm font-medium">
                                Billing permission active
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                The customer's smart account currently has an active permission for recurring billing.
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-2">

                        <Badge variant="secondary">
                            Active
                        </Badge>

                        <Button
                            variant="outline"
                            size="sm"
                            // onClick={() =>
                            //     console.log(
                            //         "Manage permission"
                            //     )
                            // }
                        >
                            Manage
                        </Button>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}