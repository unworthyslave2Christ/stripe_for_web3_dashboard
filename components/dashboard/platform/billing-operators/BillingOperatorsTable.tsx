import {
    Card,
    CardContent,
} from "@/components/ui/card";

import type {
    BillingOperatorRecord,
} from "./billing-operator.types";

import {
    BillingOperatorTableRow,
} from "./BillingOperatorTableRow";

export function BillingOperatorsTable({
    operators,
}: {
    operators: BillingOperatorRecord[];
}) {
    if (
        operators.length ===
        0
    ) {
        return (
            <Card className="overflow-hidden">

                <CardContent className="p-0">

                    <div className="flex min-h-[240px] items-center justify-center border-b border-dashed p-8 text-center">

                        <div>

                            <p className="text-sm font-medium">
                                No billing operators available
                            </p>

                            <p className="mt-1 max-w-md text-xs leading-5 text-muted-foreground">
                                Operator discovery and management
                                are not yet exposed through the
                                merchant SDK.
                            </p>

                        </div>

                    </div>

                </CardContent>

            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1000px]">

                        <thead>

                            <tr className="border-b bg-muted/30">

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Operator
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Type
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Permissions
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Activity
                                </th>

                                <th className="px-4 py-3" />

                            </tr>

                        </thead>

                        <tbody>
                            {operators.map(
                                (
                                    operator,
                                ) => (
                                    <BillingOperatorTableRow
                                        key={
                                            operator.id
                                        }
                                        operator={
                                            operator
                                        }
                                    />
                                ),
                            )}
                        </tbody>

                    </table>

                </div>

            </CardContent>

        </Card>
    );
}