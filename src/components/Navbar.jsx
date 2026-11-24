import React from 'react';
import { 
  Sparkles, 
  Plus, 
  RotateCcw, 
  Cloud, 
  CloudOff, 
  CheckCircle2, 
  Flame,
  Calendar
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  dailyStats, 
  onResetDay, 
  onOpenNewTask, 
  onOpenSettings,
  isSynced 
}) {
  const todayFormatted = new Intl.DateTimeFormat('es-CO', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'short' 
  }).format(new Date());

  const capitalizedDate = todayFormatted.charAt(0).toUpperCase() + todayFormatted.slice(1);

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Vision Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 ring-1 ring-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent">
                  VISION PLANNER
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 hidden sm:inline-block">
                  Studio & Life
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{capitalizedDate}</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
            {[
              { id: 'daily', label: 'Mi Día', icon: Flame },
              { id: 'goals', label: 'Metas & Futuro', icon: Sparkles },
              { id: 'projects', label: 'Tatuajes & Clientes', icon: CheckCircle2 },
              { id: 'all', label: 'Todas las Tareas', icon: Calendar },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions & Sync Status */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Daily Progress Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-slate-300 font-medium">
                {dailyStats.completed}/{dailyStats.total} hoy
              </span>
              <span className="text-purple-400 font-bold">
                ({dailyStats.percent}%)
              </span>
            </div>

            {/* Reset Day Button */}
            <button
              onClick={onResetDay}
              title="Reiniciar checklist de tareas diarias para mañana"
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Nuevo Día</span>
            </button>

            {/* Add Task Button */}
            <button
              onClick={onOpenNewTask}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir</span>
            </button>

            {/* Cloud Sync / Settings Icon */}
            <button
              onClick={onOpenSettings}
              title={isSynced ? 'Supabase Conectado' : 'Modo Local (Configurar Supabase)'}
              className={`p-2 rounded-lg border transition-all ${
                isSynced
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              {isSynced ? (
                <Cloud className="w-4 h-4" />
              ) : (
                <CloudOff className="w-4 h-4" />
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
