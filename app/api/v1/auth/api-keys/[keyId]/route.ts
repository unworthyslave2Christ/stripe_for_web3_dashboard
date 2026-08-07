// app/api/v1/auth/api-keys/[keyId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        keyId: string;
    }>;
}

export async function DELETE(
    _request: NextRequest,
    { params }: RouteContext,
) {
    const { keyId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Validate authenticated Merchant.
    // Verify API Key belongs to Merchant.
    // Revoke API Key.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            apiKey: {
                keyId,

                revoked: true,

                revokedAt: new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );
}