# 🧠 MEMORIA DEL PROYECTO: VISION PLANNER & STUDIO

> **Archivo de Contexto y Memoria Permanente**  
> *Creado el 23 de Noviembre de 2026 para preservar el historial, arquitectura, decisiones técnicas y estado de la app.*

---

## 📌 1. Visión y Propósito del Proyecto
**Vision Planner & Studio** es una aplicación web progresiva (PWA / Responsive) creada a medida para un artista del tatuaje, emprendedor e inversionista en Colombia. Su objetivo es unificar en una sola interfaz limpia y rápida la planificación de vida diaria y las metas financieras, artísticas y empresariales a mediano y largo plazo.

- **Usuario / Dueño**: Tatuador profesional e inversionista.
- **Moneda base**: Pesos Colombianos (COP).
- **Dispositivos de uso**: Computador de escritorio / portátil y Celular (acceso como app nativa instalada en pantalla de inicio).

---

## 🛠️ 2. Arquitectura Técnica y Despliegue

| Componente | Tecnología | Ubicación / Configuración |
| :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | `C:\Users\herej\.gemini\antigravity\scratch\planeacion` |
| **Estilos & UI** | Tailwind CSS + Lucide Icons | Dark mode moderno, acentos violeta/púrpura y tarjetas estilizadas |
| **Base de Datos** | Supabase (PostgreSQL) | URL: `https://qtynomsgpnncqpxssvjn.supabase.co` |
| **Control de Versiones** | Git + GitHub | Repo: `https://github.com/herejexxi-commits/vision-planner.git` (Rama: `main`) |
| **Hosting & CI/CD** | Render (Static Site) | Auto-deploy en cada `git push`. Build: `npm run build`, Publish: `dist` |

---

## 📂 3. Estructura de la Base de Datos (Supabase)

Las tablas utilizan `id TEXT PRIMARY KEY` para soportar identificadores universales legibles:

1. **`tasks`**:
   - Hábitos diarios, actividades semanales y operativas.
   - Campos: `id`, `title`, `description`, `category` (casa, negocio, salud, inversiones, metas, arte), `type` (daily, weekly, one_time), `priority` (alta, media, baja), `completed` (boolean), `last_completed_at`, `frequency_note`, `sort_order`.
2. **`goals`**:
   - Metas financieras, de equipamiento y de desarrollo personal.
   - Campos: `id`, `title`, `category`, `description`, `target_amount`, `current_amount`, `progress_percent`, `status`, `priority`, `action_steps` (JSONB con checklist de pasos), `notes`.
3. **`tattoo_projects`**:
   - Seguimiento exclusivo de clientes de tatuajes.
   - Campos: `id`, `client_name`, `project_name`, `placement`, `status` (boceto_diseno, cita_agendada, en_sesiones, finalizado), `price`, `deposit`, `sessions_total`, `sessions_done`, `notes`, `priority`.

---

## 📝 4. Datos Iniciales y Pilares de Vida Configurados

### A. Casa & Personal
- **Hábitos diarios**: Organizar la casa; Cocinar y comer saludable.

### B. Negocio de Tatuajes & Marketing
- **Hábitos diarios**: Revisar citas y confirmar clientes del día siguiente; Mantener impecable zona de pigmentos y cartuchos; Diseñar y personalizar piezas exclusivas; Dibujar y practicar técnica libre.
- **Marketing y operaciones**: Subir 2 Reels a la semana; Estrategia de recomendación boca a boca con clientes; Organizar galería de fotos del celular.

### C. Salud & Bienestar
- **Hábitos diarios**: Ir al gimnasio; Rutina de skin care y tratamientos faciales; Protector solar y cuidado del sol.

### D. Metas & Futuro (Inversiones & Expansión)
1. **Inversiones**: Invertir $5.000.000 COP al mes; estudiar formaciones de Sebastián Toro (Arena Alfa); desarrollar apps y métodos de análisis rápido. *(Hábito diario: revisar grupo Arena Alfa)*.
2. **Importaciones**: Comprar curso especializado ($2.000.000 COP) y preparar primer pedido comercial a China.
3. **Máquina Láser**: Comprar/importar láser de eliminación de tatuajes + capacitación y certificación para nuevo servicio de alto margen.
4. **Monitor Extra**: Comprar monitor de alta definición para trabajar con 2 proyectos y máxima fidelidad de color.
5. **Legal & Seguridad Social**: Regularizar Colpensiones, realizar traslado de EPS y organizar contabilidad tributaria.
6. **Arte**: Pintar 1 cuadro al óleo cada semana.

### E. Proyectos de Tatuajes Iniciales
- **Fabián**: Proyecto Espalda Completa (Gran escala).
- **Doris**: Proyecto Espalda.
- **Yohana**: Proyecto Brazo / Manga.
- **Proyectos de Autor**: Creación de piezas vanguardistas para impulsar portafolio.

---

## 🔧 5. Historial de Decisiones y Problemas Resueltos

1. **Permisos en PostgreSQL (`permission denied for table tasks`)**:
   - *Causa*: Las tablas creadas por el usuario `postgres` no tenían `GRANT` asignado para el rol `anon`.
   - *Solución*: Se ejecutaron permisos explícitos:
     ```sql
     GRANT USAGE ON SCHEMA public TO anon, authenticated;
     GRANT ALL ON TABLE tasks TO anon, authenticated;
     GRANT ALL ON TABLE goals TO anon, authenticated;
     GRANT ALL ON TABLE tattoo_projects TO anon, authenticated;
     ```
2. **Tipado de IDs (`UUID` vs `TEXT`)**:
   - Se descartó el tipo `UUID` rígido para permitir IDs como `task-1`, `goal-1`, `proj-1` y fechas timestamp sin errores de conversión en PostgreSQL.
3. **Manejo de Claves API (Legacy vs Publishable 2027)**:
   - Supabase anunció el retiro de legacy keys para inicios de 2027. Actualmente la app funciona con la clave `anon` (`eyJ...`) probada y estable, pero ya está preparada para usar `sb_publishable_...` cuando se requiera.
4. **Sincronización Híbrida**:
   - Implementado fallback en `LocalStorage`: la app funciona 100% offline y almacena localmente si no hay conexión.
   - Botones manuales en Ajustes para forzar **"Subir a Supabase"** y **"Descargar de Supabase"**, además de botón rápido de refresco (🔄) en el encabezado.

---

## 🗺️ 6. Próximas Mejoras Sugeridas (Roadmap Futuro)
- [ ] Galería de imágenes integrada para adjuntar fotos de referencia y tatuajes cicatrizados en cada proyecto.
- [ ] Notificaciones locales para recordar las rutinas de la mañana y confirmar clientes.
- [ ] Estadísticas visuales mensuales de hábitos cumplidos e ingresos por tatuajes.
- [ ] Migración formal a claves `sb_publishable_` antes de 2027.

---
*Para cualquier modificación futura, el asistente debe leer este archivo primero para mantener coherencia total con la base de datos y flujo de trabajo del usuario.*
