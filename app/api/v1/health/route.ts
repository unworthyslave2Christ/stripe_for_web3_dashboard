// app/api/v1/health/route.ts

import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(
        {
            success: true,

            status: "healthy",

            service: "Stripe for Web3 Billing Platform",

            version: "v1",

            timestamp: new Date().toISOString(),
        },
        {
            status: 200,
        },
    );
}