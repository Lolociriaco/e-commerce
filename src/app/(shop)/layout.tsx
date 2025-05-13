import React from "react";
import { Sidebar, TopMenu, Footer } from "@/components";


export default function ShopLayout( { children } : {
    children: React.ReactNode;
}) {
return(
    <main className="flex flex-col min-h-screen"> 
        <TopMenu></TopMenu>
        <Sidebar></Sidebar>
        
        <div className="px-0 flex flex-1">
            {children}
        </div>
        
        <Footer />
    </main>
)
}