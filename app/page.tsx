'use client'

import { useRouter } from "next/router"


export default function RootPage(){
  const router = useRouter();

  router.replace("/dashboard");
}