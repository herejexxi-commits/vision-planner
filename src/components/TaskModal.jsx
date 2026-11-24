import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { CATEGORIES } from '../lib/initialData';

export default function TaskModal({ isOpen, onClose, onSave, taskToEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'negocio',
    type: 'daily',
    priority: 'media',
    frequency_note: 'Todos los días'
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        category: taskToEdit.category || 'negocio',
        type: taskToEdit.type || 'daily',
        priority: taskToEdit.priority || 'media',
        frequency_note: taskToEdit.frequency_note || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'negocio',
        type: 'daily',
        priority: 'media',
        frequency_note: 'Todos los días'
      });
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave({
      ...(taskToEdit || { id: 'task-' + Date.now(), completed: false }),
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      frequency_note: formData.frequency_note.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-4">
          {taskToEdit ? 'Editar Actividad' : 'Nueva Actividad / Hábito'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Nombre de la Tarea / Hábito *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Dibujar y aprender, Organizar pigmentos..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Descripción o Detalles
            </label>
            <textarea
              rows={2}
              placeholder="Detalles adicionales, recordatorios..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Área / Categoría
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
                Tipo
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="daily">Hábito Diario</option>
                <option value="weekly">Semanal / Recurrente</option>
                <option value="one_time">Tarea Puntual</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Frecuencia / Nota
              </label>
              <input
                type="text"
                placeholder="Ej: Todos los días, 2 a la semana..."
                value={formData.frequency_note}
                onChange={(e) => setFormData({ ...formData, frequency_note: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
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
              <span>Guardar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
