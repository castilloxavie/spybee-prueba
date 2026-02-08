"use client";
import { useProjectStore } from "@/store/projectStore";
import styles from "../styles/table.module.css";

const countItemsByType = (incidents, type) => {
    return incidents.filter(
        (item) => item.item === type && item.status === "active"
    ).length;
};

// mapeo en español
const getPlanLabel = (plan) => {
    const planMap = {
        "big": "Premium",
        "small": "Pequeño",
        "advanced": "Avanzado"
    };
    return planMap[plan] || plan;
};

// Mapeo de status a español
const getStatusLabel = (status) => {
    const statusMap = {
        "active": "Activo",
        "inactive": "Inactivo",
        "suspended": "Suspendido",
        "completed": "Completado"
    };
    return statusMap[status] || status;
};

// componente insignia para Plan
const PlanBadge = ({ plan }) => {
    const label = getPlanLabel(plan);
    const planClass = {
        "big": styles.planPremium,
        "small": styles.planSmall,
        "advanced": styles.planAdvanced
    }[plan] || styles.planAdvanced;

    return <span className={`${styles.badge} ${planClass}`}>{label}</span>;
};

// Componente insinia para Status
const StatusBadge = ({ status }) => {
    const label = getStatusLabel(status);
    const statusClass = {
        "active": styles.statusActive,
        "inactive": styles.statusInactive,
        "suspended": styles.statusSuspended,
        "completed": styles.statusCompleted
    }[status] || styles.statusInactive;

    return <span className={`${styles.badge} ${statusClass}`}>{label}</span>;
};

// Componente para mostrar avatares del equipo
const TeamAvatars = ({ users, maxDisplay = 5 }) => {
    const displayUsers = users?.slice(0, maxDisplay) || [];
    const extraCount = (users?.length || 0) - maxDisplay;

    return (
        <div className={styles.teamContainer}>
            <div className={styles.avatarGroup}>
                {displayUsers.map((user, idx) => {
                    const initials = `${user.name?.[0] || 'U'}${user.lastName?.[0] || 'U'}`.toUpperCase();
                    return (
                        <div
                            key={idx}
                            className={`${styles.avatar} ${styles[`avatar${idx + 1}`]}`}
                            title={`${user.name} ${user.lastName}`}
                        >
                            {initials}
                        </div>
                    );
                })}
                {extraCount > 0 && (
                    <div className={styles.teamCount}>
                        +{extraCount}
                    </div>
                )}
            </div>
        </div>
    );
};

// Componente para Items por vencer
const DueItems = ({ incidents, rfi, tasks }) => {
    const items = [
        { label: "Incidencias", count: incidents },
        { label: "RFI", count: rfi },
        { label: "Tareas", count: tasks }
    ];

    return (
        <div className={styles.dueItemsContainer}>
            {items.map((item, idx) => (
                <div key={idx} className={styles.dueItem}>
                    <div className={styles.dueContent}>
                        <div className={styles.dueCount}>{item.count}</div>
                        <div className={styles.dueLabel}>{item.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function ProjectTable(){
    const getPaginationProject = useProjectStore((state) => state.getPaginationProject);
    const searchTerm = useProjectStore((state) => state.searchTerm);
    const sortBy = useProjectStore((state) => state.sortBy);
    const currentPage = useProjectStore((state) => state.currentPage);
    const itemPerPage = useProjectStore((state) => state.itemPerPage);
    const setSelectedProject = useProjectStore((state) => state.setSelectedProject);
    const selectedProject = useProjectStore((state) => state.selectedProject);
    const getFilteredProjects = useProjectStore((state) => state.getFilteredProjects);
    const setViewMode = useProjectStore((state) => state.setViewMode);
    const viewMode = useProjectStore((state) => state.viewMode);

    const projects = getPaginationProject();
    const totalProject = getFilteredProjects().length;
    const totalPages = Math.ceil(totalProject / itemPerPage);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        // Cambiar automáticamente a vista maximizada  para mostrar el mapa
        setViewMode("mixed");
    };

    return(
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Proyecto</th>
                    <th>Plan</th>
                    <th>Estado</th>
                    <th>Equipo</th>
                    <th>Item por vencer</th>
                </tr>
            </thead>

            <tbody>
                {projects && projects.map((project) => {
                    const incidents = countItemsByType(project.incidents || [], "incidents");
                    const rfi = countItemsByType(project.incidents || [], "RFI");
                    const task = countItemsByType(project.incidents || [], "task");
                    
                    const isSelected = selectedProject?._id === project._id;

                    return(
                        <tr 
                            key={project._id} 
                            onClick={() => handleProjectClick(project)} 
                            className={`${styles.row} ${isSelected ? styles.selected : ''}`}
                        >
                            <td>
                                <div className={styles.projectCell}>
                                    <div className={styles.projectPlaceholder}></div>
                                    <div className={styles.projectInfo}>
                                        <div className={styles.projectTitle}>
                                            {project.title}
                                            {project.verified && <span className={styles.verifiedIcon}>✓</span>}
                                        </div>
                                        <div className={styles.projectMeta}>
                                            <span className={styles.metaIcon}>🕒</span>
                                            {new Date(project.createdAt).toLocaleDateString()}
                                            <span className={styles.metaIcon}>↗</span>
                                            Actualizado
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <PlanBadge plan={project.projectPlanData?.plan} />
                            </td>
                            <td>
                                <StatusBadge status={project.status} />
                            </td>
                            <td>
                                <TeamAvatars users={project.users} maxDisplay={viewMode === "mixed" ? 3 : 5} />
                            </td>
                            <td>
                                <DueItems incidents={incidents} rfi={rfi} tasks={task} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}
