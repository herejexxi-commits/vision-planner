import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  TrendingUp, 
  Ship, 
  Briefcase, 
  Heart, 
  Palette, 
  CheckCircle, 
  Circle, 
  DollarSign, 
  Calendar, 
  Edit3, 
  Trash2,
  ChevronRight,
  ExternalLink,
  Layers
} from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../lib/initialData';

export default function GoalsView({ 
  goals, 
  onSaveGoal, 
  onDeleteGoal, 
  onOpenNewGoal, 
  onEditGoal 
}) {
  const [filterCategory, setFilterCategory] = useState('todas');

  const formatCOP = (num) => {
    if (!num) return '$0';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(num);
  };

  const filteredGoals = filterCategory === 'todas'
    ? goals
    : goals.filter(g => g.category === filterCategory);

  const toggleSubStep = (goal, stepIndex) => {
    const updatedSteps = [...(goal.action_steps || [])];
    updatedSteps[stepIndex] = {
      ...updatedSteps[stepIndex],
      done: !updatedSteps[stepIndex].done
    };

    // Calculate progress automatically based on sub-steps if steps exist
    const doneCount = updatedSteps.filter(s => s.done).length;
    const newPercent = Math.round((doneCount / updatedSteps.length) * 100);

    onSaveGoal({
      ...goal,
      action_steps: updatedSteps,
      progress_percent: newPercent,
      status: newPercent === 100 ? 'completado' : 'en_progreso'
    });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Target className="w-4 h-4" />
            <span>Visión y Metas a Futuro</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Metas, Inversiones & Crecimiento</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Proyectos de alto impacto que transformarán tu patrimonio, tus habilidades y tu estudio de tatuajes.
          </p>
        </div>

        <button
          onClick={onOpenNewGoal}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Meta</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setFilterCategory('todas')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            filterCategory === 'todas'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          Todas ({goals.length})
        </button>
        {Object.entries(CATEGORIES).map(([key, cat]) => {
          const count = goals.filter(g => g.category === key).length;
          if (count === 0 && filterCategory !== key) return null;
          return (
            <button
              key={key}
              onClick={() => setFilterCategory(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                filterCategory === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredGoals.map(goal => {
          const catConfig = CATEGORIES[goal.category] || CATEGORIES.personal;
          const priorityConfig = PRIORITIES[goal.priority] || PRIORITIES.media;
          const isFinished = goal.status === 'completado' || goal.progress_percent === 100;

          return (
            <div
              key={goal.id}
              className={`rounded-2xl border transition-all p-5 flex flex-col justify-between ${
                isFinished 
                  ? 'bg-emerald-950/20 border-emerald-500/30' 
                  : 'bg-slate-900/70 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Badges & Actions */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${catConfig.bg}`}>
                      {catConfig.label}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${priorityConfig.color}`}>
                      Prioridad {priorityConfig.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditGoal(goal)}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                      title="Editar meta"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteGoal(goal.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                      title="Eliminar meta"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title & Description */}
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {goal.title}
                </h2>
                {goal.description && (
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {goal.description}
                  </p>
                )}

                {/* Financial Progress if target_amount is set */}
                {goal.target_amount > 0 && (
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Monto Objetivo</span>
                      <p className="text-sm font-bold text-emerald-400">{formatCOP(goal.target_amount)}</p>
                    </div>
                    {goal.current_amount > 0 && (
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Avanzado</span>
                        <p className="text-sm font-bold text-purple-300">{formatCOP(goal.current_amount)}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Sub-steps Checklist */}
                {goal.action_steps && goal.action_steps.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Plan de Acción ({goal.action_steps.filter(s => s.done).length}/{goal.action_steps.length})
                    </span>
                    <div className="space-y-1.5">
                      {goal.action_steps.map((step, idx) => (
                        <div
                          key={idx}
                          onClick={() => toggleSubStep(goal, idx)}
                          className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800/60 cursor-pointer transition-colors text-xs"
                        >
                          <button type="button" className="text-slate-400 hover:text-emerald-400">
                            {step.done ? (
                              <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500" />
                            )}
                          </button>
                          <span className={`${step.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                            {step.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {goal.notes && (
                  <div className="mt-3 text-[11px] text-purple-300/90 bg-purple-950/30 p-2.5 rounded-lg border border-purple-500/20">
                    💡 <span className="font-medium">{goal.notes}</span>
                  </div>
                )}
              </div>

              {/* Progress Bar Footer */}
              <div className="mt-5 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-400 font-medium">Progreso</span>
                  <span className="font-extrabold text-purple-400">{goal.progress_percent || 0}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isFinished
                        ? 'bg-emerald-500'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                    }`}
                    style={{ width: `${goal.progress_percent || 0}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
