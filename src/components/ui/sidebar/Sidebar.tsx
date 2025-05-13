"use client"

import useUiStore from '@/store/ui/ui-store'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

export const Sidebar = () => {

    const isSidebarOpen = useUiStore(state => state.isSidebarOpen);
    const closeMenu = useUiStore(state => state.closeSidebar);

    const { data: session } = useSession();

    const isAuthenticated = !!session?.user;
    console.log(session)

      const handleLogout = () => {
        signOut({ callbackUrl: '/' }); // Redirige al home y refresca sesión
    };

    return (
        <div>

            {/* Background black */}
            {
                isSidebarOpen &&
                <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black bg-opacity-20'>
                </div>
            }


            {/* Blur */}
            {
                isSidebarOpen &&
                <div className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'>
                </div>
            }


            {/* Sidebar */}
            <div className={
                clsx(
                    'fixed p-5 top-0 right-0 w-[500px] h-screen z-20 bg-white shadow-2xl transform transition-all duration-300',
                    {
                        "translate-x-full": !isSidebarOpen,
                    }
                )
            }>


                <nav>
                    <IoCloseOutline
                        size={40}
                        className='absolute top-4 right-8 cursor-pointer'
                        onClick={closeMenu}
                    />

                    {/* Input */}
                    <div className='flex items-center relative mt-12'>
                        <IoSearchOutline
                            size={20}
                            className='absolute top-2 left-2 text-gray-400'
                        />
                        <input type="text"
                            placeholder='Search'
                            className='w-[90%] h-9 pr-10 pl-10 border border-gray-300 focus:border-blue-500 rounded-full'
                        />
                    </div>

                    {/* Categories */}

                    <ul>
                        {
                            !isAuthenticated &&
                            <li>
                                <Link
                                    href="/auth/login"
                                    onClick={closeMenu}
                                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300'
                                >
                                    <IoLogInOutline size={25} />
                                    <span className='ml-3 text-xl'>Iniciar secion</span>
                                </Link>
                            </li>
                        }
                        <li>
                            <Link
                                href="/profile"
                                onClick={closeMenu}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300'
                            >
                                <IoPersonOutline size={25} />
                                <span className='ml-3 text-xl'>Perfil</span>
                            </Link>

                        </li>
                        <li>
                            <Link
                                href="/"
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300'
                            >
                                <IoTicketOutline size={25} />
                                <span className='ml-3 text-xl'>Ordenes</span>
                            </Link>
                        </li>
                        {
                            isAuthenticated &&
                            <>
                                <li>
                                    <button
                                        onClick={ handleLogout }
                                        className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300'
                                    >
                                        <IoLogOutOutline size={25} />
                                        <span className='ml-3 text-xl'>Cerrar secion</span>
                                    </button>
                                </li>
                            </>
                        }
                    </ul>

                    {/* Line separator */}

                    <div className='w-[90%] h-px bg-gray-300 my-10 mx-auto rounded' />


                    {/*Second - Categories */}

                    <ul>
                        <li>
                            <Link
                                href="/"
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300'
                            >
                                <IoShirtOutline size={25} />
                                <span className='ml-3 text-xl'>Productos</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/"
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300'
                            >
                                <IoTicketOutline size={25} />
                                <span className='ml-3 text-xl'>Ordenes</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/"
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300'
                            >
                                <IoPeopleOutline size={25} />
                                <span className='ml-3 text-xl'>Usuarios</span>
                            </Link>
                        </li>
                    </ul>

                </nav>


            </div>
        </div>
    )
}
