// src/components/Task/Task.tsx
import React, { useState, useEffect } from 'react';
import { Task as TaskType } from '../../types/task';
import { TaskWrapper, TaskText, TaskInput, DeleteButton } from './Task.styles';

interface TaskProps {
  task: TaskType;
  onUpdate: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(task.text === 'New task');
  const [text, setText] = useState(task.text);
  const [isNewTask, setIsNewTask] = useState(task.text === 'New task');

  useEffect(() => {
    if (isNewTask && isEditing) {
      setText('');
      setIsNewTask(false);
    }
  }, [isEditing, isNewTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    e.stopPropagation();
    finishEditing();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      finishEditing();
    }
    if (e.key === 'Escape') {
      if (isNewTask) {
        onDelete(task.id);
      } else {
        setText(task.text);
        setIsEditing(false);
      }
    }
  };

  const finishEditing = () => {
    setIsEditing(false);
    const trimmedText = text.trim();
    if (trimmedText) {
      onUpdate(task.id, trimmedText);
    } else if (isNewTask) {
      onDelete(task.id);
    } else {
      setText(task.text);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <TaskWrapper onClick={(e) => e.stopPropagation()}>
      {isEditing ? (
        <TaskInput
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          placeholder="enter a task..."
        />
      ) : (
        <>
          <TaskText onDoubleClick={handleDoubleClick}>{text}</TaskText>
          <DeleteButton onClick={handleDelete}>×</DeleteButton>
        </>
      )}
    </TaskWrapper>
  );
};

export default Task;

