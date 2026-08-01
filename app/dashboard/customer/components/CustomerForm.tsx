"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useCustomer } from "@/hooks/useCustomer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CustomerForm() {

    const router = useRouter();

    const { address } = useAccount();

    const { registerCustomer, loading } =
        useCustomer();

    const [displayName, setDisplayName] =
        useState("");

    const [email, setEmail] =
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

        if (!displayName.trim()) {

            toast.warning(
                "Display name is required.",
            );

            return;

        }

        if (!email.trim()) {

            toast.warning(
                "Email is required.",
            );

            return;

        }

        try {

            const result =
                await registerCustomer(
                    displayName,
                    email,
                );

            if (result.alreadyRegistered) {

                toast.info(
                    "Customer already registered.",
                );

                router.push(
                    "/dashboard/customer/home",
                );

                return;

            }

            toast.success(
                "Customer successfully registered.",
            );

            setDisplayName("");
            setEmail("");

            router.push(
                "/dashboard/customer/home",
            );

        }

        catch (err) {

            console.error(err);

            toast.error(
                "Customer registration failed.",
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

                    Display Name

                </label>

                <input
                    value={displayName}
                    disabled={loading}
                    onChange={(e) =>
                        setDisplayName(
                            e.target.value,
                        )
                    }
                    className="w-full rounded border p-2"
                />

            </div>

            <div>

                <label>

                    Email

                </label>

                <input
                    type="email"
                    value={email}
                    disabled={loading}
                    onChange={(e) =>
                        setEmail(
                            e.target.value,
                        )
                    }
                    className="w-full rounded border p-2"
                />

            </div>

            <button
                type="submit"
                disabled={loading}
                className={`rounded px-4 py-2 text-white ${
                    loading
                        ? "bg-cyan-600/50"
                        : "bg-cyan-600"
                }`}
            >

                {
                    loading
                        ? "Registering..."
                        : "Register Customer"
                }

            </button>

        </form>

    );

}