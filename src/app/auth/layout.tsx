import React from "react";

export default function ShopLayout( { children } : {
    children: React.ReactNode;
}) {
    return(
        <div className="min-h-screen flex justify-center items-center">
          <div className="w-full sm:w-[500px] px-5">
            {children}
          </div>
        </div>
    )
}