"use client";
import { useState } from "react";
import { useProjectStore } from "@/store/projectStore";
import styles from "../styles/sidebar.module.css";

//barras laterales con detalles del proyecto seleccionado, como cantidad de items por vencer, ubicación y equipo asignado
export default function Sidebar({ totalIncidents = 0, totalRFI = 0, totalTasks = 0 }) {
  const getFilteredProjects = useProjectStore((state) => state.getFilteredProjects);
  const selectedProject = useProjectStore((state) => state.selectedProject);
  const viewMode = useProjectStore((state) => state.viewMode);

  const projects = getFilteredProjects();
  const [activeTab, setActiveTab] = useState("general");

  // Calcular items por vencer y totales
  const getItemsData = () => {
    const now = new Date();
    const dueItems = { incidents: 0, rfi: 0, tasks: 0 };
    const totalItems = { incidents: 0, rfi: 0, tasks: 0 };

    projects.forEach(project => {
      if (project.incidents) {
        project.incidents.forEach(item => {
          if (item.item === "incidents") totalItems.incidents++;
          else if (item.item === "RFI") totalItems.rfi++;
          else if (item.item === "task") totalItems.tasks++;

          if (item.status === "active" && new Date(item.limitDate) > now) {
            if (item.item === "incidents") dueItems.incidents++;
            else if (item.item === "RFI") dueItems.rfi++;
            else if (item.item === "task") dueItems.tasks++;
          }
        });
      }
    });

    return { dueItems, totalItems };
  };

  const { dueItems, totalItems } = getItemsData();
  const totalDue = dueItems.incidents + dueItems.rfi + dueItems.tasks;

  // Simulando datos 
  const mockEvents = [
    { id: 1, project: "Proyecto A", type: "Incidencia", date: "2023-10-15", avatar: "yellow" },
    { id: 2, project: "Proyecto B", type: "RFI", date: "2023-10-14", avatar: "yellow" },
    { id: 3, project: "Proyecto C", type: "Tarea", date: "2023-10-13", avatar: "yellow" },
  ];

  if (!selectedProject) {
    return (
      <aside className={styles.sidebar}>
        <div className={styles.emptyState}>
          <p>Selecciona un proyecto para ver detalles</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        {/* Header */}
        <div className={styles.sidebarHeader}>
          <h2 className={styles.title}>Resumen</h2>
          <button className={styles.collapseBtn} aria-label="Colapsar sidebar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "general" ? styles.active : ""}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`${styles.tab} ${activeTab === "updates" ? styles.active : ""}`}
            onClick={() => setActiveTab("updates")}
          >
            Mis actualizaciones
          </button>
          <button className={styles.filterBtn} aria-label="Filtro">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
        </div>

        {activeTab === "general" && (
          <>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>🕒</span>
                <h4>Próximos a vencer</h4>
                <a href="#" className={styles.viewAll}>Ver todos</a>
              </div>
              <div className={styles.dueCards}>
                <div className={styles.dueCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardNumber}>{dueItems.incidents}</span>
                    <span className={styles.cardLabel}>Total Abiertos</span>
                  </div>
                  <div className={styles.cardDonut}>
                    <svg width="80" height="80" viewBox="0 0 36 36" className={styles.donutSvg}>
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#E0E0E0" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#FF6B6B" strokeWidth="3" strokeDasharray={`${totalIncidents > 0 ? (dueItems.incidents / totalIncidents) * 100 : 0}, 100`} strokeLinecap="round" />
                      <circle cx="18" cy="18" r="12" fill="white" />
                      <text x="18" y="20.35" textAnchor="middle" className={styles.donutNumber}>{dueItems.incidents}</text>
                    </svg>
                  </div>
                  <div className={styles.cardTitle}>Incidencias</div>
                </div>
                <div className={styles.dueCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardNumber}>{dueItems.rfi}</span>
                    <span className={styles.cardLabel}>Total Abiertos</span>
                  </div>
                  <div className={styles.cardDonut}>
                    <svg width="80" height="80" viewBox="0 0 36 36" className={styles.donutSvg}>
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#E0E0E0" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#FF6B6B" strokeWidth="3" strokeDasharray={`${totalItems.rfi > 0 ? (dueItems.rfi / totalItems.rfi) * 100 : 0}, 100`} strokeLinecap="round" />
                      <circle cx="18" cy="18" r="12" fill="white" />
                      <text x="18" y="20.35" textAnchor="middle" className={styles.donutNumber}>{dueItems.rfi}</text>
                    </svg>
                  </div>
                  <div className={styles.cardTitle}>RFI</div>
                </div>
                <div className={styles.dueCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardNumber}>{dueItems.tasks}</span>
                    <span className={styles.cardLabel}>Total Abiertos</span>
                  </div>
                  <div className={styles.cardDonut}>
                    <svg width="80" height="80" viewBox="0 0 36 36" className={styles.donutSvg}>
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#E0E0E0" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#FF6B6B" strokeWidth="3" strokeDasharray={`${totalTasks > 0 ? (dueItems.tasks / totalTasks) * 100 : 0}, 100`} strokeLinecap="round" />
                      <circle cx="18" cy="18" r="12" fill="white" />
                      <text x="18" y="20.35" textAnchor="middle" className={styles.donutNumber}>{dueItems.tasks}</text>
                    </svg>
                  </div>
                  <div className={styles.cardTitle}>Tareas</div>
                </div>
              </div>
            </div>

            {selectedProject.city && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Ubicación</h3>
                <p className={styles.city}>{selectedProject.city}</p>
              </div>
            )}

            {selectedProject.users && selectedProject.users.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Equipo</h3>
                <div className={styles.userList}>
                  {selectedProject.users.map((user, idx) => (
                    <div key={idx} className={styles.user}>
                      <span>{user.name} {user.lastName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "updates" && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Eventos Recientes</h3>
            <div className={styles.eventsList}>
              {mockEvents.map((event) => (
                <div key={event.id} className={styles.eventItem}>
                  <div className={styles.eventInfo}>
                    <div className={styles.eventTitle}>
                      {event.project} - {event.type}
                    </div>
                    <div className={styles.eventMeta}>
                      <span>🕒</span> {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={styles.eventAvatar} style={{ backgroundColor: "#FFD700" }}>
                    {event.project[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
