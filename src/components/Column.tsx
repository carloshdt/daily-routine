import { Task, DayOfWeek } from '../types';
import { Card } from './Card';
import { AddTask } from './AddTask';

interface ColumnProps {
  day: DayOfWeek;
  dayLabel: string;
  tasks: Task[];
  doneStatus: { [taskId: string]: boolean };
  onToggleDone: (taskId: string) => void;
  onUpdateGoal: (taskId: string, goal: number | undefined) => void;
  onDeleteTask: (taskId: string) => void;
  onAddTask: (title: string) => void;
  onMoveTask: (fromDay: DayOfWeek, taskId: string) => void;
}

export const Column = ({ 
  day, 
  dayLabel, 
  tasks, 
  doneStatus, 
  onToggleDone,
  onUpdateGoal,
  onDeleteTask,
  onAddTask,
  onMoveTask
}: ColumnProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('column-drag-over');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('column-drag-over');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('column-drag-over');
    
    const fromDay = e.dataTransfer.getData('fromDay') as DayOfWeek;
    const taskId = e.dataTransfer.getData('taskId');
    
    if (fromDay && taskId) {
      onMoveTask(fromDay, taskId);
    }
  };

  return (
    <div 
      className="column"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2 className="column-title">{dayLabel}</h2>
      <div className="add-task-column">
        <AddTask onAdd={(title) => onAddTask(title)} />
      </div>
      <div className="column-cards">
        {tasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            isDone={doneStatus[task.id] || false}
            onToggle={() => onToggleDone(task.id)}
            onUpdateGoal={(goal) => onUpdateGoal(task.id, goal)}
            onDelete={() => onDeleteTask(task.id)}
            day={day}
          />
        ))}
      </div>
    </div>
  );
};

