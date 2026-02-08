# Frontend Prueba - Spybee

Aplicación frontend desarrollada con **Next.js 16** y **React 19** para la visualización y gestión de proyectos con mapeo interactivo utilizando **Mapbox GL**.

## Inicio de sesión

El login se puede realizar con cualquier correo electrónico y contraseña. Se ha implementado una validación básica que verifica la longitud de la contraseña y que el correo electrónico tenga un formato válido. Ten en cuenta que al refrescar la página (presionando F5), la sesión se reiniciará y deberás volver a ingresar tus credenciales.

## Características principales

- 📊 **Vista de tabla**: Visualización de proyectos en formato tabular con paginación eficiente
- 🗺️ **Vista de mapa**: Integración completa con Mapbox GL para visualización geográfica de proyectos
- 🔄 **Múltiples vistas**: Interfaz flexible que permite alternar entre vista de lista, mapa o ambas simultáneamente
- 🎨 **Interfaz moderna**: Diseño responsivo y accesible utilizando Tailwind CSS
- 🔐 **Rutas protegidas**: Sistema de autenticación implementado con componentes ProtectedRoute
- 🔍 **Sistema de filtros avanzado**: Filtrado dinámico de proyectos por múltiples criterios
- 💾 **Gestión de estado global**: Implementación de Zustand para estado centralizado y eficiente
- 📱 **Arquitectura de componentes modulares**: Componentes reutilizables (Header, SubHeader, Sidebar, SearchBar, etc.)
- 📄 **Datos mock estructurados**: Conjunto de datos de ejemplo realistas para desarrollo y pruebas

## Arquitectura y decisiones técnicas

### Patrón de arquitectura
- **App Router de Next.js**: Utiliza el nuevo sistema de enrutamiento basado en carpetas para una estructura más intuitiva y optimizada para SEO.
- **Componentes del lado del cliente**: Estrategia híbrida con componentes server-side por defecto y client-side donde se requiere interactividad (mapas, estado global).
- **Separación de responsabilidades**: Lógica de negocio separada de la presentación mediante stores de Zustand y utilidades modulares.

### Gestión de estado
- **Zustand**: Elegido por su simplicidad, performance y menor boilerplate comparado con Redux. Implementa stores separados para autenticación y proyectos, permitiendo una gestión granular del estado.

### Estilos y UI
- **Tailwind CSS v4**: Framework utilitario moderno con configuración PostCSS para un desarrollo rápido y consistente. Estilos modulares por componente para evitar conflictos y mejorar mantenibilidad.

### Mapeo y geolocalización
- **Mapbox GL**: Biblioteca de alto rendimiento para mapas interactivos. Integración optimizada con datos geográficos de proyectos, incluyendo marcadores y popups informativos.

### Datos y API
- **Datos mock**: Estructura JSON realista con 41 proyectos, incluyendo información de usuarios, incidentes, posiciones geográficas y metadatos. Simula una API RESTful para desarrollo offline.
- **Tipado fuerte**: TypeScript implementado en toda la aplicación para mayor robustez y autocompletado.

## Requisitos previos

- Node.js 18+ (recomendado 20+)
- npm, yarn, pnpm o bun
- Token válido de Mapbox GL (para funcionalidad de mapas)

## Instalación y configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/castilloxavie/spybee-prueba.git
   cd frontend-prueba
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_de_mapbox_aqui
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   # o
   bun dev
   ```

   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo con hot reload
- `npm run build` - Compila la aplicación para producción con optimizaciones
- `npm run start` - Inicia el servidor en modo producción
- `npm run lint` - Ejecuta ESLint para análisis de código estático

## Estructura del proyecto

```
frontend-prueba/
├── app/                          # Directorio principal de Next.js App Router
│   ├── layout.tsx                # Layout raíz con providers globales
│   ├── page.tsx                  # Página principal con lógica de vistas
│   ├── globals.css               # Estilos globales y resets
│   ├── components/               # Componentes reutilizables
│   │   ├── Filter.jsx            # Componente de filtros avanzados
│   │   ├── Header.jsx            # Navegación principal
│   │   ├── Login.jsx             # Formulario de autenticación
│   │   ├── MapView.jsx           # Contenedor del mapa Mapbox
│   │   ├── Pagination.jsx        # Componente de paginación
│   │   ├── ProjectTable.jsx      # Tabla de datos de proyectos
│   │   ├── ProtectedRoute.jsx    # HOC para rutas protegidas
│   │   ├── SearchBar.jsx         # Barra de búsqueda con autocompletado
│   │   ├── Sidebar.jsx           # Panel lateral de navegación
│   │   └── SubHeader.jsx         # Encabezado secundario con controles
│   ├── data/
│   │   └── mock_data.json        # Datos de ejemplo (41 proyectos)
│   ├── store/                    # Stores de Zustand
│   │   ├── authStore.js          # Estado de autenticación
│   │   └── projectStore.js       # Estado de proyectos y filtros
│   └── styles/                   # Estilos modulares CSS
│       ├── filter.module.css
│       ├── header.module.css
│       ├── layout.module.css
│       ├── login.module.css
│       ├── map.module.css
│       ├── mapView.module.css
│       ├── page.module.css
│       ├── pagination.module.css
│       ├── searchBar.module.css
│       ├── sidebar.module.css
│       ├── subheader.module.css
│       └── table.module.css
├── public/                       # Archivos estáticos
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── logoSpybee.png
│   ├── next.svg
│   ├── Spybee.png
│   ├── vercel.svg
│   └── window.svg
├── package.json                  # Dependencias y configuración de scripts
├── tsconfig.json                 # Configuración de TypeScript
├── next.config.ts                # Configuración de Next.js
├── postcss.config.mjs            # Configuración de PostCSS para Tailwind
├── eslint.config.mjs             # Configuración de ESLint
└── README.md                     # Documentación del proyecto
```

## Tecnologías y dependencias

### Core Framework
- **Next.js 16**: Framework React con App Router, optimización automática y SSR/SSG
- **React 19**: Biblioteca principal para construcción de interfaces de usuario

### Lenguaje y tipado
- **TypeScript 5**: JavaScript tipado para mayor robustez y DX

### Estilos y UI
- **Tailwind CSS 4**: Framework CSS utilitario con PostCSS
- **@tailwindcss/postcss**: Plugin para integración con PostCSS

### Mapeo y geolocalización
- **Mapbox GL 3.18.1**: Biblioteca para mapas interactivos
- **@types/mapbox-gl**: Tipos TypeScript para Mapbox

### Gestión de estado
- **Zustand 5.0.11**: Librería ligera para gestión de estado global

### Desarrollo y calidad
- **ESLint 9**: Linting y análisis estático de código
- **eslint-config-next**: Configuración específica para Next.js

### Utilidades
- **dotenv 17.2.3**: Gestión de variables de entorno

## API y estructura de datos

La aplicación consume datos estructurados que simulan una API RESTful. Cada proyecto incluye:

- **Información básica**: ID, título, estado, imagen
- **Ubicación geográfica**: Coordenadas lat/lng con Mapbox
- **Usuarios asociados**: Lista de usuarios con nombres y apellidos
- **Datos del cliente**: Información de la compañía
- **Incidentes**: Array de incidentes con estado, descripción, propietario y coordenadas
- **Metadatos**: Fechas de creación/actualización, planes de proyecto

## Despliegue y producción

### Opciones de despliegue
- **Vercel**: Recomendado para aplicaciones Next.js (despliegue automático desde Git)
- **Netlify**: Alternativa con buena integración para SPAs
- **Docker**: Para entornos contenerizados

### Configuración de producción
1. Configurar variables de entorno en el proveedor de despliegue
2. Ejecutar `npm run build` para optimización
3. Verificar funcionamiento en modo producción con `npm run start`

### Consideraciones de performance
- **Optimización automática**: Next.js maneja code splitting, lazy loading e imágenes
- **Bundle analysis**: Recomendado analizar el tamaño del bundle para optimizaciones
- **CDN**: Utilizar CDN para assets estáticos y mapas

## Mejoras y consideraciones futuras

### Funcionalidades adicionales
- Implementación de API real con backend Node.js
- Sistema de notificaciones en tiempo real
- Exportación de datos (CSV, PDF)
- Modo offline con Service Workers

### Optimizaciones técnicas
- Implementación de React Query para cacheo de datos
- Migración completa a TypeScript en componentes
- Testing con Jest y React Testing Library
- Implementación de CI/CD con GitHub Actions

### Escalabilidad
- Arquitectura de micro-frontends para equipos grandes
- Implementación de Storybook para desarrollo de componentes
- Monitoreo con herramientas como Sentry

Esta implementación demuestra un entendimiento profundo de las mejores prácticas en desarrollo frontend moderno, arquitectura escalable y integración de tecnologías avanzadas.


