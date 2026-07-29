"use client";

import { useState } from "react";

import { useAccount } from "wagmi";

import { useMerchant } from "@/hooks/useMerchant";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

export default function RegisterMerchantForm() {
    const router = useRouter();

    const { address } = useAccount();

    const { createMerchant, loading } =
        useMerchant();

    const [name, setName] =
        useState("");

    const [metadataURI, setMetadataURI] =
        useState("");

    async function handleSubmit(
        e: React.FormEvent,
    ) {
        e.preventDefault();

        if (!address) {
            toast.info(
                "Connect your wallet first.",
            );
            return;
        }

        if (!name.trim()) {
            toast.warning(
                "Merchant name is required.",
            );
            return;
        }

        try {
            const result =
                await createMerchant(
                    address,
                    address,
                    name,
                    metadataURI,
                );

            if (result.alreadyRegistered) {
                toast.info(
                    "Merchant already registered.",
                    {
                        description: `Merchant #${result.merchantId}`,
                    },
                );

                router.push("/dashboard");

                return;
            }

            toast.success(
                "Merchant successfully registered",
                {
                    description: `Merchant #${result.merchantId}`,
                },
            );

            setName("");
            setMetadataURI("");

            router.push("/dashboard");
        } catch (err) {
            console.error(err);

            toast.error(
                "Registration failed.",
                {
                    description:
                        err instanceof Error
                            ? err.message
                            : "Unknown error",
                },
            );
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-xl"
        >
            <div>
                <label>
                    Merchant Name
                </label>

                <input
                    className="w-full rounded border p-2"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />
            </div>

            <div>
                <label>
                    Metadata URI
                </label>

                <input
                    className="w-full rounded border p-2"
                    value={metadataURI}
                    onChange={(e) =>
                        setMetadataURI(
                            e.target.value,
                        )
                    }
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="rounded bg-blue-600 px-4 py-2 text-white"
            >
                {loading
                    ? "Registering..."
                    : "Register Merchant"}
            </button>
        </form>
    );
}