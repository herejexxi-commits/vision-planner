-- ==========================================================
-- VISION PLANNER & ESTUDIO - ESQUEMA SUPABASE REVISADO
-- Copia y ejecuta este script completo en el SQL Editor de Supabase
-- ==========================================================

-- 1. Eliminar tablas previas si tenían incompatibilidad de tipos (id UUID)
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS goals CASCADE;
DROP TABLE IF EXISTS tattoo_projects CASCADE;

-- 2. TABLA DE TAREAS Y RUTINAS DIARIAS (ID como TEXT para compatibilidad total)
CREATE TABLE tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'daily',
    priority TEXT NOT NULL DEFAULT 'media',
    completed BOOLEAN DEFAULT false,
    last_completed_at TIMESTAMPTZ,
    frequency_note TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLA DE METAS Y OBJETIVOS A LARGO PLAZO
CREATE TABLE goals (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    target_amount NUMERIC(15,2) DEFAULT 0,
    current_amount NUMERIC(15,2) DEFAULT 0,
    progress_percent INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'en_progreso',
    priority TEXT NOT NULL DEFAULT 'alta',
    target_date DATE,
    action_steps JSONB DEFAULT '[]'::jsonb,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLA DE PROYECTOS DE TATUAJES
CREATE TABLE tattoo_projects (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    project_name TEXT NOT NULL,
    placement TEXT,
    status TEXT NOT NULL DEFAULT 'boceto_diseno',
    price NUMERIC(12,2) DEFAULT 0,
    deposit NUMERIC(12,2) DEFAULT 0,
    sessions_total INT DEFAULT 1,
    sessions_done INT DEFAULT 0,
    next_session_date DATE,
    notes TEXT,
    priority TEXT NOT NULL DEFAULT 'alta',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. POLÍTICAS RLS (Row Level Security)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE tattoo_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir todo en tasks" ON tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo en goals" ON goals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo en tattoo_projects" ON tattoo_projects FOR ALL USING (true) WITH CHECK (true);

-- 6. DATOS INICIALES (Borrador del usuario)
INSERT INTO tasks (id, title, description, category, type, priority, frequency_note, sort_order) VALUES
('task-1', 'Organizar la casa', 'Mantener los espacios limpios y organizados para mayor claridad mental', 'casa', 'daily', 'alta', 'Todos los días', 1),
('task-2', 'Cocinar y comer saludable', 'Preparar comidas balanceadas y nutritivas', 'casa', 'daily', 'alta', 'Todos los días', 2),
('task-3', 'Revisar clientes y confirmar día siguiente', 'Contactar citas para confirmación y resolver dudas previas', 'negocio', 'daily', 'alta', 'Todos los días', 3),
('task-4', 'Mantener ordenado zona de pigmentos y cartuchos', 'Esterilización, bioseguridad, stock de insumos', 'negocio', 'daily', 'alta', 'Todos los días', 4),
('task-5', 'Diseñar y personalizar tatuajes lo mayor posible', 'Dedicación a cada pieza exclusiva para el cliente', 'negocio', 'daily', 'alta', 'Todos los días', 5),
('task-6', 'Dibujar y aprender', 'Estudio de anatomía, técnicas, sombras y estilos', 'negocio', 'daily', 'media', 'Todos los días', 6),
('task-7', 'Subir reel a redes sociales (2 por semana)', 'Contenido de alta calidad mostrando procesos y resultados', 'negocio', 'weekly', 'alta', '2 a la semana', 7),
('task-8', 'Estrategia de recomendación con clientes', 'Buscar la forma de que cada cliente recomiende con sus conocidos', 'negocio', 'weekly', 'media', 'Constante', 8),
('task-9', 'Organizar fotos de la galería del celular', 'Separar fotos de tatuajes, antes/después y portfolio limpio', 'negocio', 'weekly', 'media', '1-2 veces por semana', 9),
('task-10', 'Ir al gimnasio', 'Entrenamiento de fuerza y acondicionamiento físico', 'salud', 'daily', 'alta', 'Todos los días / Lunes a Sábado', 10),
('task-11', 'Limpieza y tratamientos faciales', 'Cuidado de la piel diario', 'salud', 'daily', 'media', 'Mañana y noche', 11),
('task-12', 'Protector solar y cuidado del sol', 'Aplicar protector antes de salir y reaplicar', 'salud', 'daily', 'alta', 'Todos los días', 12),
('task-13', 'Revisar grupo de Arena Alfa y Sebastián Toro', 'Análisis de mercado, noticias y oportunidades', 'inversiones', 'daily', 'alta', 'Todos los días', 13);

INSERT INTO goals (id, title, category, description, target_amount, current_amount, progress_percent, status, priority, notes) VALUES
('goal-1', 'Inversiones: Invertir 5 Millones al mes', 'inversiones', 'Inversión recurrente mensual en activos sólidos. Estudiar cursos de Sebastián Toro (Arena Alfa)', 5000000, 1500000, 30, 'en_progreso', 'alta', 'Crear apps/métodos para agilizar el análisis'),
('goal-2', 'Importaciones desde China y Curso', 'importaciones', 'Comprar curso de importaciones ($2.000.000 COP) y realizar el primer pedido a China', 2000000, 500000, 25, 'en_progreso', 'alta', 'Abrir nueva fuente de ingresos por comercio'),
('goal-3', 'Adquirir Láser de Borrado de Tatuajes + Capacitación', 'negocio', 'Comprar o importar máquina láser de eliminación de tatuajes y hacer curso certificado para ofrecer nuevo servicio', 15000000, 2000000, 15, 'en_progreso', 'alta', 'Expansión de negocio de alto margen'),
('goal-4', 'Comprar Monitor Extra de Alta Definición', 'negocio', 'Monitor adicional para trabajar en 2 proyectos a la vez y ver referencias en máxima definición', 1200000, 400000, 35, 'en_progreso', 'alta', 'Aumenta productividad y agilidad de diseño'),
('goal-5', 'Organizar Contabilidad, Pensión y Salud', 'salud', 'Regularizar Colpensiones, cambiar de EPS y estructurar contabilidad tributaria', 0, 0, 20, 'en_progreso', 'alta', 'Prioridad de tranquilidad personal y formalidad'),
('goal-6', 'Realizar un cuadro en óleo semanal', 'arte', 'Pintar una obra completa al óleo cada semana para perfeccionar arte y técnica', 0, 0, 10, 'en_progreso', 'media', '1 cuadro semanal');

INSERT INTO tattoo_projects (id, client_name, project_name, placement, status, priority, notes) VALUES
('proj-1', 'Fabián', 'Proyecto Espalda Completa', 'Espalda', 'boceto_diseno', 'alta', 'Diseño personalizado de gran escala'),
('proj-2', 'Doris', 'Proyecto Espalda', 'Espalda', 'boceto_diseno', 'alta', 'Definir concepto y primeras líneas'),
('proj-3', 'Yohana', 'Proyecto Manga/Brazo', 'Brazo', 'boceto_diseno', 'alta', 'Composición y armonía anatómica'),
('proj-4', 'Nuevos Proyectos', 'Desarrollo de piezas de autor', 'Varios', 'boceto_diseno', 'media', 'Pensar y diseñar conceptos que impulsen arte y atraigan nuevos clientes élite');
