// app/api/v1/admin/workers/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Return Worker status.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            workers: [

                {

                    workerId: "billing",

                    status: "RUNNING",

                    lastHeartbeat:
                        new Date().toISOString(),
                },

                {

                    workerId: "webhooks",

                    status: "RUNNING",

                    lastHeartbeat:
                        new Date().toISOString(),
                },
            ],
        },
        {
            status: 200,
        },
    );

}