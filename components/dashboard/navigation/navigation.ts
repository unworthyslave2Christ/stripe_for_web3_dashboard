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
        href: "/dashboard/overview",
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
        href: "/dashboard/subscriptions",
        icon: WalletCards,
    },
    {
        label: "Billing",
        href: "/dashboard/billing",
        icon: Blocks,
    },
    {
        label: "Activity",
        href: "/dashboard/activity",
        icon: Activity,
    },
];

export const developerNavigation = [
    {
        label: "API Keys",
        href: "/dashboard/developers/api-keys",
        icon: FileKey2,
    },
    {
        label: "Webhooks",
        href: "/dashboard/developers/webhooks",
        icon: Webhook,
    },
    {
        label: "Notifications",
        href: "/dashboard/notifications",
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
        href: "/dashboard/settings",
        icon: Settings,
    },
];