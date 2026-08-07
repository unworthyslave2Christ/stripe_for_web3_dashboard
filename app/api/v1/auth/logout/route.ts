// app/api/v1/auth/logout/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Validate active session.
    // Revoke session token.
    // Remove session cookie (if applicable).
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            message: "Successfully logged out.",
        },
        {
            status: 200,
        },
    );

}