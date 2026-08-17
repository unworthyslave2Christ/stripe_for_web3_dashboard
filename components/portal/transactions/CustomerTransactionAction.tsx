import {
    ExternalLink,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerTransactionAction({
    explorerUrl,
}: {
    explorerUrl: string | null;
}) {
    if (!explorerUrl) {
        return (
            <Button
                variant="outline"
                size="sm"
                disabled
            >
                Explorer unavailable
            </Button>
        );
    }

    return (
        <Button
            render={
                <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    View
                    <ExternalLink />
                </a>
            }
            variant="outline"
            size="sm"
        />
    );
}