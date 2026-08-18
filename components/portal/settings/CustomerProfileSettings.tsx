"use client";

import {
    useState,
} from "react";

import {
    Input,
} from "@/components/ui/input";

import {
    Label,
} from "@/components/ui/label";

import {
    SettingsSection,
} from "@/components/dashboard/account/settings/SettingsSection";

export function CustomerProfileSettings({
    initialDisplayName,
    initialEmail,
}: {
    initialDisplayName: string;
    initialEmail: string;
}) {
    const [
        displayName,
        setDisplayName,
    ] = useState(
        initialDisplayName,
    );

    const [
        email,
        setEmail,
    ] = useState(
        initialEmail,
    );

    return (
        <SettingsSection
            title="Profile"
            description="Manage the customer information associated with your Stripe for Web3 account."
        >

            <div className="space-y-6">

                <div className="space-y-2">

                    <Label htmlFor="customer-display-name">
                        Display name
                    </Label>

                    <Input
                        id="customer-display-name"
                        value={displayName}
                        onChange={(event) =>
                            setDisplayName(
                                event.target.value,
                            )
                        }
                        placeholder="Your name"
                    />

                    <p className="text-xs text-muted-foreground">
                        This name identifies you throughout the customer portal.
                    </p>

                </div>

                <div className="space-y-2">

                    <Label htmlFor="customer-email">
                        Email
                    </Label>

                    <Input
                        id="customer-email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(
                                event.target.value,
                            )
                        }
                        placeholder="you@example.com"
                    />

                    <p className="text-xs text-muted-foreground">
                        Used for customer notifications and account-related communication.
                    </p>

                </div>

            </div>

        </SettingsSection>
    );
}