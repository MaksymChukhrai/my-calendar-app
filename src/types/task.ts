// src\types\task.ts
export interface Task {
    id: string;
    text: string;
    date: string;
    order: number;
    hidden?: boolean; // Добавляем поле hidden
  }