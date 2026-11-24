export const initialTasks = [
  // Casa
  {
    id: 'task-1',
    title: 'Organizar la casa',
    description: 'Mantener los espacios limpios y ordenados para mayor claridad mental y bienestar',
    category: 'casa',
    type: 'daily',
    priority: 'alta',
    completed: false,
    frequency_note: 'Todos los días',
    sort_order: 1
  },
  {
    id: 'task-2',
    title: 'Cocinar y comer saludable',
    description: 'Preparar comidas balanceadas, hidratarse bien y cuidar la nutrición',
    category: 'casa',
    type: 'daily',
    priority: 'alta',
    completed: false,
    frequency_note: 'Todos los días',
    sort_order: 2
  },

  // Negocio - Tareas Diarias
  {
    id: 'task-3',
    title: 'Revisar clientes y confirmar día siguiente',
    description: 'Contactar a los clientes agendados, confirmar hora y enviar recomendaciones previas',
    category: 'negocio',
    type: 'daily',
    priority: 'alta',
    completed: false,
    frequency_note: 'Todos los días',
    sort_order: 3
  },
  {
    id: 'task-4',
    title: 'Mantener ordenado zona de pigmentos y cartuchos',
    description: 'Esterilización, bioseguridad, inventario de agujas, tintas y campo de trabajo impecable',
    category: 'negocio',
    type: 'daily',
    priority: 'alta',
    completed: false,
    frequency_note: 'Todos los días',
    sort_order: 4
  },
  {
    id: 'task-5',
    title: 'Diseñar y personalizar tatuajes lo mayor posible',
    description: 'Dedicar tiempo a componer piezas únicas y adaptar al cuerpo del cliente',
    category: 'negocio',
    type: 'daily',
    priority: 'alta',
    completed: false,
    frequency_note: 'Todos los días',
    sort_order: 5
  },
  {
    id: 'task-6',
    title: 'Dibujar y aprender',
    description: 'Práctica libre, anatomía, nuevos estilos gráficos y técnicas avanzadas',
    category: 'negocio',
    type: 'daily',
    priority: 'media',
    completed: false,
    frequency_note: 'Todos los días',
    sort_order: 6
  },

  // Negocio - Marketing & Operaciones
  {
    id: 'task-7',
    title: 'Subir Reel a Instagram / TikTok (2 por semana)',
    description: 'Procesos de tatuaje, antes/después, cicatrizados y contenido educativo o de impacto',
    category: 'negocio',
    type: 'weekly',
    priority: 'alta',
    completed: false,
    frequency_note: '2 a la semana',
    sort_order: 7
  },
  {
    id: 'task-8',
    title: 'Estrategia de recomendación boca a boca',
    description: 'Incentivar que cada cliente que termine su tatuaje comparta en redes o recomiende con amigos',
    category: 'negocio',
    type: 'weekly',
    priority: 'media',
    completed: false,
    frequency_note: 'Continuo',
    sort_order: 8
  },
  {
    id: 'task-9',
    title: 'Organizar fotos de la galería del celular',
    description: 'Clasificar fotos de trabajos, editar portafolio y respaldar en la nube',
    category: 'negocio',
    type: 'weekly',
    priority: 'media',
    completed: false,
    frequency_note: '1-2 veces por semana',
    sort_order: 9
  },

  // Salud y Bienestar
  {
    id: 'task-10',
    title: 'Ir al gimnasio',
    description: 'Entrenamiento de fuerza, resistencia y salud postural (clave para tatuadores)',
    category: 'salud',
    type: 'daily',
    priority: 'alta',
    completed: false,
    frequency_note: 'Lunes a Sábado',
    sort_order: 10
  },
  {
    id: 'task-11',
    title: 'Limpieza y tratamientos faciales',
    description: 'Rutina de skin care de día y de noche',
    category: 'salud',
    type: 'daily',
    priority: 'media',
    completed: false,
    frequency_note: 'Mañana y Noche',
    sort_order: 11
  },
  {
    id: 'task-12',
    title: 'Protector solar y cuidarme del sol',
    description: 'Aplicación matutina y reaplicación para protección de la piel',
    category: 'salud',
    type: 'daily',
    priority: 'alta',
    completed: false,
    frequency_note: 'Todos los días',
    sort_order: 12
  },

  // Inversiones - Tarea Diaria
  {
    id: 'task-13',
    title: 'Revisar grupo de Arena Alfa y Sebastián Toro',
    description: 'Seguimiento a análisis de mercado financiero, noticias y tesis de inversión',
    category: 'inversiones',
    type: 'daily',
    priority: 'alta',
    completed: false,
    frequency_note: 'Todos los días',
    sort_order: 13
  }
];

export const initialGoals = [
  {
    id: 'goal-1',
    title: 'Inversiones: Invertir $5 Millones al mes',
    category: 'inversiones',
    description: 'Mantener el ritmo de inversión mensual en activos que generen rentabilidad y valor. Aprovechar y aplicar los cursos de Sebastián Toro (Arena Alfa).',
    target_amount: 5000000,
    current_amount: 1500000,
    progress_percent: 30,
    status: 'en_progreso',
    priority: 'alta',
    notes: 'Objetivo: Crear apps y métodos propios para agilizar el análisis de acciones e inversiones.',
    action_steps: [
      { id: '1', text: 'Revisar tesis semanal en Arena Alfa', done: true },
      { id: '2', text: 'Definir asignación de los 5M este mes', done: false },
      { id: '3', text: 'Desarrollar plantilla o app de análisis rápido', done: false }
    ]
  },
  {
    id: 'goal-2',
    title: 'Importaciones de China & Curso',
    category: 'importaciones',
    description: 'Comprar el curso especializado en importaciones ($2.000.000 COP) y preparar el primer pedido comercial desde China.',
    target_amount: 2000000,
    current_amount: 500000,
    progress_percent: 25,
    status: 'en_progreso',
    priority: 'alta',
    notes: 'Nueva línea de negocio para diversificar ingresos.',
    action_steps: [
      { id: '1', text: 'Ahorrar los 2 millones para el curso', done: false },
      { id: '2', text: 'Estudiar nichos y productos con alta rotación', done: false },
      { id: '3', text: 'Contactar proveedores confiables y cotizar flete', done: false }
    ]
  },
  {
    id: 'goal-3',
    title: 'Comprar Láser para Borrado de Tatuajes + Capacitación',
    category: 'negocio',
    description: 'Adquirir o importar equipo láser especializado en eliminación y aclarado de tatuajes, y certificarse para expandir el estudio.',
    target_amount: 15000000,
    current_amount: 2000000,
    progress_percent: 15,
    status: 'en_progreso',
    priority: 'alta',
    notes: 'Servicio de alta demanda y excelente complemento para cover-ups y eliminaciones.',
    action_steps: [
      { id: '1', text: 'Investigar especificaciones de láseres (Nd:YAG Q-Switched/Picosegundos)', done: true },
      { id: '2', text: 'Cotizar importación directa vs compra nacional', done: false },
      { id: '3', text: 'Agendar curso de capacitación y certificación sanitaria', done: false }
    ]
  },
  {
    id: 'goal-4',
    title: 'Comprar Monitor Extra de Alta Definición',
    category: 'negocio',
    description: 'Pantalla adicional para agilizar el trabajo, ver fotos en alta definición y trabajar en 2 proyectos de diseño a la vez.',
    target_amount: 1200000,
    current_amount: 400000,
    progress_percent: 35,
    status: 'en_progreso',
    priority: 'alta',
    notes: 'Aumentará la velocidad de diseño un 50%.',
    action_steps: [
      { id: '1', text: 'Ver opciones 4K o 2K con precisión de color IPS', done: true },
      { id: '2', text: 'Comprar soporte para dos pantallas', done: false }
    ]
  },
  {
    id: 'goal-5',
    title: 'Organizar Contabilidad, Pensión y Salud',
    category: 'salud',
    description: 'Poner al día aportes en Colpensiones, realizar el traslado/cambio de EPS y estructurar contabilidad e impuestos.',
    target_amount: 0,
    current_amount: 0,
    progress_percent: 20,
    status: 'en_progreso',
    priority: 'alta',
    notes: 'Clave para tranquilidad legal, financiera y médica.',
    action_steps: [
      { id: '1', text: 'Consultar estado actual en Colpensiones', done: false },
      { id: '2', text: 'Revisar requisitos para cambio de EPS', done: false },
      { id: '3', text: 'Reunión con contador para optimizar tributación', done: false }
    ]
  },
  {
    id: 'goal-6',
    title: 'Realizar un Cuadro en Óleo Cada Semana',
    category: 'arte',
    description: 'Pintar una obra al óleo semanalmente para profundizar la técnica artística, la paleta de colores y proyectar obras de galería.',
    target_amount: 0,
    current_amount: 0,
    progress_percent: 10,
    status: 'en_progreso',
    priority: 'media',
    notes: 'Eleva el estatus artístico y la maestría con el pincel.',
    action_steps: [
      { id: '1', text: 'Comprar bastidores y óleos profesionales', done: true },
      { id: '2', text: 'Fijar el día de la semana dedicado exclusivamente a pintar', done: false }
    ]
  }
];

export const initialProjects = [
  {
    id: 'proj-1',
    client_name: 'Fabián',
    project_name: 'Proyecto Espalda Completa',
    placement: 'Espalda',
    status: 'boceto_diseno',
    price: 3500000,
    deposit: 500000,
    sessions_total: 4,
    sessions_done: 0,
    next_session_date: '',
    notes: 'Gran escala. Definir líneas guía y flujo muscular antes de la primera sesión.',
    priority: 'alta'
  },
  {
    id: 'proj-2',
    client_name: 'Doris',
    project_name: 'Proyecto Espalda',
    placement: 'Espalda',
    status: 'boceto_diseno',
    price: 2200000,
    deposit: 300000,
    sessions_total: 3,
    sessions_done: 0,
    next_session_date: '',
    notes: 'Diseño elegante con contrastes y sombras suaves.',
    priority: 'alta'
  },
  {
    id: 'proj-3',
    client_name: 'Yohana',
    project_name: 'Proyecto Brazo / Manga',
    placement: 'Brazo',
    status: 'boceto_diseno',
    price: 2800000,
    deposit: 400000,
    sessions_total: 3,
    sessions_done: 0,
    next_session_date: '',
    notes: 'Ajustar la proporción al contorno del brazo.',
    priority: 'alta'
  },
  {
    id: 'proj-4',
    client_name: 'Proyectos de Autor',
    project_name: 'Piezas exclusivas para portafolio',
    placement: 'Cuerpo completo',
    status: 'boceto_diseno',
    price: 0,
    deposit: 0,
    sessions_total: 1,
    sessions_done: 0,
    next_session_date: '',
    notes: 'Pensar conceptos innovadores que impulsen mi arte y atraigan clientes de alto valor.',
    priority: 'media'
  }
];

export const CATEGORIES = {
  casa: { label: 'Casa', icon: 'Home', color: 'emerald', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  negocio: { label: 'Negocio & Estudio', icon: 'Briefcase', color: 'purple', bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  salud: { label: 'Salud & Bienestar', icon: 'Heart', color: 'rose', bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
  inversiones: { label: 'Inversiones', icon: 'TrendingUp', color: 'amber', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  importaciones: { label: 'Importaciones', icon: 'Ship', color: 'cyan', bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
  arte: { label: 'Arte & Tatuaje', icon: 'Palette', color: 'fuchsia', bg: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30' },
  personal: { label: 'Personal', icon: 'User', color: 'blue', bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30' }
};

export const PRIORITIES = {
  alta: { label: 'Alta', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
  media: { label: 'Media', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  baja: { label: 'Baja', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' }
};
