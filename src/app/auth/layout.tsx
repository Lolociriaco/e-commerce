import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import React from "react";

export default async function ShopLayout( { children } : {
    children: React.ReactNode;
}) {

  const session = await auth();

  if( session?.user ){
    redirect("/");
  }

  return(
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full sm:w-[500px] px-5">
          {children}
        </div>
      </div>
  )
}