import { createClient } from '@supabase/supabase-js';
import { initialTasks, initialGoals, initialProjects } from './initialData';

const getSavedCredentials = () => {
  const url = localStorage.getItem('vp_supabase_url') || import.meta.env.VITE_SUPABASE_URL || '';
  const key = localStorage.getItem('vp_supabase_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  return { url: url.trim(), key: key.trim() };
};

let supabaseClient = null;

export const initSupabase = (customUrl, customKey) => {
  const url = customUrl || getSavedCredentials().url;
  const key = customKey || getSavedCredentials().key;

  if (url && key) {
    try {
      supabaseClient = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      });
      return supabaseClient;
    } catch (err) {
      console.warn('Error inicializando Supabase:', err);
      supabaseClient = null;
    }
  } else {
    supabaseClient = null;
  }
  return null;
};

// Inicializar de entrada
initSupabase();

export const isSupabaseConnected = () => {
  const creds = getSavedCredentials();
  return Boolean(creds.url && creds.key && supabaseClient);
};

export const getCredentials = getSavedCredentials;

export const saveCredentials = (url, key) => {
  if (url) localStorage.setItem('vp_supabase_url', url.trim());
  else localStorage.removeItem('vp_supabase_url');

  if (key) localStorage.setItem('vp_supabase_key', key.trim());
  else localStorage.removeItem('vp_supabase_key');

  return initSupabase(url, key);
};

// Test connection strictly
export const testSupabaseConnection = async (url, key) => {
  const client = initSupabase(url, key);
  if (!client) {
    throw new Error('Falta ingresar la URL o la API Key.');
  }

  const { data, error } = await client
    .from('tasks')
    .select('id')
    .limit(1);

  if (error) {
    throw new Error(error.message || 'Error consultando la base de datos.');
  }

  return true;
};

// ==========================================
// SERVICIO DE DATOS
// ==========================================

export const DataService = {
  // TASKS
  async getTasks() {
    if (isSupabaseConnected()) {
      try {
        const { data, error } = await supabaseClient
          .from('tasks')
          .select('*')
          .order('sort_order', { ascending: true });
        
        if (!error && data && data.length > 0) {
          localStorage.setItem('vp_tasks', JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.warn('Supabase fetch failed, usando local:', err);
      }
    }
    const local = localStorage.getItem('vp_tasks');
    if (!local) {
      localStorage.setItem('vp_tasks', JSON.stringify(initialTasks));
      return initialTasks;
    }
    return JSON.parse(local);
  },

  async saveTasks(tasks) {
    localStorage.setItem('vp_tasks', JSON.stringify(tasks));
    if (isSupabaseConnected()) {
      try {
        const cleanTasks = tasks.map(t => ({
          id: String(t.id),
          title: t.title,
          description: t.description || '',
          category: t.category || 'casa',
          type: t.type || 'daily',
          priority: t.priority || 'media',
          completed: Boolean(t.completed),
          last_completed_at: t.last_completed_at || null,
          frequency_note: t.frequency_note || '',
          sort_order: t.sort_order || 0
        }));

        const { error } = await supabaseClient
          .from('tasks')
          .upsert(cleanTasks, { onConflict: 'id' });
        
        if (error) console.error('Error guardando tareas en Supabase:', error);
      } catch (err) {
        console.error('Error guardando tareas en Supabase:', err);
      }
    }
  },

  async deleteTask(id) {
    const tasks = (await this.getTasks()).filter(t => t.id !== id);
    localStorage.setItem('vp_tasks', JSON.stringify(tasks));
    if (isSupabaseConnected()) {
      try {
        await supabaseClient.from('tasks').delete().eq('id', id);
      } catch (err) {
        console.error('Error eliminando tarea de Supabase:', err);
      }
    }
    return tasks;
  },

  // GOALS
  async getGoals() {
    if (isSupabaseConnected()) {
      try {
        const { data, error } = await supabaseClient
          .from('goals')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data && data.length > 0) {
          localStorage.setItem('vp_goals', JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.warn('Supabase fetch goals failed, usando local:', err);
      }
    }
    const local = localStorage.getItem('vp_goals');
    if (!local) {
      localStorage.setItem('vp_goals', JSON.stringify(initialGoals));
      return initialGoals;
    }
    return JSON.parse(local);
  },

  async saveGoals(goals) {
    localStorage.setItem('vp_goals', JSON.stringify(goals));
    if (isSupabaseConnected()) {
      try {
        const cleanGoals = goals.map(g => ({
          id: String(g.id),
          title: g.title,
          category: g.category || 'inversiones',
          description: g.description || '',
          target_amount: Number(g.target_amount) || 0,
          current_amount: Number(g.current_amount) || 0,
          progress_percent: Number(g.progress_percent) || 0,
          status: g.status || 'en_progreso',
          priority: g.priority || 'alta',
          action_steps: g.action_steps || [],
          notes: g.notes || ''
        }));

        const { error } = await supabaseClient
          .from('goals')
          .upsert(cleanGoals, { onConflict: 'id' });
        
        if (error) console.error('Error guardando metas en Supabase:', error);
      } catch (err) {
        console.error('Error guardando metas en Supabase:', err);
      }
    }
  },

  async deleteGoal(id) {
    const goals = (await this.getGoals()).filter(g => g.id !== id);
    localStorage.setItem('vp_goals', JSON.stringify(goals));
    if (isSupabaseConnected()) {
      try {
        await supabaseClient.from('goals').delete().eq('id', id);
      } catch (err) {
        console.error('Error eliminando meta de Supabase:', err);
      }
    }
    return goals;
  },

  // TATTOO PROJECTS
  async getProjects() {
    if (isSupabaseConnected()) {
      try {
        const { data, error } = await supabaseClient
          .from('tattoo_projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data && data.length > 0) {
          localStorage.setItem('vp_projects', JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.warn('Supabase fetch projects failed, usando local:', err);
      }
    }
    const local = localStorage.getItem('vp_projects');
    if (!local) {
      localStorage.setItem('vp_projects', JSON.stringify(initialProjects));
      return initialProjects;
    }
    return JSON.parse(local);
  },

  async saveProjects(projects) {
    localStorage.setItem('vp_projects', JSON.stringify(projects));
    if (isSupabaseConnected()) {
      try {
        const cleanProjects = projects.map(p => ({
          id: String(p.id),
          client_name: p.client_name,
          project_name: p.project_name,
          placement: p.placement || '',
          status: p.status || 'boceto_diseno',
          price: Number(p.price) || 0,
          deposit: Number(p.deposit) || 0,
          sessions_total: Number(p.sessions_total) || 1,
          sessions_done: Number(p.sessions_done) || 0,
          notes: p.notes || '',
          priority: p.priority || 'alta'
        }));

        const { error } = await supabaseClient
          .from('tattoo_projects')
          .upsert(cleanProjects, { onConflict: 'id' });
        
        if (error) console.error('Error guardando proyectos en Supabase:', error);
      } catch (err) {
        console.error('Error guardando proyectos en Supabase:', err);
      }
    }
  },

  async deleteProject(id) {
    const projects = (await this.getProjects()).filter(p => p.id !== id);
    localStorage.setItem('vp_projects', JSON.stringify(projects));
    if (isSupabaseConnected()) {
      try {
        await supabaseClient.from('tattoo_projects').delete().eq('id', id);
      } catch (err) {
        console.error('Error eliminando proyecto de Supabase:', err);
      }
    }
    return projects;
  },

  // Subir explícitamente todo lo local a Supabase
  async uploadAllLocalToCloud() {
    if (!isSupabaseConnected()) throw new Error('Supabase no está conectado.');
    const localTasks = JSON.parse(localStorage.getItem('vp_tasks') || '[]');
    const localGoals = JSON.parse(localStorage.getItem('vp_goals') || '[]');
    const localProjects = JSON.parse(localStorage.getItem('vp_projects') || '[]');

    if (localTasks.length > 0) await this.saveTasks(localTasks);
    if (localGoals.length > 0) await this.saveGoals(localGoals);
    if (localProjects.length > 0) await this.saveProjects(localProjects);
    return true;
  },

  // Descargar explícitamente todo de Supabase
  async downloadAllCloudToLocal() {
    if (!isSupabaseConnected()) throw new Error('Supabase no está conectado.');
    const [t, g, p] = await Promise.all([
      supabaseClient.from('tasks').select('*').order('sort_order', { ascending: true }),
      supabaseClient.from('goals').select('*').order('created_at', { ascending: false }),
      supabaseClient.from('tattoo_projects').select('*').order('created_at', { ascending: false })
    ]);

    if (t.data) localStorage.setItem('vp_tasks', JSON.stringify(t.data));
    if (g.data) localStorage.setItem('vp_goals', JSON.stringify(g.data));
    if (p.data) localStorage.setItem('vp_projects', JSON.stringify(p.data));

    return {
      tasks: t.data || [],
      goals: g.data || [],
      projects: p.data || []
    };
  },

  // Reset diario
  async resetDailyTasks() {
    const tasks = await this.getTasks();
    const updated = tasks.map(t => {
      if (t.type === 'daily') {
        return { ...t, completed: false };
      }
      return t;
    });
    await this.saveTasks(updated);
    return updated;
  },

  // Reset a valores iniciales
  async resetToDefaults() {
    localStorage.setItem('vp_tasks', JSON.stringify(initialTasks));
    localStorage.setItem('vp_goals', JSON.stringify(initialGoals));
    localStorage.setItem('vp_projects', JSON.stringify(initialProjects));
    if (isSupabaseConnected()) {
      await this.saveTasks(initialTasks);
      await this.saveGoals(initialGoals);
      await this.saveProjects(initialProjects);
    }
    return {
      tasks: initialTasks,
      goals: initialGoals,
      projects: initialProjects
    };
  }
};
