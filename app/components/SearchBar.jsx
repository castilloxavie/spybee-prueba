"use client";
import { useProjectStore } from "@/store/projectStore";
import styles from "@/styles/searchBar.module.css"

//barra de busqueda
export default function SearcBar () {
    const searchTerm = useProjectStore((state) => state.searchTerm);
    const setSearchTerm = useProjectStore((state) => state.setSearchTerm);

    return (
        <input type="text" placeholder="Buscar Proyecto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.input}
         />
    )
}
