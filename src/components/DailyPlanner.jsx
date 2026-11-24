import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Home, 
  Briefcase, 
  Heart, 
  TrendingUp, 
  Ship, 
  Palette, 
  MoreVertical,
  Edit2,
  Trash2,
  Flame,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRIORITIES } from '../lib/initialData';

const CATEGORY_MAP = {
  casa: { label: 'Casa & Hogar', icon: Home, color: 'emerald' },
  negocio: { label: 'Negocio & Tatuajes', icon: Briefcase, color: 'purple' },
  salud: { label: 'Salud & Bienestar', icon: Heart, color: 'rose' },
  inversiones: { label: 'Inversiones & Finanzas', icon: TrendingUp, color: 'amber' },
  importaciones: { label: 'Importaciones', icon: Ship, color: 'cyan' },
  arte: { label: 'Arte & Proyectos', icon: Palette, color: 'fuchsia' }
};

export default function DailyPlanner({ 
  tasks, 
  onToggleTask, 
  onEditTask, 
  onDeleteTask, 
  onOpenNewTask, 
  setCurrentTab 
}) {
  // Filter daily and important weekly tasks
  const dailyTasks = tasks.filter(t => t.type === 'daily');
  const weeklyTasks = tasks.filter(t => t.type === 'weekly' || t.type === 'one_time');

  const completedDaily = dailyTasks.filter(t => t.completed).length;
  const totalDaily = dailyTasks.length;
  const progressPercent = totalDaily > 0 ? Math.round((completedDaily / totalDaily) * 100) : 0;

  // Group daily tasks by category
  const categoriesPresent = ['casa', 'negocio', 'salud', 'inversiones', 'arte'];

  const handleToggle = (task) => {
    const isNowDone = !task.completed;
    onToggleTask(task.id);

    // If this completed all daily tasks, trigger celebration!
    if (isNowDone && completedDaily + 1 === totalDaily) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Top Banner / Today's Focus Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/40 via-slate-900 to-slate-950 p-5 sm:p-7 border border-purple-500/20 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-purple-400 fill-purple-400/30" />
              <span>Plan de Acción Diario</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Construyendo Tu Futuro Paso a Paso
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Hábitos esenciales para mantener tu casa en orden, tu negocio de tatuajes en el más alto nivel, tu salud blindada y tus inversiones creciendo.
            </p>
          </div>

          {/* Daily Progress Gauge */}
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-4 rounded-xl min-w-[200px] flex flex-col items-center justify-center">
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {progressPercent}%
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {completedDaily} de {totalDaily} hábitos listos
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Daily Habits by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categoriesPresent.map(catKey => {
          const catConfig = CATEGORY_MAP[catKey] || { label: catKey, icon: Sparkles, color: 'purple' };
          const Icon = catConfig.icon;
          const catTasks = dailyTasks.filter(t => t.category === catKey);

          if (catTasks.length === 0) return null;

          const catCompleted = catTasks.filter(t => t.completed).length;

          return (
            <div 
              key={catKey}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-800/90 text-purple-400 border border-slate-700/60">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-bold text-white text-base">{catConfig.label}</h2>
                      <span className="text-[11px] text-slate-400">
                        {catCompleted}/{catTasks.length} completados
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    catCompleted === catTasks.length 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {catCompleted === catTasks.length ? '¡Completo!' : 'En curso'}
                  </span>
                </div>

                {/* Tasks List */}
                <div className="space-y-2.5">
                  {catTasks.map(task => {
                    const isDone = task.completed;
                    const priorityConfig = PRIORITIES[task.priority] || PRIORITIES.media;

                    return (
                      <div
                        key={task.id}
                        className={`group p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                          isDone 
                            ? 'bg-slate-950/40 border-slate-800/60 opacity-60' 
                            : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/70'
                        }`}
                      >
                        <div 
                          onClick={() => handleToggle(task)}
                          className="flex items-start gap-3 cursor-pointer flex-1"
                        >
                          <button
                            type="button"
                            className="mt-0.5 focus:outline-none transition-transform active:scale-90"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-500 hover:text-purple-400" />
                            )}
                          </button>

                          <div>
                            <p className={`text-sm font-semibold transition-all ${
                              isDone ? 'line-through text-slate-500' : 'text-slate-100'
                            }`}>
                              {task.title}
                            </p>
                            {task.description && (
                              <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                                {task.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              {task.frequency_note && (
                                <span className="text-[10px] text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800">
                                  {task.frequency_note}
                                </span>
                              )}
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${priorityConfig.color}`}>
                                {priorityConfig.label}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onEditTask(task)}
                            className="p-1.5 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-slate-200"
                            title="Editar tarea"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                            title="Eliminar tarea"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Highlighted Weekly / Marketing & Strategic Tasks */}
      {weeklyTasks.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="font-bold text-white text-base">Estrategia Semanal & Marketing</h2>
            </div>
            <button
              onClick={() => setCurrentTab('all')}
              className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
            >
              <span>Ver todas</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {weeklyTasks.map(task => {
              const isDone = task.completed;
              return (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                    isDone 
                      ? 'bg-slate-950/40 border-slate-800/50 opacity-60' 
                      : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                        {task.frequency_note || 'Semanal'}
                      </span>
                      <button
                        onClick={() => handleToggle(task)}
                        className="text-slate-500 hover:text-emerald-400"
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className={`text-sm font-semibold mt-2 ${isDone ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/60 text-xs">
                    <span className="text-slate-500 text-[11px] capitalize">{task.category}</span>
                    <button
                      onClick={() => onEditTask(task)}
                      className="text-slate-400 hover:text-purple-300 text-[11px]"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
