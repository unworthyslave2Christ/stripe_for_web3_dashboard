import {
    KeyRound,
    Plus,
    Webhook,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function QuickActions() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Quick actions
                </CardTitle>

                <CardDescription>
                    Common merchant operations.
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-2">

                <Button>
                    <Plus />
                    Create plan
                </Button>

                <Button variant="outline">
                    <KeyRound />
                    Create API key
                </Button>

                <Button variant="outline">
                    <Webhook />
                    Configure webhook
                </Button>

            </CardContent>

        </Card>
    );
}