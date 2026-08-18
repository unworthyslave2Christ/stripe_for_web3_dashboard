import {
    CustomerPortalSidebar,
} from "./CustomerPortalSidebar";

import {
    CustomerPortalTopbar,
} from "./CustomerPortalTopbar";

interface CustomerPortalShellProps {
    children: React.ReactNode;
}

export function CustomerPortalShell({
    children,
}: CustomerPortalShellProps) {
    return (
        <div className="min-h-screen bg-background">

            <CustomerPortalSidebar />

            <div className="lg:pl-60">

                <CustomerPortalTopbar />

                <main>
                    {children}
                </main>

            </div>

        </div>
    );
}