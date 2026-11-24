import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import DailyPlanner from './components/DailyPlanner';
import GoalsView from './components/GoalsView';
import TattooProjects from './components/TattooProjects';
import AllTasksView from './components/AllTasksView';
import TaskModal from './components/TaskModal';
import GoalModal from './components/GoalModal';
import ProjectModal from './components/ProjectModal';
import SettingsModal from './components/SettingsModal';
import { DataService, isSupabaseConnected } from './lib/supabase';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentTab, setCurrentTab] = useState('daily');
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  // Load data
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [tData, gData, pData] = await Promise.all([
        DataService.getTasks(),
        DataService.getGoals(),
        DataService.getProjects()
      ]);
      setTasks(tData || []);
      setGoals(gData || []);
      setProjects(pData || []);
      setIsSynced(isSupabaseConnected());
    } catch (err) {
      console.error('Error cargando datos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Daily statistics
  const dailyTasks = tasks.filter(t => t.type === 'daily');
  const completedDailyCount = dailyTasks.filter(t => t.completed).length;
  const totalDailyCount = dailyTasks.length;
  const dailyPercent = totalDailyCount > 0 ? Math.round((completedDailyCount / totalDailyCount) * 100) : 0;

  const dailyStats = {
    completed: completedDailyCount,
    total: totalDailyCount,
    percent: dailyPercent
  };

  // Task Handlers
  const handleToggleTask = async (taskId) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          completed: !t.completed,
          last_completed_at: !t.completed ? new Date().toISOString() : null
        };
      }
      return t;
    });
    setTasks(updated);
    await DataService.saveTasks(updated);
  };

  const handleSaveTask = async (taskData) => {
    const exists = tasks.some(t => t.id === taskData.id);
    let updated;
    if (exists) {
      updated = tasks.map(t => t.id === taskData.id ? taskData : t);
    } else {
      updated = [taskData, ...tasks];
    }
    setTasks(updated);
    await DataService.saveTasks(updated);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('¿Eliminar esta actividad?')) {
      const remaining = await DataService.deleteTask(taskId);
      setTasks(remaining);
    }
  };

  const handleOpenEditTask = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleOpenNewTask = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  // Goal Handlers
  const handleSaveGoal = async (goalData) => {
    const exists = goals.some(g => g.id === goalData.id);
    let updated;
    if (exists) {
      updated = goals.map(g => g.id === goalData.id ? goalData : g);
    } else {
      updated = [goalData, ...goals];
    }
    setGoals(updated);
    await DataService.saveGoals(updated);
  };

  const handleDeleteGoal = async (goalId) => {
    if (window.confirm('¿Eliminar este objetivo?')) {
      const remaining = await DataService.deleteGoal(goalId);
      setGoals(remaining);
    }
  };

  const handleOpenEditGoal = (goal) => {
    setGoalToEdit(goal);
    setIsGoalModalOpen(true);
  };

  const handleOpenNewGoal = () => {
    setGoalToEdit(null);
    setIsGoalModalOpen(true);
  };

  // Project Handlers
  const handleSaveProject = async (projectData) => {
    const exists = projects.some(p => p.id === projectData.id);
    let updated;
    if (exists) {
      updated = projects.map(p => p.id === projectData.id ? projectData : p);
    } else {
      updated = [projectData, ...projects];
    }
    setProjects(updated);
    await DataService.saveProjects(updated);
  };

  const handleDeleteProject = async (projId) => {
    if (window.confirm('¿Eliminar este proyecto de tatuaje?')) {
      const remaining = await DataService.deleteProject(projId);
      setProjects(remaining);
    }
  };

  const handleOpenEditProject = (proj) => {
    setProjectToEdit(proj);
    setIsProjectModalOpen(true);
  };

  const handleOpenNewProject = () => {
    setProjectToEdit(null);
    setIsProjectModalOpen(true);
  };

  // Reset Daily Checkbox Handler
  const handleResetDay = async () => {
    if (window.confirm('¿Iniciar un nuevo día? Los hábitos diarios se desmarcarán para comenzar hoy.')) {
      const updated = await DataService.resetDailyTasks();
      setTasks(updated);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        dailyStats={dailyStats}
        onResetDay={handleResetDay}
        onOpenNewTask={handleOpenNewTask}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isSynced={isSynced}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {currentTab === 'daily' && (
              <DailyPlanner
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onEditTask={handleOpenEditTask}
                onDeleteTask={handleDeleteTask}
                onOpenNewTask={handleOpenNewTask}
                setCurrentTab={setCurrentTab}
              />
            )}

            {currentTab === 'goals' && (
              <GoalsView
                goals={goals}
                onSaveGoal={handleSaveGoal}
                onDeleteGoal={handleDeleteGoal}
                onOpenNewGoal={handleOpenNewGoal}
                onEditGoal={handleOpenEditGoal}
              />
            )}

            {currentTab === 'projects' && (
              <TattooProjects
                projects={projects}
                onSaveProject={handleSaveProject}
                onDeleteProject={handleDeleteProject}
                onOpenNewProject={handleOpenNewProject}
                onEditProject={handleOpenEditProject}
              />
            )}

            {currentTab === 'all' && (
              <AllTasksView
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onEditTask={handleOpenEditTask}
                onDeleteTask={handleDeleteTask}
                onOpenNewTask={handleOpenNewTask}
                onSaveTask={handleSaveTask}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Sticky Bar for Mobile Devices */}
      <BottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        dailyStats={dailyStats}
      />

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onSave={handleSaveGoal}
        goalToEdit={goalToEdit}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleSaveProject}
        projectToEdit={projectToEdit}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onDataReload={loadAllData}
      />
    </div>
  );
}
