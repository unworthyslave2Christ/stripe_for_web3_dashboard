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
    Computer,
    LockOpen
} from "lucide-react";

export const mainNavigation = [
    {
        label: "Overview",
        href: "/dashboard/platform/overview",
        icon: LayoutDashboard,
    },
    {
        label: "Customers",
        href: "/dashboard/platform/customers",
        icon: Users,
    },
    {
        label: "Plans",
        href: "/dashboard/platform/plans",
        icon: CreditCard,
    },
    {
        label: "Subscriptions",
        href: "/dashboard/platform/subscriptions",
        icon: WalletCards,
    },
    {
        label: "Billing",
        href: "/dashboard/platform/billing",
        icon: Blocks,
    },
    {
        label: "Billing Operators",
        href: "/dashboard/platform/billing-operators",
        icon: Computer,
    },
    {
        label: "Permissions",
        href: "/dashboard/platform/permissions",
        icon: LockOpen,
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
        href: "/dashboard/developers/notifications",
        icon: Bell,
    },
];

export const secondaryNavigation = [ 
    {
        label: "Activity",
        href: "/dashboard/account/activity",
        icon: Activity,
    },
    {
        label: "Settings",
        href: "/dashboard/account/settings",
        icon: Settings,
    },
    {
        label: "Documentation",
        href: "#",
        icon: BookOpen,
    },

];