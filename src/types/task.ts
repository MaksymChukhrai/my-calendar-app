import { DropResult, DraggableLocation } from "@hello-pangea/dnd";
// Basic task interface
export interface Task {
  id: string;
  text: string;
  date: string;
  order: number;
  hidden?: boolean;
}

// Types for holidays
export interface Holiday {
  date: string;
  localName: string;
}

export interface HolidaysMap {
  [key: string]: string[];
}

// Type for calendar day
export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}

// Props for the Task component
export interface TaskProps {
  task: Task;
  onUpdate: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

// Props for the Filters component
export interface FiltersProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSearch: (searchTerm: string) => void;
}

// Result of drag and drop operation
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
