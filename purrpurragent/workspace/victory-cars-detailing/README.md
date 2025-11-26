# Victory Cars Detailing - Landing Page

Este proyecto es una landing page moderna creada para Victory Cars Detailing, una empresa especializada en el cuidado y estética automotriz.

## ✨ Características

- **Framework Moderno**: Construido con [Next.js](https://nextjs.org/) (App Router) para un rendimiento óptimo y una excelente experiencia de desarrollo.
- **Styling con Tailwind CSS**: Diseño responsivo y personalizable gracias a [Tailwind CSS](https://tailwindcss.com/).
- **Componentes Modulares**: Estructura organizada en componentes reutilizables para facilitar el mantenimiento.
- **Contenido Basado en la Marca**: El diseño, los colores y los textos están inspirados en la identidad visual de la empresa.

## 🚀 Cómo Empezar

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

### Instalación

1. Clona el repositorio (o descarga los archivos).
2. Navega al directorio del proyecto:
   ```bash
   cd victory-cars-detailing
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

### Ejecutar el Servidor de Desarrollo

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la página.

## 📂 Estructura del Proyecto

El código fuente se encuentra principalmente en el directorio `app` y `components`.

- **`app/page.tsx`**: Es el punto de entrada principal que ensambla todos los componentes de la landing page.
- **`app/layout.tsx`**: Es la plantilla principal de la aplicación, donde se definen metadatos y fuentes.
- **`app/globals.css`**: Contiene los estilos base de Tailwind CSS.
- **`components/`**: Este directorio contiene todos los componentes modulares:
  - `Header.tsx`: La barra de navegación superior.
  - `Hero.tsx`: La sección principal de bienvenida.
  - `Services.tsx`: La cuadrícula que muestra los servicios ofrecidos.
  - `About.tsx`: Una breve sección sobre la empresa.
  - `Contact.tsx`: La sección de contacto con el mapa de ubicación.
  - `Footer.tsx`: El pie de página.
- **`tailwind.config.ts`**: Archivo de configuración para personalizar Tailwind CSS, incluyendo la paleta de colores de la marca.

¡Gracias por revisar el proyecto!