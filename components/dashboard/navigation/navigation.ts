import {
    Activity,
    Bell,
    Blocks,
    BookOpen,
    CreditCard,
    FileKey2,
    LayoutDashboard,
    Settings,
    Users,
    Webhook,
    WalletCards,
} from "lucide-react";

export const mainNavigation = [
    {
        label: "Overview",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Customers",
        href: "/dashboard/customers",
        icon: Users,
    },
    {
        label: "Plans",
        href: "/dashboard/plans",
        icon: CreditCard,
    },
    {
        label: "Subscriptions",
        href: "/subscriptions",
        icon: WalletCards,
    },
    {
        label: "Billing",
        href: "/billing",
        icon: Blocks,
    },
    {
        label: "Activity",
        href: "/activity",
        icon: Activity,
    },
];

export const developerNavigation = [
    {
        label: "API Keys",
        href: "/developers/api-keys",
        icon: FileKey2,
    },
    {
        label: "Webhooks",
        href: "/developers/webhooks",
        icon: Webhook,
    },
    {
        label: "Notifications",
        href: "/notifications",
        icon: Bell,
    },
];

export const secondaryNavigation = [
    {
        label: "Documentation",
        href: "#",
        icon: BookOpen,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
    },
];