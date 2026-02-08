"use client";

import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import ProjectTable from "@/components/ProjectTable";
import Pagination from "@/components/Pagination";
import MapView from "@/components/MapView";
import Filter from "@/components/Filter";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useProjectStore } from "@/store/projectStore";
import { Project } from "./types";
import styles from "@/styles/page.module.css";

export default function Home() {
  const viewMode = useProjectStore((state) => state.viewMode);
  const getFilteredProjects = useProjectStore((state) => state.getFilteredProjects);

  // Calcular totales de items para el sidebar
  const calculateTotals = () => {
    const projects = getFilteredProjects();
    const totals = { incidents: 0, rfi: 0, tasks: 0 };

    projects.forEach((project: Project) => {
      if (project.incidents) {
        project.incidents.forEach(item => {
          if (item.item === "incidents") totals.incidents++;
          else if (item.item === "RFI") totals.rfi++;
          else if (item.item === "task") totals.tasks++;
        });
      }
    });

    return totals;
  };

  const totals = calculateTotals();

  return (
    <ProtectedRoute>
      <>
        <Header />
        <SubHeader />

        <main className={styles.main}>
          {/* Vista 1: Solo Lista */}
          {viewMode === "list" && (
            <div className={styles.listView}>
              <div className={styles.container}>
                <div className={styles.tableWrapper}>
                  <ProjectTable />
                  <Pagination />
                </div>
              </div>
            </div>
          )}

          {/* Vista 2: Mixta (Mapa + Tabla + Sidebar) */}
          {viewMode === "mixed" && (
            <div className={styles.mixedView}>
              <div className={styles.container}>
                <div className={styles.content}>
                  <div className={styles.mapSection}>
                    <MapView />
                  </div>
                  <div className={styles.tableSection}>
                    <ProjectTable />
                    <Pagination />
                  </div>
                </div>
                <div className={styles.sidebarSection}>
                  <Sidebar
                    totalIncidents={totals.incidents}
                    totalRFI={totals.rfi}
                    totalTasks={totals.tasks}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Vista 3: Solo Mapa */}
          {viewMode === "map" && (
            <div className={styles.mapOnlyView}>
              <div className={styles.container}>
                <MapView />
              </div>
            </div>
          )}
        </main>
      </>
    </ProtectedRoute>
  );
}
