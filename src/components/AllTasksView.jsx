import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Filter, 
  Edit2, 
  Trash2, 
  ArrowUpDown, 
  Tag,
  Flame,
  Calendar
} from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../lib/initialData';

export default function AllTasksView({ 
  tasks, 
  onToggleTask, 
  onEditTask, 
  onDeleteTask, 
  onOpenNewTask,
  onSaveTask 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedPriority, setSelectedPriority] = useState('todas');
  const [selectedType, setSelectedType] = useState('todas');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'todas' || task.category === selectedCategory;
    const matchesPriority = selectedPriority === 'todas' || task.priority === selectedPriority;
    const matchesType = selectedType === 'todas' || task.type === selectedType;

    return matchesSearch && matchesCategory && matchesPriority && matchesType;
  });

  const cyclePriority = (task, e) => {
    e.stopPropagation();
    const order = ['baja', 'media', 'alta'];
    const currentIdx = order.indexOf(task.priority || 'media');
    const nextPriority = order[(currentIdx + 1) % order.length];
    onSaveTask({ ...task, priority: nextPriority });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Todas las Actividades & Hábitos</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Organiza, edita prioridades y administra tus tareas por área.
          </p>
        </div>

        <button
          onClick={onOpenNewTask}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir Actividad</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, nota o detalle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Área:
          </span>
          <button
            onClick={() => setSelectedCategory('todas')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              selectedCategory === 'todas'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Todas
          </button>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedCategory === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Priority & Type Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Prioridad:</span>
            {['todas', 'alta', 'media', 'baja'].map(p => (
              <button
                key={p}
                onClick={() => setSelectedPriority(p)}
                className={`px-2 py-0.5 rounded-md capitalize transition-all ${
                  selectedPriority === p
                    ? 'bg-slate-200 text-slate-900 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Frecuencia:</span>
            {[
              { id: 'todas', label: 'Todas' },
              { id: 'daily', label: 'Diarias' },
              { id: 'weekly', label: 'Semanales' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  selectedType === t.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
            <p className="text-slate-400 text-sm">No se encontraron tareas con estos filtros.</p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const isDone = task.completed;
            const catConfig = CATEGORIES[task.category] || CATEGORIES.personal;
            const priorityConfig = PRIORITIES[task.priority] || PRIORITIES.media;

            return (
              <div
                key={task.id}
                className={`group p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                  isDone 
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-60' 
                    : 'bg-slate-900/70 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div 
                  onClick={() => onToggleTask(task.id)}
                  className="flex items-start gap-3.5 cursor-pointer flex-1"
                >
                  <button
                    type="button"
                    className="mt-0.5 focus:outline-none"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 hover:text-purple-400" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${catConfig.bg}`}>
                        {catConfig.label}
                      </span>
                      <button
                        onClick={(e) => cyclePriority(task, e)}
                        title="Click para cambiar prioridad rápidamente"
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${priorityConfig.color} hover:brightness-125 transition-all`}
                      >
                        Prioridad {priorityConfig.label} ↻
                      </button>
                      {task.type === 'daily' && (
                        <span className="text-[10px] text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Flame className="w-3 h-3" /> Diaria
                        </span>
                      )}
                    </div>

                    <p className={`text-base font-semibold transition-all ${
                      isDone ? 'line-through text-slate-500' : 'text-slate-100'
                    }`}>
                      {task.title}
                    </p>

                    {task.description && (
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    {task.frequency_note && (
                      <span className="text-[11px] text-slate-400 mt-2 inline-block bg-slate-800/60 px-2 py-0.5 rounded">
                        Frecuencia: {task.frequency_note}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEditTask(task)}
                    className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                    title="Editar tarea"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                    title="Eliminar tarea"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
