import React, { useState } from 'react';
import { 
  X, 
  Cloud, 
  Database, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react';
import { 
  getCredentials, 
  saveCredentials, 
  isSupabaseConnected, 
  testSupabaseConnection, 
  DataService 
} from '../lib/supabase';

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  onDataReload 
}) {
  const currentCreds = getCredentials();
  const [url, setUrl] = useState(currentCreds.url);
  const [key, setKey] = useState(currentCreds.key);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  if (!isOpen) return null;

  const handleSaveCredentials = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      if (url && key) {
        // Test real connection
        await testSupabaseConnection(url, key);
        saveCredentials(url, key);
        setStatusMessage({ 
          type: 'success', 
          text: '¡Conexión exitosa a Supabase! Ya puedes sincronizar tus datos.' 
        });
      } else {
        saveCredentials('', '');
        setStatusMessage({ 
          type: 'info', 
          text: 'Credenciales borradas. Usando almacenamiento Local.' 
        });
      }
      if (onDataReload) await onDataReload();
    } catch (err) {
      console.error(err);
      saveCredentials(url, key); // save anyway so user doesn't lose what they typed
      setStatusMessage({ 
        type: 'error', 
        text: `Error de conexión: ${err.message}. Asegúrate de haber ejecutado el script SQL en Supabase.` 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadToCloud = async () => {
    setIsSyncing(true);
    setStatusMessage(null);
    try {
      await DataService.uploadAllLocalToCloud();
      setStatusMessage({ 
        type: 'success', 
        text: '¡Datos de este dispositivo subidos a Supabase con éxito!' 
      });
      if (onDataReload) await onDataReload();
    } catch (err) {
      setStatusMessage({ 
        type: 'error', 
        text: 'Error subiendo datos: ' + err.message 
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDownloadFromCloud = async () => {
    setIsSyncing(true);
    setStatusMessage(null);
    try {
      await DataService.downloadAllCloudToLocal();
      setStatusMessage({ 
        type: 'success', 
        text: '¡Datos descargados desde Supabase a este dispositivo!' 
      });
      if (onDataReload) await onDataReload();
    } catch (err) {
      setStatusMessage({ 
        type: 'error', 
        text: 'Error descargando datos: ' + err.message 
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExportBackup = async () => {
    const tasks = await DataService.getTasks();
    const goals = await DataService.getGoals();
    const projects = await DataService.getProjects();

    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      tasks,
      goals,
      projects
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `vision_planner_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.tasks) await DataService.saveTasks(parsed.tasks);
        if (parsed.goals) await DataService.saveGoals(parsed.goals);
        if (parsed.projects) await DataService.saveProjects(parsed.projects);
        setStatusMessage({ type: 'success', text: '¡Copia de seguridad restaurada correctamente!' });
        if (onDataReload) await onDataReload();
      } catch (err) {
        setStatusMessage({ type: 'error', text: 'Archivo de respaldo inválido.' });
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = async () => {
    if (window.confirm('¿Deseas restablecer todos los hábitos, metas y proyectos a los datos iniciales?')) {
      await DataService.resetToDefaults();
      setStatusMessage({ type: 'success', text: 'Restablecido a los datos iniciales.' });
      if (onDataReload) await onDataReload();
    }
  };

  const connected = isSupabaseConnected();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Sincronización & Base de Datos</h2>
            <p className="text-xs text-slate-400">Conecta Supabase para ver los mismos datos en PC y celular</p>
          </div>
        </div>

        {statusMessage && (
          <div className={`mb-4 p-3.5 rounded-xl text-xs flex items-start gap-2.5 leading-relaxed ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
              : statusMessage.type === 'error'
              ? 'bg-red-500/10 text-red-300 border border-red-500/30'
              : 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
          }`}>
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Supabase Connection Form */}
        <form onSubmit={handleSaveCredentials} className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4 text-purple-400" /> Claves de Supabase
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              connected 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}>
              {connected ? 'Conectado a la Nube' : 'Modo Almacenamiento Local'}
            </span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Project URL
            </label>
            <input
              type="text"
              placeholder="https://qtynomsgpnncqpxssvjn.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-400">
                Anon / Public API Key
              </label>
              <span className="text-[10px] text-purple-400">
                (Usa la clave `anon` de "View legacy API keys" o tu `sb_publishable_...`)
              </span>
            </div>
            <input
              type="password"
              placeholder="Pega tu clave pública aquí..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center justify-end pt-1">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/20"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Verificando...' : 'Guardar y Probar Conexión'}</span>
            </button>
          </div>
        </form>

        {/* Sync Controls (Upload / Download) */}
        {connected && (
          <div className="mt-4 p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-purple-400" /> Sincronización Manual Inmediata
              </span>
              <span className="text-[10px] text-slate-400">Entre tus dispositivos</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleUploadToCloud}
                disabled={isSyncing}
                className="p-2.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-left transition-all"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <ArrowUpCircle className="w-4 h-4 text-purple-300" />
                  <span>Subir a Supabase</span>
                </div>
                <p className="text-[10px] text-slate-300 mt-0.5">
                  Envía el progreso de este equipo a la nube
                </p>
              </button>

              <button
                type="button"
                onClick={handleDownloadFromCloud}
                disabled={isSyncing}
                className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <ArrowDownCircle className="w-4 h-4 text-emerald-400" />
                  <span>Descargar de Supabase</span>
                </div>
                <p className="text-[10px] text-slate-300 mt-0.5">
                  Trae lo último actualizado desde otro equipo
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Backup & Recovery Section */}
        <div className="mt-5 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Copias de Seguridad en Archivo JSON
          </span>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleExportBackup}
              className="p-3 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-left transition-all"
            >
              <Download className="w-4 h-4 text-purple-400 mb-1" />
              <div className="text-xs font-bold text-white">Exportar JSON</div>
              <div className="text-[10px] text-slate-400">Descarga tus datos a tu PC o cel</div>
            </button>

            <label className="p-3 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-left transition-all cursor-pointer block">
              <Upload className="w-4 h-4 text-emerald-400 mb-1" />
              <div className="text-xs font-bold text-white">Importar JSON</div>
              <div className="text-[10px] text-slate-400">Restaurar respaldo previo</div>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={handleResetDefaults}
            className="w-full py-2.5 px-3 bg-slate-950/40 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/30 rounded-xl text-slate-400 hover:text-red-300 text-xs font-medium flex items-center justify-center gap-2 transition-all mt-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Todo a Datos Iniciales del Borrador</span>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
