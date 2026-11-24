import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Plus, 
  Calendar, 
  DollarSign, 
  User, 
  Edit2, 
  Trash2, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PRIORITIES } from '../lib/initialData';

const STATUS_CONFIG = {
  boceto_diseno: { label: 'Boceto / Diseño', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  cita_agendada: { label: 'Cita Agendada', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  en_sesiones: { label: 'En Sesiones', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  finalizado: { label: 'Finalizado', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' }
};

export default function TattooProjects({ 
  projects, 
  onSaveProject, 
  onDeleteProject, 
  onOpenNewProject, 
  onEditProject 
}) {
  const [filterStatus, setFilterStatus] = useState('todos');

  const formatCOP = (num) => {
    if (!num) return '$0';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(num);
  };

  const filteredProjects = filterStatus === 'todos' 
    ? projects 
    : projects.filter(p => p.status === filterStatus);

  const incrementSession = (project) => {
    const nextDone = Math.min((project.sessions_done || 0) + 1, project.sessions_total || 1);
    const newStatus = nextDone === project.sessions_total ? 'finalizado' : 'en_sesiones';
    onSaveProject({
      ...project,
      sessions_done: nextDone,
      status: newStatus
    });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Control de Proyectos & Clientes</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Proyectos de Tatuajes</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Lleva el seguimiento de los diseños de Fabián, Doris, Yohana y cada nueva obra de arte que crees.
          </p>
        </div>

        <button
          onClick={onOpenNewProject}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Proyecto</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setFilterStatus('todos')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filterStatus === 'todos'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          Todos ({projects.length})
        </button>
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
          const count = projects.filter(p => p.status === key).length;
          return (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                filterStatus === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map(proj => {
          const statusCfg = STATUS_CONFIG[proj.status] || STATUS_CONFIG.boceto_diseno;
          const priorityCfg = PRIORITIES[proj.priority] || PRIORITIES.media;
          const remainingBalance = (proj.price || 0) - (proj.deposit || 0);

          return (
            <div
              key={proj.id}
              className="bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                {/* Badges & Actions */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusCfg.color}`}>
                      {statusCfg.label}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${priorityCfg.color}`}>
                      {priorityCfg.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditProject(proj)}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                      title="Editar proyecto"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteProject(proj.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                      title="Eliminar proyecto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Client & Project Name */}
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-semibold text-slate-300">{proj.client_name}</span>
                  {proj.placement && (
                    <span className="text-slate-500">• Zona: {proj.placement}</span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {proj.project_name}
                </h2>

                {/* Notes */}
                {proj.notes && (
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                    {proj.notes}
                  </p>
                )}

                {/* Financial Summary */}
                {proj.price > 0 && (
                  <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Total</span>
                      <span className="font-bold text-white">{formatCOP(proj.price)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Saldo Pendiente</span>
                      <span className={`font-bold ${remainingBalance > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {remainingBalance > 0 ? formatCOP(remainingBalance) : 'Pagado'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sessions Tracker Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400 font-medium">
                    Sesiones ({proj.sessions_done || 0}/{proj.sessions_total || 1})
                  </span>
                  {proj.sessions_done < proj.sessions_total && (
                    <button
                      onClick={() => incrementSession(proj)}
                      className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      <span>+1 Sesión lista</span>
                    </button>
                  )}
                </div>

                {/* Session visual dots */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: proj.sessions_total || 1 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        i < (proj.sessions_done || 0)
                          ? 'bg-purple-500'
                          : 'bg-slate-800 border border-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
