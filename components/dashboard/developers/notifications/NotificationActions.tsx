import {
    MoreHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function NotificationActions({
    notificationId,
}: {
    notificationId: string;
}) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label={`Actions for ${notificationId}`}
        >
            <MoreHorizontal />
        </Button>
    );
}