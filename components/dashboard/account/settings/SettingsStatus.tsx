import {
    CheckCircle2,
    Cloud,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

export function SettingsStatus({
    dirty = false,
}: {
    dirty?: boolean;
}) {
    if (dirty) {
        return (
            <Badge variant="outline">
                <Cloud />
                Unsaved changes
            </Badge>
        );
    }

    return (
        <Badge variant="secondary">
            <CheckCircle2 />
            Saved
        </Badge>
    );
}