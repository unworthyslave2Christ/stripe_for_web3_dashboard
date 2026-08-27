import {
    CheckCircle2,
    Cloud,
    LockKeyhole,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

export function SettingsStatus({
    dirty = false,
    editable = false,
}: {
    dirty?: boolean;
    editable?: boolean;
}) {
    if (dirty && editable) {
        return (
            <Badge variant="outline">
                <Cloud />
                Unsaved changes
            </Badge>
        );
    }

    if (!editable) {
        return (
            <Badge variant="outline">
                <LockKeyhole />
                Read-only
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