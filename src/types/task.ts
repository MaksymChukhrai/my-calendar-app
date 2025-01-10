// src/types/task.ts
import { DropResult, DraggableLocation } from '@hello-pangea/dnd';
// Базовый интерфейс задачи
export interface Task {
  id: string;
  text: string;
  date: string;
  order: number;
  hidden?: boolean;
}

// Типы для праздников
export interface Holiday {
  date: string;
  localName: string;
}

export interface HolidaysMap {
  [key: string]: string[];
}

// Тип для дня календаря
export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}

// Пропсы для компонента Task
export interface TaskProps {
  task: Task;
  onUpdate: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

// Пропсы для компонента Filters
export interface FiltersProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSearch: (searchTerm: string) => void;
}

// Результат операции drag and drop
export interface DragResult {
  draggableId: string;
  type: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  } | null;
}

export interface CalendarDayType {
  date: Date;
  isCurrentMonth: boolean;
}

export interface DragEndResult extends DropResult {
  source: DraggableLocation;
  destination: DraggableLocation | null;
}