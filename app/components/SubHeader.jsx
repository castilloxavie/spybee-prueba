"use client"
import { useState } from "react";
import { useProjectStore } from "../store/projectStore";
import styles from "../styles/subheader.module.css";
import filterStyles from "../styles/filter.module.css";

// subencabesado
export default function SubHeader() {
  const viewMode = useProjectStore((state) => state.viewMode);
  const setViewMode = useProjectStore((state) => state.setViewMode);
  const searchTerm = useProjectStore((state) => state.searchTerm);
  const getFilteredProjects = useProjectStore((state) => state.getFilteredProjects);
  const setSearchTerm = useProjectStore((state) => state.setSearchTerm);
  const sortBy = useProjectStore((state) => state.sortBy);
  const setSortBy = useProjectStore((state) => state.setSortBy);

  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortOption = (sortOption) => {
    setSortBy(sortOption);
    setShowSortDropdown(false);
  };

  const totalProjects = getFilteredProjects().length;

  // Iconos para los botones de vista y filtro(svg)
  const FilterIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="6" y1="12" x2="18" y2="12"></line>
      <line x1="9" y1="18" x2="15" y2="18"></line>
    </svg>
  );

  // Iconos para los botones de vista(svg)
  const ListIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="5" cy="7" r="1.5"></circle>
      <line x1="10" y1="6" x2="20" y2="6"></line>
      <circle cx="5" cy="12" r="1.5"></circle>
      <line x1="10" y1="11" x2="20" y2="11"></line>
      <circle cx="5" cy="17" r="1.5"></circle>
      <line x1="10" y1="16" x2="20" y2="16"></line>
    </svg>
  );

  // Icuno de maximizar para vista de cuadricula(svg)
  const GridIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  );

  // Icono de mapa(svg)
  const MapIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  return (
    <div className={styles.subHeader}>
      <div className={styles.subHeaderContent}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Mis proyectos</h1>
          <span className={styles.counter}>{totalProjects} Proyectos</span>
        </div>

        <div className={styles.actionsSection}>
          <div className={styles.viewSelector}>
            <div style={{ position: 'relative' }}>
              <button
                className={`${styles.viewButton} ${sortBy !== "name" ? styles.active : ""}`}
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                aria-label="Filtro"
                title="Filtro"
              >
                <FilterIcon />
              </button>
              
              <div className={`${filterStyles.dropdownContent} ${showSortDropdown ? filterStyles.show : ''}`} style={{ position: 'absolute', top: '100%', left: 0, marginTop: '4px', minWidth: '220px', zIndex: 1000 }}>
                <button
                  className={`${filterStyles.dropdownOption} ${sortBy === 'name' ? filterStyles.active : ''}`}
                  onClick={() => handleSortOption('name')}
                >
                  Orden alfabetico
                </button>
                <button
                  className={`${filterStyles.dropdownOption} ${sortBy === 'incidents' ? filterStyles.active : ''}`}
                  onClick={() => handleSortOption('incidents')}
                >
                  Numero de Incidencias
                </button>
                <button
                  className={`${filterStyles.dropdownOption} ${sortBy === 'rfi' ? filterStyles.active : ''}`}
                  onClick={() => handleSortOption('rfi')}
                >
                  Numero de RFI
                </button>
                <button
                  className={`${filterStyles.dropdownOption} ${sortBy === 'tasks' ? filterStyles.active : ''}`}
                  onClick={() => handleSortOption('tasks')}
                >
                  Numero de Tareas
                </button>
              </div>
            </div>

            <button
              className={`${styles.viewButton} ${viewMode === "list" ? styles.active : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="Vista de lista"
              title="Vista de lista"
            >
              <ListIcon />
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === "mixed" ? styles.active : ""}`}
              onClick={() => setViewMode("mixed")}
              aria-label="Vista de cuadricula"
              title="Vista de cuadricula"
            >
              <GridIcon />
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === "map" ? styles.active : ""}`}
              onClick={() => setViewMode("map")}
              aria-label="Vista de mapa"
              title="Vista de mapa"
            >
              <MapIcon />
            </button>
          </div>

          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
              aria-label="Buscar proyecto"
            />
            <div className={styles.searchIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>

          <button className={styles.createButton}>
            + Crear proyecto
          </button>
        </div>
      </div>
    </div>
  );
}
