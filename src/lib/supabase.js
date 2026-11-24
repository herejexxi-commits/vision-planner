import { createClient } from '@supabase/supabase-js';
import { initialTasks, initialGoals, initialProjects } from './initialData';

// Configuración de Supabase por entorno o localStorage
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
      supabaseClient = createClient(url, key);
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

// ==========================================
// SERVICIO DE DATOS (Tasks, Goals, Projects)
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
        if (error) throw error;
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local:', err);
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
        await supabaseClient.from('tasks').upsert(tasks);
      } catch (err) {
        console.error('Error saving tasks to Supabase:', err);
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
        console.error('Error deleting task from Supabase:', err);
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
        if (error) throw error;
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch goals failed, falling back to local:', err);
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
        await supabaseClient.from('goals').upsert(goals);
      } catch (err) {
        console.error('Error saving goals to Supabase:', err);
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
        console.error('Error deleting goal from Supabase:', err);
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
        if (error) throw error;
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch projects failed, falling back to local:', err);
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
        await supabaseClient.from('tattoo_projects').upsert(projects);
      } catch (err) {
        console.error('Error saving projects to Supabase:', err);
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
        console.error('Error deleting project from Supabase:', err);
      }
    }
    return projects;
  },

  // Reset diario de hábitos
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

  // Reset a datos iniciales
  async resetToDefaults() {
    localStorage.setItem('vp_tasks', JSON.stringify(initialTasks));
    localStorage.setItem('vp_goals', JSON.stringify(initialGoals));
    localStorage.setItem('vp_projects', JSON.stringify(initialProjects));
    return {
      tasks: initialTasks,
      goals: initialGoals,
      projects: initialProjects
    };
  }
};
