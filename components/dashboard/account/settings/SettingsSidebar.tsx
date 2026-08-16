import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    MerchantSettingsNavigation,
} from "./MerchantSettingsNavigation";

export function SettingsSidebar() {
    return (
        <Card className="lg:sticky lg:top-24 lg:self-start">

            <CardContent className="p-2 lg:p-3">

                <MerchantSettingsNavigation />

            </CardContent>

        </Card>
    );
}