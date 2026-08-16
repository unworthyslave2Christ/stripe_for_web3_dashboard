"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Label,
} from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SettingsBilling() {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Billing preferences
                </CardTitle>

                <CardDescription>
                    Configure default billing behavior for your merchant.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-6">

                <div className="space-y-2">

                    <Label>
                        Default billing environment
                    </Label>

                    <Select defaultValue="test">

                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="test">
                                Test
                            </SelectItem>

                            <SelectItem value="live">
                                Live
                            </SelectItem>

                        </SelectContent>

                    </Select>

                    <p className="text-xs text-muted-foreground">
                        This does not change existing subscriptions or credentials.
                    </p>

                </div>

                <div className="rounded-lg border bg-muted/30 p-4">

                    <p className="text-sm font-medium">
                        Billing behavior
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Subscription-specific billing settings remain controlled
                        by individual plans and subscriptions.
                    </p>

                </div>

            </CardContent>

        </Card>
    );
}