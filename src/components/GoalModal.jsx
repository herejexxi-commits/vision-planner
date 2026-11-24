import React, { useState, useEffect } from 'react';
import { X, Check, Plus, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../lib/initialData';

export default function GoalModal({ isOpen, onClose, onSave, goalToEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'inversiones',
    target_amount: '',
    current_amount: '',
    progress_percent: 0,
    priority: 'alta',
    status: 'en_progreso',
    notes: '',
    action_steps: []
  });

  const [newStepText, setNewStepText] = useState('');

  useEffect(() => {
    if (goalToEdit) {
      setFormData({
        title: goalToEdit.title || '',
        description: goalToEdit.description || '',
        category: goalToEdit.category || 'inversiones',
        target_amount: goalToEdit.target_amount || '',
        current_amount: goalToEdit.current_amount || '',
        progress_percent: goalToEdit.progress_percent || 0,
        priority: goalToEdit.priority || 'alta',
        status: goalToEdit.status || 'en_progreso',
        notes: goalToEdit.notes || '',
        action_steps: goalToEdit.action_steps || []
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'inversiones',
        target_amount: '',
        current_amount: '',
        progress_percent: 0,
        priority: 'alta',
        status: 'en_progreso',
        notes: '',
        action_steps: []
      });
    }
    setNewStepText('');
  }, [goalToEdit, isOpen]);

  if (!isOpen) return null;

  const addStep = () => {
    if (!newStepText.trim()) return;
    setFormData({
      ...formData,
      action_steps: [
        ...formData.action_steps,
        { id: String(Date.now()), text: newStepText.trim(), done: false }
      ]
    });
    setNewStepText('');
  };

  const removeStep = (index) => {
    setFormData({
      ...formData,
      action_steps: formData.action_steps.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave({
      ...(goalToEdit || { id: 'goal-' + Date.now() }),
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      target_amount: Number(formData.target_amount) || 0,
      current_amount: Number(formData.current_amount) || 0,
      progress_percent: Number(formData.progress_percent) || 0,
      notes: formData.notes.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-4">
          {goalToEdit ? 'Editar Meta / Objetivo' : 'Nueva Meta / Objetivo'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Título del Objetivo *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Invertir 5M al mes, Comprar láser..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Descripción & Estrategia
            </label>
            <textarea
              rows={2}
              placeholder="¿Por qué es importante? ¿Qué impacto tendrá en tu futuro?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Área
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
              >
                {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <option key={key} value={key}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Prioridad
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="alta">Alta 🔴</option>
                <option value="media">Media 🟡</option>
                <option value="baja">Baja 🟢</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Monto Objetivo (COP)
              </label>
              <input
                type="number"
                placeholder="Ej: 5000000"
                value={formData.target_amount}
                onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Monto Actual (COP)
              </label>
              <input
                type="number"
                placeholder="Ej: 1000000"
                value={formData.current_amount}
                onChange={(e) => setFormData({ ...formData, current_amount: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Progress Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Progreso General
              </label>
              <span className="text-sm font-bold text-purple-400">{formData.progress_percent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={formData.progress_percent}
              onChange={(e) => setFormData({ ...formData, progress_percent: Number(e.target.value) })}
              className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Action Steps */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Pasos de Acción / Checklist
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Añadir paso clave..."
                value={newStepText}
                onChange={(e) => setNewStepText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addStep(); } }}
                className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-purple-500"
              />
              <button
                type="button"
                onClick={addStep}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Paso</span>
              </button>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {formData.action_steps.map((step, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                  <span className="text-slate-200">{step.text}</span>
                  <button
                    type="button"
                    onClick={() => removeStep(idx)}
                    className="text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Notas Adicionales
            </label>
            <input
              type="text"
              placeholder="Consejos, recursos, enlaces clave..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold shadow-lg shadow-purple-600/30 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Guardar Meta</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
