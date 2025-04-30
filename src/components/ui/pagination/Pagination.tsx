"use client"
import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";


interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {

    const pathname = usePathname()
    const searchParams = useSearchParams();
    const pageString = searchParams.get("page") ?? 1;
    const notANumber = isNaN( Number(pageString));
        
    const currentPage = notANumber ? 1 : Number(pageString);

    if( currentPage < 1 || notANumber ){
        redirect(pathname)
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages);

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);

        if (pageNumber === "...") {
            return `${pathname}?${params.toString()}`;
        }

        if (Number(pageNumber) <= 0) {
            return `${pathname}`;
        }

        if (Number(pageNumber) > totalPages) {
            return `${pathname}`;
        }

        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    return (
        <div className="flex text-center justify-center mt-10 mb-28">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none gap-x-2">
                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage - 1)}>
                            <IoChevronBackOutline size={25} />
                        </Link>
                    </li>

                    {
                        allPages.map((page, index) => (
                        <li key={ page } className="page-item">
                            <Link
                                className={
                                    clsx(
                                        "page-link relative block py-1.5 px-3.5 rounded border-0 outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                        {
                                            'bg-blue-600 shadow-md text-white hover:bg-blue-700 hover:text-white': page === currentPage,
                                            'bg-transparent': page !== currentPage
                                        }
                                    )
                                }
                                href={createPageUrl(page)}>
                                { page }
                            </Link>
                        </li>
                        ))
                    }

                    
                    <li className="page-item">
                        <Link
                            className="page-link bg-blue-500 relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage + 1)}>
                            <IoChevronForwardOutline size={25} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
