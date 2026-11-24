-- ==========================================================
-- VISION PLANNER & ESTUDIO - ESQUEMA SUPABASE
-- Ejecutar en el SQL Editor de tu proyecto en Supabase
-- ==========================================================

-- 1. Habilitar extensión UUID si no existe
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA DE TAREAS Y RUTINAS DIARIAS
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('casa', 'negocio', 'salud', 'inversiones', 'metas', 'arte')),
    type TEXT NOT NULL DEFAULT 'daily' CHECK (type IN ('daily', 'weekly', 'one_time')),
    priority TEXT NOT NULL DEFAULT 'media' CHECK (priority IN ('alta', 'media', 'baja')),
    completed BOOLEAN DEFAULT false,
    last_completed_at TIMESTAMPTZ,
    frequency_note TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLA DE METAS Y OBJETIVOS A LARGO PLAZO
CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('inversiones', 'importaciones', 'negocio', 'salud', 'personal', 'arte')),
    description TEXT,
    target_amount NUMERIC(15,2),
    current_amount NUMERIC(15,2) DEFAULT 0,
    progress_percent INT DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
    status TEXT NOT NULL DEFAULT 'en_progreso' CHECK (status IN ('pendiente', 'en_progreso', 'completado')),
    priority TEXT NOT NULL DEFAULT 'alta' CHECK (priority IN ('alta', 'media', 'baja')),
    target_date DATE,
    action_steps JSONB DEFAULT '[]'::jsonb,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLA DE PROYECTOS DE TATUAJES
CREATE TABLE IF NOT EXISTS tattoo_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    project_name TEXT NOT NULL,
    placement TEXT,
    status TEXT NOT NULL DEFAULT 'boceto_diseno' CHECK (status IN ('boceto_diseno', 'cita_agendada', 'en_sesiones', 'finalizado')),
    price NUMERIC(12,2) DEFAULT 0,
    deposit NUMERIC(12,2) DEFAULT 0,
    sessions_total INT DEFAULT 1,
    sessions_done INT DEFAULT 0,
    next_session_date DATE,
    notes TEXT,
    priority TEXT NOT NULL DEFAULT 'alta' CHECK (priority IN ('alta', 'media', 'baja')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. POLÍTICAS RLS (Row Level Security) ABIERTAS O PÚBLICAS PARA INICIO RÁPIDO
-- Si usas autenticación anónima o clave anon directa:
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE tattoo_projects ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso público con anon key para lectura y escritura rápida
CREATE POLICY "Permitir todo en tasks" ON tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo en goals" ON goals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo en tattoo_projects" ON tattoo_projects FOR ALL USING (true) WITH CHECK (true);

-- 6. DATOS INICIALES (Borrador inicial del usuario precargado)
INSERT INTO tasks (title, description, category, type, priority, frequency_note, sort_order) VALUES
-- Casa
('Organizar la casa', 'Mantener los espacios limpios y organizados para mayor claridad mental', 'casa', 'daily', 'alta', 'Todos los días', 1),
('Cocinar y comer saludable', 'Preparar comidas balanceadas y nutritivas', 'casa', 'daily', 'alta', 'Todos los días', 2),

-- Negocio
('Revisar clientes y confirmar día siguiente', 'Contactar citas para confirmación y resolver dudas previas', 'negocio', 'daily', 'alta', 'Todos los días', 3),
('Mantener ordenado zona de pigmentos y cartuchos', 'Esterilización, bioseguridad, stock de insumos', 'negocio', 'daily', 'alta', 'Todos los días', 4),
('Diseñar y personalizar tatuajes lo mayor posible', 'Dedicación a cada pieza exclusiva para el cliente', 'negocio', 'daily', 'alta', 'Todos los días', 5),
('Dibujar y aprender', 'Estudio de anatomía, técnicas, sombras y estilos', 'negocio', 'daily', 'media', 'Todos los días', 6),
('Subir reel a redes sociales (2 por semana)', 'Contenido de alta calidad mostrando procesos y resultados', 'negocio', 'weekly', 'alta', '2 a la semana', 7),
('Estrategia de recomendación con clientes', 'Buscar la forma de que cada cliente recomiende con sus conocidos', 'negocio', 'weekly', 'media', 'Constante', 8),
('Organizar fotos de la galería del celular', 'Separar fotos de tatuajes, antes/después y portfolio limpio', 'negocio', 'weekly', 'media', '1-2 veces por semana', 9),

-- Salud y Bienestar
('Ir al gimnasio', 'Entrenamiento de fuerza y acondicionamiento físico', 'salud', 'daily', 'alta', 'Todos los días / Lunes a Sábado', 10),
('Limpieza y tratamientos faciales', 'Cuidado de la piel diario', 'salud', 'daily', 'media', 'Mañana y noche', 11),
('Protector solar y cuidado del sol', 'Aplicar protector antes de salir y reaplicar', 'salud', 'daily', 'alta', 'Todos los días', 12),

-- Finanzas / Diario
('Revisar grupo de Arena Alfa y Sebastián Toro', 'Análisis de mercado, noticias y oportunidades', 'inversiones', 'daily', 'alta', 'Todos los días', 13);

-- Metas y Objetivos
INSERT INTO goals (title, category, description, target_amount, current_amount, progress_percent, status, priority, notes) VALUES
('Organizar Contabilidad, Pensión y Salud', 'salud', 'Regularizar Colpensiones, cambiar de EPS y estructurar contabilidad tributaria', NULL, NULL, 15, 'en_progreso', 'alta', 'Prioridad de tranquilidad personal y formalidad'),
('Inversiones: Invertir 5 Millones al mes', 'inversiones', 'Inversión recurrente mensual en activos sólidos. Estudiar cursos de Sebastián Toro (Arena Alfa)', 5000000, 0, 20, 'en_progreso', 'alta', 'Crear apps/métodos para agilizar el análisis'),
('Importaciones desde China y Curso', 'importaciones', 'Comprar curso de importaciones ($2.000.000 COP) y realizar el primer pedido a China', 2000000, 0, 10, 'en_progreso', 'alta', 'Abrir nueva fuente de ingresos por comercio'),
('Realizar un cuadro en óleo semanal', 'arte', 'Pintar una obra completa al óleo cada semana para perfeccionar arte y técnica', NULL, NULL, 25, 'en_progreso', 'media', '1 cuadro semanal'),
('Adquirir Láser de Borrado de Tatuajes + Capacitación', 'negocio', 'Comprar o importar máquina láser de eliminación de tatuajes y hacer curso certificado para ofrecer nuevo servicio', NULL, NULL, 5, 'pendiente', 'alta', 'Expansión de negocio de alto margen'),
('Comprar Monitor Extra de Alta Definición', 'negocio', 'Monitor adicional para trabajar en 2 proyectos a la vez y ver referencias en máxima definición', 1200000, 0, 10, 'pendiente', 'alta', 'Aumenta productividad y agilidad de diseño');

-- Proyectos iniciales de Tatuajes
INSERT INTO tattoo_projects (client_name, project_name, placement, status, priority, notes) VALUES
('Fabián', 'Proyecto Espalda Completa', 'Espalda', 'boceto_diseno', 'alta', 'Diseño personalizado de gran escala'),
('Doris', 'Proyecto Espalda', 'Espalda', 'boceto_diseno', 'alta', 'Definir concepto y primeras líneas'),
('Yohana', 'Proyecto Manga/Brazo', 'Brazo', 'boceto_diseno', 'alta', 'Composición y armonía anatómica'),
('Nuevos Proyectos', 'Desarrollo de piezas de autor', 'Varios', 'boceto_diseno', 'media', 'Pensar y diseñar conceptos que impulsen arte y atraigan nuevos clientes élite');
