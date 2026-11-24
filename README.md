# Vision Planner & Estudio (PC y Celular) 🚀

Aplicación web progresiva (PWA / Responsive) diseñada para planear tu futuro personal, profesional, financiero y artístico, optimizada para su uso tanto en computadores como en teléfonos móviles.

---

## 🌟 Características Principales

1. **🌅 Mi Día (Dashboard Diario)**:
   - Hábitos de **Casa** (Organizar la casa, cocinar y comer saludable).
   - Tareas diarias de **Negocio** (Revisar citas de mañana, ordenar pigmentos y agujas, diseñar y personalizar, dibujar y aprender).
   - Rutinas de **Salud y Bienestar** (Gimnasio, skincare facial, protector solar).
   - Finanzas diarias (Seguimiento a Arena Alfa y Sebastián Toro).
   - Botón de **"Nuevo Día"** que desmarca los hábitos diarios para la siguiente jornada.
   - Animación de celebración con confeti al completar el 100% del día.

2. **🎯 Metas & Visión a Futuro**:
   - Inversiones ($5.000.000 COP al mes, desarrollo de apps de análisis).
   - Importaciones desde China (Curso de $2.000.000 y primer pedido).
   - Adquisición de máquina láser de borrado de tatuajes + capacitación y certificación.
   - Compra de monitor extra de alta definición.
   - Regularización de contabilidad, pensión (Colpensiones) y salud (cambio de EPS).
   - 1 cuadro al óleo por semana.
   - Seguimiento con barras de progreso, montos en dinero y checklist interactivo por cada meta.

3. **💉 Proyectos de Tatuajes & Clientes**:
   - Seguimiento individualizado de clientes: **Fabián (Espalda)**, **Doris (Espalda)**, **Yohana (Brazo)** y proyectos de autor.
   - Pipeline de estados: *Boceto / Diseño*, *Cita Agendada*, *En Sesiones*, *Finalizado*.
   - Control financiero: Precio pactado, abono inicial y saldo pendiente automático.
   - Contador visual de sesiones (ej: 1/4 sesiones completadas con botón de avance rápido).

4. **📋 Todas las Actividades**:
   - Filtros por área, prioridad (Alta 🔴, Media 🟡, Baja 🟢) y frecuencia (Diaria, Semanal, Puntual).
   - Cambio rápido de prioridad con 1 solo click.

5. **☁️ Sincronización Supabase & Modo Local**:
   - Funciona de forma 100% offline/local gracias a su fallback de `LocalStorage`.
   - Conexión directa a Supabase con tu URL y Anon Key (desde la interfaz en "Ajustes" o mediante variables `.env`).
   - Opción para exportar e importar copias de seguridad en formato JSON.

---

## 🛠️ Cómo Ejecutar en Local

```bash
# Instalar dependencias (ya instaladas)
npm install

# Iniciar servidor de desarrollo local
npm run dev
```

Abre en tu navegador la URL que indique la consola (usualmente `http://localhost:3000`).

---

## 🚀 Despliegue en Render

1. Sube este repositorio a tu GitHub o GitLab.
2. Entra a tu cuenta de **[Render](https://dashboard.render.com/)**.
3. Haz click en **New +** y selecciona **Static Site**.
4. Conecta tu repositorio.
5. Configura los parámetros:
   - **Name**: `vision-planner` (o el nombre que elijas)
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
6. En la sección **Environment Variables**, puedes agregar (opcional):
   - `VITE_SUPABASE_URL`: Tu URL de proyecto Supabase
   - `VITE_SUPABASE_ANON_KEY`: Tu Anon Key pública de Supabase
7. Haz click en **Create Static Site**. ¡Estará online en menos de 2 minutos!

---

## 🗄️ Conexión con Supabase

1. Entra a tu proyecto en **Supabase**.
2. Ve al menú lateral **SQL Editor**.
3. Abre el archivo `supabase_schema.sql` que creamos en este proyecto, copia todo su contenido y pégalo en el editor de Supabase.
4. Haz click en **Run**. Esto creará automáticamente las tablas `tasks`, `goals` y `tattoo_projects` con tus datos iniciales ya cargados y sus permisos RLS.
5. Ve a **Project Settings > API**, copia la **Project URL** y la **anon public key**.
6. En tu app, toca el ícono de la nube / **Ajustes** y pega ambas claves. ¡Tus datos estarán sincronizados en tiempo real entre tu computador y tu celular!
