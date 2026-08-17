import {
    CustomerPortalShell,
} from "@/components/portal/CustomerPortalShell";

export default function CustomerPortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CustomerPortalShell>
            {children}
        </CustomerPortalShell>
    );
}