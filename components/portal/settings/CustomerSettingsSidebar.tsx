import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    CustomerSettingsNavigation,
} from "./CustomerSettingsNavigation";

export function CustomerSettingsSidebar() {
    return (
        <Card className="lg:sticky lg:top-24 lg:self-start">

            <CardContent className="p-2 lg:p-3">

                <CustomerSettingsNavigation />

            </CardContent>

        </Card>
    );
}