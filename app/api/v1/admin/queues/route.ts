// app/api/v1/admin/queues/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Queue inspection.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            queues: {

                billing: {

                    pending: 0,

                    processing: 0,
                },

                webhooks: {

                    pending: 0,

                    processing: 0,
                },

                notifications: {

                    pending: 0,

                    processing: 0,
                },
            },
        },
        {
            status: 200,
        },
    );

}