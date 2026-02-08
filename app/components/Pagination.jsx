"use client";
import { useProjectStore } from "@/store/projectStore"
import styles from "@/styles/pagination.module.css"

//paginación para navegar entre proyectos, se muestra solo si hay más de 1 página de proyectos
export default function Pagination() {
    const currentPage = useProjectStore((state) => state.currentPage)
    const itemPerPage = useProjectStore((state) => state.itemPerPage)
    const setPage = useProjectStore((state) => state.setPage)
    const getFilteredProjects = useProjectStore((state) => state.getFilteredProjects)
    const totalPages = Math.ceil(getFilteredProjects().length / itemPerPage)

    if(totalPages <= 1) return null;

    return (
        <div className={styles.container}>
            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                <button 
                    key={page} 
                    onClick={() => setPage(page)}
                    className={page === currentPage ? styles.active : styles.button}
                    aria-label={`Ir a pagina ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                >
                    {page}
                </button>
            ))}
        </div>
    )
}
