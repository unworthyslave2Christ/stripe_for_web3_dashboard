// app/api/v1/events/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate caller.
    // Return Event Stream.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            events: [],

            pagination: {
                nextCursor: null,

                hasMore: false,
            },
        },
        {
            status: 200,
        },
    );

}