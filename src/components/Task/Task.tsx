import React, { useState } from 'react';
import { Task as TaskType } from '../../types/task';
import { TaskWrapper, TaskText, TaskInput, DeleteButton } from './Task.styles';

interface TaskProps {
  task: TaskType;
  onUpdate: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(task.text === 'New task');
  const [text, setText] = useState(task.text || 'New task');

  // Функция обработки изменения текста в поле ввода
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    console.log('Current input text:', newText);  // Логируем текущий текст
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    if (text === 'New task') {
      setText('');  // Если текст "Новая задача", заменим на пустую строку
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (text.trim()) {
      onUpdate(task.id, text);
    } else {
      onDelete(task.id); // Удаляем задачу, если текст пустой
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (text.trim()) {
        onUpdate(task.id, text);
      } else {
        onDelete(task.id);
      }
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setText(task.text); // Восстановить исходный текст
      if (text.trim() === '') {
        onDelete(task.id);
      }
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
          onChange={handleChange}  // Используем обработчик с логированием
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

