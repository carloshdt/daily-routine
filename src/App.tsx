import { useState, useEffect } from 'react';
import { Task, WeekStatus, DayOfWeek, TasksByDay, TaskCounts, TaskGoals } from './types';
import { 
  loadTasksByDay, saveTasksByDay, 
  loadTaskCounts, saveTaskCounts,
  loadTaskGoals, saveTaskGoals,
  loadWeekStatus, saveWeekStatus, resetWeekStatus 
} from './utils/storage';
import { Column } from './components/Column';
import './App.css';

const DAYS: { key: DayOfWeek; label: string }[] = [
  { key: 'segunda', label: 'Monday' },
  { key: 'terca', label: 'Tuesday' },
  { key: 'quarta', label: 'Wednesday' },
  { key: 'quinta', label: 'Thursday' },
  { key: 'sexta', label: 'Friday' },
  { key: 'sabado', label: 'Saturday' },
  { key: 'domingo', label: 'Sunday' },
];

function App() {
  const [tasksByDay, setTasksByDay] = useState<TasksByDay>({});
  const [taskCounts, setTaskCounts] = useState<TaskCounts>({});
  const [taskGoals, setTaskGoals] = useState<TaskGoals>({});
  const [weekStatus, setWeekStatus] = useState<WeekStatus>({});

  useEffect(() => {
    setTasksByDay(loadTasksByDay());
    setTaskCounts(loadTaskCounts());
    setTaskGoals(loadTaskGoals());
    setWeekStatus(loadWeekStatus());
  }, []);

  useEffect(() => {
    saveTasksByDay(tasksByDay);
  }, [tasksByDay]);

  useEffect(() => {
    saveTaskCounts(taskCounts);
  }, [taskCounts]);

  useEffect(() => {
    saveTaskGoals(taskGoals);
  }, [taskGoals]);

  useEffect(() => {
    saveWeekStatus(weekStatus);
  }, [weekStatus]);

  const getTaskCount = (title: string): number => {
    return taskCounts[title] || 0;
  };

  const getTaskGoal = (title: string): number | undefined => {
    return taskGoals[title];
  };

  const handleToggleDone = (day: DayOfWeek, taskId: string) => {
    setWeekStatus((prev) => {
      const newStatus = { ...prev };
      if (!newStatus[day]) {
        newStatus[day] = {};
      }
      const wasDone = newStatus[day][taskId] || false;
      newStatus[day][taskId] = !wasDone;

      // Incrementar count apenas quando marcar como done (não quando desmarcar)
      if (!wasDone) {
        const task = tasksByDay[day]?.find(t => t.id === taskId);
        if (task) {
          setTaskCounts((prev) => ({
            ...prev,
            [task.title]: (prev[task.title] || 0) + 1
          }));
        }
      }

      return newStatus;
    });
  };

  const handleAddTask = (day: DayOfWeek, title: string) => {
    const newTask: Task = {
      id: `${day}-${Date.now()}`,
      title,
      count: getTaskCount(title),
      goal: getTaskGoal(title),
    };

    setTasksByDay((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), newTask]
    }));
  };

  const handleUpdateGoal = (day: DayOfWeek, taskId: string, goal: number | undefined) => {
    const task = tasksByDay[day]?.find(t => t.id === taskId);
    if (task) {
      // Atualizar meta global
      setTaskGoals((prev) => ({
        ...prev,
        [task.title]: goal
      }));

      // Atualizar todas as instâncias dessa tarefa em todos os dias
      setTasksByDay((prev) => {
        const newTasksByDay = { ...prev };
        Object.keys(newTasksByDay).forEach((d) => {
          newTasksByDay[d] = newTasksByDay[d].map((t) =>
            t.title === task.title ? { ...t, goal } : t
          );
        });
        return newTasksByDay;
      });
    }
  };

  const handleDeleteTask = (day: DayOfWeek, taskId: string) => {
    setTasksByDay((prev) => ({
      ...prev,
      [day]: (prev[day] || []).filter((task) => task.id !== taskId)
    }));

    // Remove o status done dessa tarefa nesse dia
    setWeekStatus((prev) => {
      const newStatus = { ...prev };
      if (newStatus[day] && newStatus[day][taskId]) {
        delete newStatus[day][taskId];
      }
      return newStatus;
    });
  };

  const handleMoveTask = (fromDay: DayOfWeek, toDay: DayOfWeek, taskId: string) => {
    if (fromDay === toDay) return;

    const task = tasksByDay[fromDay]?.find(t => t.id === taskId);
    if (!task) return;

    // Remove da coluna origem
    setTasksByDay((prev) => ({
      ...prev,
      [fromDay]: (prev[fromDay] || []).filter((t) => t.id !== taskId),
      [toDay]: [...(prev[toDay] || []), { ...task, id: `${toDay}-${Date.now()}` }]
    }));

    // Move o status done se existir
    setWeekStatus((prev) => {
      const newStatus = { ...prev };
      const wasDone = newStatus[fromDay]?.[taskId];
      
      if (wasDone) {
        // Remove do dia origem
        if (newStatus[fromDay]) {
          delete newStatus[fromDay][taskId];
        }
        // Adiciona no dia destino (mas com novo ID, então não precisa)
      }
      
      return newStatus;
    });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all "done" statuses for the week? The counter will not be reset.')) {
      setWeekStatus(resetWeekStatus());
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Daily Routine</h1>
        <button className="reset-button" onClick={handleReset}>
          Reset Week
        </button>
      </header>

      <div className="board">
        {DAYS.map(({ key, label }) => {
          const dayTasks = tasksByDay[key] || [];
          // Atualizar contadores e metas das tarefas do dia
          const tasksWithGlobalData = dayTasks.map(task => ({
            ...task,
            count: getTaskCount(task.title),
            goal: task.goal !== undefined ? task.goal : getTaskGoal(task.title)
          }));

          return (
            <Column
              key={key}
              day={key}
              dayLabel={label}
              tasks={tasksWithGlobalData}
              doneStatus={weekStatus[key] || {}}
              onToggleDone={(taskId) => handleToggleDone(key, taskId)}
              onUpdateGoal={(taskId, goal) => handleUpdateGoal(key, taskId, goal)}
              onDeleteTask={(taskId) => handleDeleteTask(key, taskId)}
              onAddTask={(title) => handleAddTask(key, title)}
              onMoveTask={(fromDay, taskId) => handleMoveTask(fromDay, key, taskId)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

