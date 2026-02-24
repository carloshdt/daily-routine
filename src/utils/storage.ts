import { Task, WeekStatus, TasksByDay, TaskCounts, TaskGoals } from '../types';

const TASKS_BY_DAY_KEY = 'daily-routine-tasks-by-day';
const TASK_COUNTS_KEY = 'daily-routine-task-counts';
const TASK_GOALS_KEY = 'daily-routine-task-goals';
const WEEK_STATUS_KEY = 'daily-routine-week-status';

export const saveTasksByDay = (tasksByDay: TasksByDay): void => {
  localStorage.setItem(TASKS_BY_DAY_KEY, JSON.stringify(tasksByDay));
};

export const loadTasksByDay = (): TasksByDay => {
  const stored = localStorage.getItem(TASKS_BY_DAY_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {};
};

export const saveTaskCounts = (counts: TaskCounts): void => {
  localStorage.setItem(TASK_COUNTS_KEY, JSON.stringify(counts));
};

export const loadTaskCounts = (): TaskCounts => {
  const stored = localStorage.getItem(TASK_COUNTS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {};
};

export const saveTaskGoals = (goals: TaskGoals): void => {
  localStorage.setItem(TASK_GOALS_KEY, JSON.stringify(goals));
};

export const loadTaskGoals = (): TaskGoals => {
  const stored = localStorage.getItem(TASK_GOALS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {};
};

export const saveWeekStatus = (status: WeekStatus): void => {
  localStorage.setItem(WEEK_STATUS_KEY, JSON.stringify(status));
};

export const loadWeekStatus = (): WeekStatus => {
  const stored = localStorage.getItem(WEEK_STATUS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {};
};

export const resetWeekStatus = (): WeekStatus => {
  const emptyStatus: WeekStatus = {};
  saveWeekStatus(emptyStatus);
  return emptyStatus;
};

