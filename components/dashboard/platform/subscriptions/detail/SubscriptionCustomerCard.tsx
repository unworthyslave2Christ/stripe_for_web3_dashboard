import Link from "next/link";

import {
    ExternalLink,
    User,
    Wallet,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface SubscriptionCustomerCardProps {
    subscription: {
        customerId: string;
        customerName: string;
        customerWallet: string;
        smartAccount: string;
    };
}

export function SubscriptionCustomerCard({
    subscription,
}: SubscriptionCustomerCardProps) {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Customer
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

                <div className="flex items-center gap-3">

                    <Avatar className="size-10">
                        <AvatarFallback>
                            {subscription.customerName
                                .slice(0, 2)
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">

                        <Link
                            href={`/dashboard/customers/${subscription.customerId}`}
                            className="block font-medium hover:underline"
                        >
                            {subscription.customerName}
                        </Link>

                        <p className="text-xs text-muted-foreground">
                            {subscription.customerId}
                        </p>

                    </div>

                </div>

                <div className="space-y-3">

                    <AccountRow
                        icon={Wallet}
                        label="Owner wallet"
                        value={subscription.customerWallet}
                    />

                    <AccountRow
                        icon={User}
                        label="Smart account"
                        value={subscription.smartAccount}
                    />

                </div>

                <Button
                    render={
                        <Link
                            href={`/dashboard/customers/${subscription.customerId}`}
                        >
                            View customer
                            <ExternalLink />
                        </Link>
                    }
                    variant="outline"
                    className="w-full"
                >
                    
                </Button>

            </CardContent>

        </Card>
    );
}

function AccountRow({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof Wallet;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-lg border bg-muted/20 p-3">

            <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon className="size-3.5" />
                {label}
            </p>

            <p className="mt-2 break-all font-mono text-xs">
                {value}
            </p>

        </div>
    );
}