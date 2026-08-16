import {
    ExternalLink,
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

export function CustomerSmartAccountCard({
    smartAccount,
}: {
    smartAccount: string;
}) {
    return (
        <Card>

            <CardHeader>

                <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="size-4" />
                    Smart account
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

                <div className="flex items-center justify-between">

                    <span className="text-sm text-muted-foreground">
                        Status
                    </span>

                    <Badge variant="secondary">
                        Active
                    </Badge>

                </div>

                <div className="rounded-lg border bg-muted/30 p-3">

                    <p className="break-all font-mono text-xs">
                        {smartAccount}
                    </p>

                </div>

                <Button
                    variant="outline"
                    className="w-full"
                    // onClick={() =>
                    //     console.log(
                    //         "Open smart account"
                    //     )
                    // }
                >
                    View smart account
                    <ExternalLink />
                </Button>

            </CardContent>

        </Card>
    );
}