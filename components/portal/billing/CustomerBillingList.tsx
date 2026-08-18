import {
    CustomerBillingListItem,
} from "./CustomerBillingListItem";

import type {
    CustomerBillingRecord,
} from "./customer-billing.types";

const billing: CustomerBillingRecord[] = [
    {
        id: "billing_001",
        billingId: "billing_8F42A1",
        subscriptionId: 10021,
        planName: "Pro",
        amount: "19",
        currency: "USD",
        status: "SUCCEEDED",
        interval: "MONTH",
        processedAt: "Jun 12, 2025 · 09:41",
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
        transactionHash:
            "0x8f91...a21d",
        refundAmount: null,
    },
    {
        id: "billing_002",
        billingId: "billing_7D28B4",
        subscriptionId: 10031,
        planName: "Analytics",
        amount: "9",
        currency: "USD",
        status: "SUCCEEDED",
        interval: "MONTH",
        processedAt: "Jun 20, 2025 · 10:17",
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
        transactionHash:
            "0x2c51...f8ad",
        refundAmount: null,
    },
    {
        id: "billing_003",
        billingId: "billing_1F33C9",
        subscriptionId: 10021,
        planName: "Pro",
        amount: "19",
        currency: "USD",
        status: "SUCCEEDED",
        interval: "MONTH",
        processedAt: "May 12, 2025 · 09:42",
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
        transactionHash:
            "0x7d18...2f6b",
        refundAmount: null,
    },
    {
        id: "billing_004",
        billingId: "billing_19A821",
        subscriptionId: 10021,
        planName: "Pro",
        amount: "19",
        currency: "USD",
        status: "SUCCEEDED",
        interval: "MONTH",
        processedAt: "Apr 12, 2025 · 09:40",
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
        transactionHash:
            "0x122a...98f3",
        refundAmount: null,
    },
];

export function CustomerBillingList() {
    return (
        <div className="space-y-3">

            {billing.map((record) => (
                <CustomerBillingListItem
                    key={record.id}
                    billing={record}
                />
            ))}

        </div>
    );
}