"use client";

import { useState } from "react";

import { useCustomer } from "@/hooks/useCustomer";

export default function CustomerForm() {

    const {registerCustomer} =
        useCustomer();

    const [displayName, setDisplayName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {

        event.preventDefault();

        setLoading(true);

        try {

            await registerCustomer( displayName, email);

            // alert("Customer successfully registered")

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <form

            onSubmit={handleSubmit}

            className="space-y-6 rounded-xl border border-slate-800 bg-slate-900 p-8"

        >

            <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">

                    Display Name

                </label>

                <input

                    required

                    value={displayName}

                    onChange={(event) =>
                        setDisplayName(
                            event.target.value,
                        )
                    }

                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"

                />

            </div>

            <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">

                    Email

                </label>

                <input

                    required

                    type="email"

                    value={email}

                    onChange={(event) =>
                        setEmail(
                            event.target.value,
                        )
                    }

                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"

                />

            </div>

            <button

                type="submit"

                disabled={loading}

                className="rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white"

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