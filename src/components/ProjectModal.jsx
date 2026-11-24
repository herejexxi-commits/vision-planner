import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function ProjectModal({ isOpen, onClose, onSave, projectToEdit }) {
  const [formData, setFormData] = useState({
    client_name: '',
    project_name: '',
    placement: '',
    status: 'boceto_diseno',
    price: '',
    deposit: '',
    sessions_total: 1,
    sessions_done: 0,
    priority: 'alta',
    notes: ''
  });

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        client_name: projectToEdit.client_name || '',
        project_name: projectToEdit.project_name || '',
        placement: projectToEdit.placement || '',
        status: projectToEdit.status || 'boceto_diseno',
        price: projectToEdit.price || '',
        deposit: projectToEdit.deposit || '',
        sessions_total: projectToEdit.sessions_total || 1,
        sessions_done: projectToEdit.sessions_done || 0,
        priority: projectToEdit.priority || 'alta',
        notes: projectToEdit.notes || ''
      });
    } else {
      setFormData({
        client_name: '',
        project_name: '',
        placement: 'Espalda',
        status: 'boceto_diseno',
        price: '',
        deposit: '',
        sessions_total: 1,
        sessions_done: 0,
        priority: 'alta',
        notes: ''
      });
    }
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client_name.trim() || !formData.project_name.trim()) return;

    onSave({
      ...(projectToEdit || { id: 'proj-' + Date.now() }),
      ...formData,
      client_name: formData.client_name.trim(),
      project_name: formData.project_name.trim(),
      placement: formData.placement.trim(),
      price: Number(formData.price) || 0,
      deposit: Number(formData.deposit) || 0,
      sessions_total: Math.max(1, Number(formData.sessions_total) || 1),
      sessions_done: Math.max(0, Number(formData.sessions_done) || 0),
      notes: formData.notes.trim()
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
          {projectToEdit ? 'Editar Proyecto de Tatuaje' : 'Nuevo Proyecto de Tatuaje'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Cliente *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Fabián, Doris, Yohana..."
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Zona del Cuerpo
              </label>
              <input
                type="text"
                placeholder="Ej: Espalda, Brazo, Pecho..."
                value={formData.placement}
                onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Nombre de la Pieza / Proyecto *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Espalda completa estilo libre, Manga oriental..."
              value={formData.project_name}
              onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="boceto_diseno">Boceto / Diseño</option>
                <option value="cita_agendada">Cita Agendada</option>
                <option value="en_sesiones">En Sesiones</option>
                <option value="finalizado">Finalizado</option>
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
                Precio Total Acordado (COP)
              </label>
              <input
                type="number"
                placeholder="Ej: 3000000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Abono Recibido (COP)
              </label>
              <input
                type="number"
                placeholder="Ej: 500000"
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Sesiones Estimadas
              </label>
              <input
                type="number"
                min="1"
                value={formData.sessions_total}
                onChange={(e) => setFormData({ ...formData, sessions_total: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Sesiones Realizadas
              </label>
              <input
                type="number"
                min="0"
                value={formData.sessions_done}
                onChange={(e) => setFormData({ ...formData, sessions_done: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Notas del Tatuaje / Ideas
            </label>
            <textarea
              rows={2}
              placeholder="Pigmentos, referencias, detalles anatómicos acordados..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
            />
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
              <span>Guardar Proyecto</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
