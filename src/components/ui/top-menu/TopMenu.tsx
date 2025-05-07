"use client"

import { titleFont } from "@/config/fonts"
import Link from "next/link"
import { IoCartOutline, IoMenuOutline } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import  useUiStore from "@/store/ui/ui-store";
import { useCartStore } from "@/store";


export const TopMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [loaded, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  })

  const itemsInCart = useCartStore( state => state.getTotalItems() )
  
  

  // Abre el menú inmediatamente
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Cancela el cierre si el mouse vuelve
    }
    setIsOpen(true);
  };

  // Cierra el menú con un retraso
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 500); // 500ms de retraso antes de cerrar
  };


  const openMenu = useUiStore(state => state.openSidebar);

    return (
      <nav className="flex px-5 justify-between items-center w-full shadow-md">
        {/* Logo */}
        <div>
          <Link href="/">
            <span className={`${titleFont} antialiased font-bold`}>Jacaranda</span>
            <span> | Tienda</span>
          </Link>
        </div>
  
        {/* Menú Principal*/}
        <div className="hidden sm:flex space-x-4 items-center">
          <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/">
            Inicio
          </Link>
  
          {/* Menú desplegable*/}
          <div className="relative group" onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          >
            <Link href="/products" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
              Juguetes
            </Link>
  
          {/* Dropdown */}
            {isOpen && (
              <div className="absolute left-0 bg-gray-100 w-[200px] shadow-md p-2 mt-2 rounded-md z-50">
                <Link href="/gender/men" className="block p-2 hover:bg-gray-200">
                  Men
                </Link>
                <Link href="/gender/women" className="block p-2 hover:bg-gray-200">
                  Women
                </Link>
                <Link href="/gender/kid" className="block p-2 hover:bg-gray-200">
                  Kids
                </Link>
              </div>
            )}
          </div>
  
          <Link href="/about-us" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
            Sobre Nosotros
          </Link>
        </div>

        {/* Busqueda carrito y menu*/}

        <div className="flex items-center m-4 gap-7">
            <Link href="/cart">
                <div className="relative">
                  {
                    (itemsInCart > 0 && loaded) && (
                      <span className="absolute text-xs rounded-full px-[8px] py-[3px] font-bold -top-2 -right-2 bg-blue-500 text-white">
                          {itemsInCart}
                      </span>
                    )
                  }
                    <IoCartOutline className="w-8 h-8"/>
                </div>
            </Link>
            <div className="relative">
                <IoMenuOutline 
                  className="w-8 h-8"
                  onClick={openMenu}
                />
            </div>
        </div>
      </nav>
    );
  };