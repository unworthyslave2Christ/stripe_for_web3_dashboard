// BY GOD'S GRACE ALONE

// "use client";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

export  function BackButton(){
    const router = useRouter();

    const goBack = () =>  router.back();

   return (
    <span
        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-white text-[15px] ml-3"

        onClick={(e)=>goBack()}
    >
        <ArrowLeft size={18} /> Back
    </span>
   )
}

