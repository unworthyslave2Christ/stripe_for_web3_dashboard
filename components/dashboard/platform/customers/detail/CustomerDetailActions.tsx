"use client";

import {
    MoreHorizontal,
    PauseCircle,
    Settings2,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function CustomerDetailActions() {
    return (
        <div className="flex items-center gap-2">

            <Button
                variant="outline"
                onClick={() => {
                    console.log(
                        "Manage customer"
                    );
                }}
            >
                <Settings2 />
                Manage
            </Button>

            <DropdownMenu>

                <DropdownMenuTrigger
                    render={
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Customer actions"
                        >
                            ...
                        </Button>
                    }
                />

                <DropdownMenuContent align="end">

                    <DropdownMenuItem
                        onClick={() =>
                            console.log(
                                "Pause customer"
                            )
                        }
                    >
                        <PauseCircle />
                        Pause billing
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        className="text-destructive"
                        onClick={() =>
                            console.log(
                                "Cancel customer"
                            )
                        }
                    >
                        Cancel customer
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

        </div>
    );
}