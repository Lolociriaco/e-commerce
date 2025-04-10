import React from "react";
import { Sidebar, TopMenu, Footer } from "@/components";


export default function ShopLayout( { children } : {
    children: React.ReactNode;
}) {
return(
    
        <main className="min-h-screen"> 
            <TopMenu></TopMenu>
            <Sidebar></Sidebar>
            
            <div className="px-0">
                {children}
            </div>
            <Footer />
        </main>
)
}