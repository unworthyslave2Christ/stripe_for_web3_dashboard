// services/mappers/customer.ts

import type { Customer } from "@/types/dashboard";

export function parseCustomer(row: any): Customer {

    return {

        customerId:
            row.customer_id,

        walletAddress:
            row.wallet_address,

        smartAccount:
            row.smart_account,

        displayName:
            row.display_name,

        email:
            row.email,

        status:
            row.status,

        createdAt:
            row.created_at,

        updatedAt:
            row.updated_at,

    };

}


export function parseCustomers(
    rows: any[],
): Customer[] {

    return rows.map(parseCustomer);

}