export interface Task {
  id: string;
  title: string;
  count: number; // Quantas vezes foi feita (não reseta)
  goal?: number; // Meta opcional (ex: 200)
}

export interface DayStatus {
  [taskId: string]: boolean; // true = done naquele dia
}

export interface WeekStatus {
  [day: string]: DayStatus; // Ex: { "segunda": { "task1": true } }
}

export interface TasksByDay {
  [day: string]: Task[]; // Tarefas por dia
}

export interface TaskCounts {
  [title: string]: number; // Contador global por título de tarefa
}

export interface TaskGoals {
  [title: string]: number | undefined; // Meta global por título de tarefa
}

export type DayOfWeek = 
  | "segunda"
  | "terca"
  | "quarta"
  | "quinta"
  | "sexta"
  | "sabado"
  | "domingo";

