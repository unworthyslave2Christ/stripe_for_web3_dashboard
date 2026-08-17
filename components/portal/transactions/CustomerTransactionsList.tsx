import {
    CustomerTransactionListItem,
} from "./CustomerTransactionListItem";

import type {
    CustomerTransactionRecord,
} from "./customer-transaction.types";

const transactions: CustomerTransactionRecord[] = [
    {
        id: "tx_001",
        transactionHash:
            "0x8f91c2d5a31f0b9912d7c1a7c41e8b53c2e8f6a1b9c2d7e3a21d4f9c82a1",
        type: "SUBSCRIPTION_BILLING",
        title: "Pro subscription billing",
        description:
            "Recurring billing transaction for the Pro subscription.",
        amount: "19",
        currency: "USDC",
        status: "SUCCESS",
        timestamp: "Jun 12, 2025 · 09:41",
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
        blockNumber: 24421871,
        explorerUrl:
            "https://sepolia.arbiscan.io/tx/0x8f91c2d5",
        subscriptionId: 10021,
        planName: "Pro",
    },
    {
        id: "tx_002",
        transactionHash:
            "0x2c51d9e7a8b31f2c718fa9914c0d271e93b6a84cf7a22d1",
        type: "SUBSCRIPTION_BILLING",
        title: "Analytics subscription billing",
        description:
            "Recurring billing transaction for the Analytics subscription.",
        amount: "9",
        currency: "USDC",
        status: "SUCCESS",
        timestamp: "Jun 20, 2025 · 10:17",
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
        blockNumber: 24501824,
        explorerUrl:
            "https://sepolia.arbiscan.io/tx/0x2c51d9",
        subscriptionId: 10031,
        planName: "Analytics",
    },
    {
        id: "tx_003",
        transactionHash:
            "0x7d18f2e9ac51d7b3e1f820e41a5d8820",
        type: "PERMISSION_UPDATE",
        title: "Billing permission updated",
        description:
            "The billing authorization associated with your Smart Account was updated.",
        amount: null,
        currency: null,
        status: "SUCCESS",
        timestamp: "Jun 01, 2025 · 12:04",
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
        blockNumber: 24298122,
        explorerUrl:
            "https://sepolia.arbiscan.io/tx/0x7d18f2",
        subscriptionId: null,
        planName: null,
    },
    {
        id: "tx_004",
        transactionHash:
            "0x122ab8c3f712e9a1d7c02a6f3e85b4",
        type: "ACCOUNT_OPERATION",
        title: "Smart Account operation",
        description:
            "A Smart Account operation was successfully completed.",
        amount: null,
        currency: null,
        status: "SUCCESS",
        timestamp: "May 29, 2025 · 14:26",
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
        blockNumber: 24273118,
        explorerUrl:
            "https://sepolia.arbiscan.io/tx/0x122ab8",
        subscriptionId: null,
        planName: null,
    },
];
 
export function CustomerTransactionsList() {
    return (
        <div className="space-y-3">

            {transactions.map((transaction) => (
                <CustomerTransactionListItem
                    key={transaction.id}
                    transaction={transaction}
                />
            ))}

        </div>
    );
}