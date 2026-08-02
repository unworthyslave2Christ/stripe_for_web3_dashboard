"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {

    value: string;

    onChange: (

        value: string,

    ) => void;

}

export default function SearchBar({

    value,

    onChange,

}: SearchBarProps) {

    return (

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                <div className="relative flex-1">

                    <Search

                        size={18}

                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"

                    />

                    <input

                        type="text"

                        value={value}

                        onChange={(event) =>

                            onChange(

                                event.target.value,

                            )

                        }

                        placeholder="Search subscription businesses..."

                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-11 text-white placeholder:text-slate-500 outline-none transition-all focus:border-cyan-500"

                    />

                    {

                        value.length > 0 && (

                            <button

                                type="button"

                                onClick={() =>

                                    onChange("")

                                }

                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:bg-slate-800 hover:text-white"

                            >

                                <X size={16} />

                            </button>

                        )

                    }

                </div>

                <div className="hidden rounded-xl border border-cyan-700/40 bg-cyan-500/10 px-5 py-3 text-sm font-medium text-cyan-300 lg:block">

                    Search merchants, plans & Web3 subscription businesses

                </div>

            </div>

        </section>

    );

}