"use client";
import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import { useProjectStore } from "@/store/projectStore";
import styles from "@/styles/mapView.module.css"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export default function MapView () {
    const mapContainer = useRef(null)
    const map = useRef(null)
    const markersRef = useRef([])
    const popupsRef = useRef([])

    const projects = useProjectStore((state) => state.projects)
    const selected = useProjectStore((state) => state.selectedProject)
    const setSelectedProject = useProjectStore((state) => state.setSelectedProject)

    // Función para obtener color según el plan del proyecto
    const getPlanColor = (plan) => {
        const colors = {
            "big": "#FFC107",      
            "small": "#6C757D",    
            "advanced": "#D4854F"  
        }
        return colors[plan] || "#FFC107"
    }

    // Función para crear elemento personalizado del marcador
    const createMarkerElement = (project, isSelected = false) => {
        const el = document.createElement('div')
        el.className = styles.marker

        // Contenedor principal
        el.style.position = 'relative'
        el.style.width = '32px'
        el.style.height = '40px'
        el.style.cursor = 'pointer'

        // Forma de gota oscura
        const drop = document.createElement('div')
        drop.style.width = '100%'
        drop.style.height = '100%'
        drop.style.backgroundColor = '#333' 
        drop.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
        drop.style.position = 'relative'

        // Punto amarillo central
        const centerDot = document.createElement('div')
        centerDot.style.position = 'absolute'
        centerDot.style.top = '50%'
        centerDot.style.left = '50%'
        centerDot.style.transform = 'translate(-50%, -50%)'
        centerDot.style.width = '6px'
        centerDot.style.height = '6px'
        centerDot.style.backgroundColor = '#FFFF00' 
        centerDot.style.borderRadius = '50%'
        drop.appendChild(centerDot)

        el.appendChild(drop)

        // Etiqueta negra con texto blanco
        const label = document.createElement('div')
        label.style.position = 'absolute'
        label.style.top = '45px'
        label.style.left = '50%'
        label.style.transform = 'translateX(-50%)'
        label.style.backgroundColor = '#000'
        label.style.color = '#FFF'
        label.style.padding = '2px 4px'
        label.style.borderRadius = '3px'
        label.style.fontSize = '10px'
        label.style.whiteSpace = 'nowrap'
        label.textContent = project.title.length > 10 ? project.title.substring(0, 10) + '...' : project.title
        el.appendChild(label)

        // Efectos de selección
        if (isSelected) {
            drop.style.backgroundColor = '#FF4444'
            drop.style.boxShadow = '0 0 0 3px rgba(255, 0, 0, 0.3)'
        } else {
            drop.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'
        }

        el.style.transition = 'all 0.3s ease'

        return el
    }

    // Función para crear popup con información del proyecto
    const createPopup = (project) => {
        const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML(`
                <div style="font-family: Arial, sans-serif; max-width: 250px;">
                    <h3 style="margin: 0 0 8px 0; color: #212529; font-size: 14px;">${project.title}</h3>
                    <p style="margin: 4px 0; color: #6C757D; font-size: 12px;">
                        <strong>Plan:</strong> ${getPlanLabel(project.projectPlanData?.plan)}
                    </p>
                    <p style="margin: 4px 0; color: #6C757D; font-size: 12px;">
                        <strong>Estado:</strong> ${getStatusLabel(project.status)}
                    </p>
                    <p style="margin: 4px 0; color: #6C757D; font-size: 12px;">
                        <strong>Ubicación:</strong> ${project.city || 'N/A'}
                    </p>
                </div>
            `)
        return popup
    }

    const getPlanLabel = (plan) => {
        const planMap = {
            "big": "Premium",
            "small": "Pequeño",
            "advanced": "Avanzado"
        }
        return planMap[plan] || plan
    }

    const getStatusLabel = (status) => {
        const statusMap = {
            "active": "Activo",
            "inactive": "Inactivo",
            "suspended": "Suspendido",
            "completed": "Completado"
        }
        return statusMap[status] || status
    }

    // iniciamos  el mapa
    useEffect(() => {
        if(map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/satellite-v9",
            center: [-74.08175, 4.60971],
            zoom: 5,
        })
    }, [])

    // Agregar marcadores
    useEffect(() => {
        if(!map.current) return

        
        markersRef.current.forEach(({ marker }) => {
            marker.remove()
        })
        popupsRef.current.forEach(p => p.remove())
        markersRef.current = []
        popupsRef.current = []

        projects.forEach((project) => {
            const pos = project.position || project.location
            if(!pos) return

            const lng = pos.lng ?? pos.longitude
            const lat = pos.lat ?? pos.latitude

            // Crear elemento personalizado
            const el = createMarkerElement(project)

            // Crear marcador
            const marker = new mapboxgl.Marker({ element: el })
                .setLngLat([lng, lat])
                .addTo(map.current)

            // Crear popup
            const popup = createPopup(project)
            marker.setPopup(popup)

            // Eventos de interacción para mostrar popup y seleccionar proyecto
            marker.on("click", () => {
                setSelectedProject(project)
                popup.addTo(map.current)
            })

            el.addEventListener("mouseenter", () => {
                if (!selected || selected._id !== project._id) {
                    el.style.transform = "scale(1.2)"
                    popup.addTo(map.current)
                }
            })

            el.addEventListener("mouseleave", () => {
                if (!selected || selected._id !== project._id) {
                    el.style.transform = "scale(1)"
                    popup.remove()
                }
            })

            markersRef.current.push({ marker, element: el, projectId: project._id })
            popupsRef.current.push(popup)
        })

    }, [projects, setSelectedProject])

    // Actualizar marcadores cuando se selecciona uno
    useEffect(() => {
        if(!selected || !map.current) return

        const pos = selected.position || selected.location
        if(!pos) return

        const lng = pos.lng ?? pos.longitude
        const lat = pos.lat ?? pos.latitude

        // Centrar mapa en el proyecto seleccionado
        map.current.flyTo({
            center: [lng, lat],
            zoom: 10,
            duration: 1500
        })

        // Actualizar estilos de marcadores
        markersRef.current.forEach(({ marker, element, projectId }) => {
            const isSelected = projectId === selected._id
            const project = projects.find(p => p._id === projectId)

            if (isSelected && project) {
                // Actualizar estilos del elemento seleccionado
                element.style.backgroundColor = '#FF4444'
                element.style.width = '40px'
                element.style.height = '40px'
                element.style.border = '3px solid #FF0000'
                element.style.boxShadow = '0 0 0 3px rgba(255, 0, 0, 0.3)'
            } else if (project) {
                // Resetear marcador no seleccionado
                const color = getPlanColor(project.projectPlanData?.plan)
                element.style.backgroundColor = color
                element.style.width = '32px'
                element.style.height = '32px'
                element.style.border = '2px solid #FFF'
                element.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'
            }
        })

    }, [selected, projects])

    return (
        <div ref={mapContainer} className={styles.mapContainer}></div>
    )
}
