import { create } from "zustand"
import projectsData from "@/data/mock_data.json"
import { Project } from "../types"


// manejo de los estados del proyecto
export const useProjectStore = create ((set, get) => ({
    // Datos
    projects: projectsData as Project[],
    selectedProject: null as Project | null,

    // Estado de interfaz de usuario 
    searchTerm: "",
    sortBy: "name",
    currentPage: 1,
    itemPerPage: 10,
    statusFilter: "all",
    viewMode: "list",

    // Acciones
    setSearchTerm: (term) => 
        set({ searchTerm: term, currentPage: 1 }),

    setSortBy: (value) =>
        set({ sortBy: value }),

    setPage: (page)  =>
        set({ currentPage: page }),

    setSelectedProject: (project) =>
        set({ selectedProject: project }),

    setStatusFilter: (status) => 
        set({ statusFilter: status, currentPage: 1 }),

    setViewMode: (mode) =>
        set({ viewMode: mode }),

    // Filtros para la busqueda de proyecto
    getFilteredProjects: () => {
        const { projects, searchTerm, statusFilter } = get()
        let result = [...projects]

        // Filtrar por estados
        if(statusFilter !== "all"){
            result = result.filter(
                project => project.status === statusFilter
            )
        }

        // Busqueda
        if(searchTerm.trim()){
            result = result.filter(
                project => 
                    project.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            )
        }

        return result;
    },

    // Paginacion (10 items por pagina)
    getPaginationProject: () => {
        const {
            currentPage,
            itemPerPage,
            sortBy,
        } = get();

        let data = [...get().getFilteredProjects()]

        // Funcion auxiliar para contar items por tipo
        const countItemsByType = (incidents, type) => {
            return incidents.filter(
                (item) =>
                    item.item === type && item.status === "active"
            ).length;
        };

        // Ordenamiento
        if(sortBy === "name") {
            data.sort((a, b) => a.title.localeCompare(b.title))
        }

        if(sortBy === "due"){
            const countDue = (project) =>{
                const now = new Date();
                return (project.incidents || []).filter(
                    (item) =>
                        item.status === "active" && new Date(item.limitDate) > now
                ).length
            }

            data.sort((a, b) => countDue(b) - countDue(a))
        }

        if(sortBy === "incidents") {
            data.sort((a, b) => countItemsByType(b.incidents || [], "incidents") - countItemsByType(a.incidents || [], "incidents"))
        }

        if(sortBy === "rfi") {
            data.sort((a, b) => countItemsByType(b.incidents || [], "RFI") - countItemsByType(a.incidents || [], "RFI"))
        }

        if(sortBy === "tasks") {
            data.sort((a, b) => countItemsByType(b.incidents || [], "task") - countItemsByType(a.incidents || [], "task"))
        }

        const start = (currentPage - 1) * itemPerPage
        const end = start + itemPerPage

        return data.slice(start, end)
    }

}))
