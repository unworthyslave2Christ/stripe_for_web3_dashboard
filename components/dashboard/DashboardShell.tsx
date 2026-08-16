"use client";

import type { ReactNode } from "react";

import {
    DashboardSidebar,
} from "./DashboardSidebar";

import {
    DashboardTopbar,
} from "./DashboardTopbar";

interface DashboardShellProps {
    children: ReactNode;
}

export function DashboardShell({
    children,
}: DashboardShellProps) {
    return (
        <div className="min-h-screen bg-background">
            <DashboardSidebar />

            <div className="lg:pl-64">
                <DashboardTopbar />

                <main className="min-h-[calc(100vh-4rem)]">
                    {children}
                </main>
            </div>
        </div>
    );
}