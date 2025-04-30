

export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
    
    // Si el numbero total de paginas es 5 o menos
    // mostramos todas las pags sin numeros suspensivos

    if( totalPages <= 6 ){
        return Array.from({ length: totalPages}, (_, i) => i + 1);
    }

    // Si la pagina actual esta entre las primeras 3 paginas
    // mostramos las 3 primeras, puntos y la ultima
    if( currentPage <= 3 ){
        return [1, 2, 3, "...", totalPages];
    }

    if( currentPage >= totalPages - 1 ){
        return [1, "...", totalPages - 1, totalPages];
    }

    return[
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
    ]
}