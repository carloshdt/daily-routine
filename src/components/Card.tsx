import { useState } from 'react';
import { Task, DayOfWeek } from '../types';

interface CardProps {
  task: Task;
  isDone: boolean;
  onToggle: () => void;
  onUpdateGoal: (goal: number | undefined) => void;
  onDelete: () => void;
  day: DayOfWeek;
}

export const Card = ({ task, isDone, onToggle, onUpdateGoal, onDelete, day }: CardProps) => {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(task.goal?.toString() || '');
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    // Não iniciar drag se estiver clicando em botões ou inputs
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('.card-count')) {
      e.preventDefault();
      return;
    }

    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('fromDay', day);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    e.currentTarget.style.opacity = '1';
  };

  const handleGoalSubmit = (e?: React.FormEvent) => {
    if (e) e.stopPropagation();
    const goalValue = goalInput.trim() === '' ? undefined : parseInt(goalInput, 10);
    if (goalValue !== undefined && (isNaN(goalValue) || goalValue < 0)) {
      return;
    }
    onUpdateGoal(goalValue);
    setIsEditingGoal(false);
  };

  const handleDeleteGoal = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateGoal(undefined);
    setGoalInput('');
    setIsEditingGoal(false);
  };

  const handleGoalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGoalSubmit(e);
    } else if (e.key === 'Escape') {
      setGoalInput(task.goal?.toString() || '');
      setIsEditingGoal(false);
    }
  };

  const displayCount = task.goal 
    ? `${task.count}/${task.goal}` 
    : `${task.count}x`;

  const handleClick = (e: React.MouseEvent) => {
    // Não marcar como done se foi um drag ou se clicou em elementos interativos
    if (isDragging) {
      return;
    }
    const target = e.target as HTMLElement;
    if (!target.closest('button') && !target.closest('input') && !target.closest('.card-count')) {
      onToggle();
    }
  };

  return (
    <div
      className={`card ${isDone ? 'card-done' : ''} ${isDragging ? 'card-dragging' : ''}`}
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card-content">
        <h3 className="card-title">{task.title}</h3>
        <div className="card-count-container">
          {isEditingGoal ? (
            <div className="goal-edit-container" onClick={(e) => e.stopPropagation()}>
              <input
                type="number"
                className="goal-input"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                onBlur={handleGoalSubmit}
                onKeyDown={handleGoalKeyDown}
                placeholder="Goal (leave empty to remove)"
                min="0"
                autoFocus
              />
              {task.goal && (
                <button
                  className="goal-delete-button"
                  onClick={handleDeleteGoal}
                  title="Remove goal"
                >
                  ×
                </button>
              )}
            </div>
          ) : (
            <div 
              className="card-count"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingGoal(true);
              }}
              title="Click to edit goal"
            >
              <span className="count-label">Done:</span>
              <span className="count-value">{displayCount}</span>
              {task.goal && (
                <button
                  className="goal-remove-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteGoal(e);
                  }}
                  title="Remove goal"
                >
                  ×
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {isDone && (
        <div className="card-checkmark">✓</div>
      )}
      <button
        className="card-delete-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="Delete task"
      >
        🗑️
      </button>
    </div>
  );
};

