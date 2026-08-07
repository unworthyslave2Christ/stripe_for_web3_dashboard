// app/api/v1/auth/api-keys/route.ts

import { randomBytes } from "crypto";

import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Validate session.
    // Load API keys belonging to authenticated Merchant.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            apiKeys: [
                {
                    keyId: "key_mock",

                    type: "secret",

                    prefix: "sk_live",

                    createdAt: new Date().toISOString(),

                    lastUsedAt: null,

                    revoked: false,
                },
            ],
        },
        {
            status: 200,
        },
    );

}

export async function POST(_request: NextRequest) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Validate session.
    // Generate a new API key.
    // Persist hashed key.
    ////////////////////////////////////////////////////////////

    const secret = `sk_live_${randomBytes(32).toString("hex")}`;

    return NextResponse.json(
        {
            success: true,

            apiKey: {
                keyId: "key_mock",

                secret,

                createdAt: new Date().toISOString(),
            },
        },
        {
            status: 201,
        },
    );

}