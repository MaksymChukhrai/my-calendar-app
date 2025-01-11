// src/components/Calendar/Calendar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from './Calendar';
import '@testing-library/jest-dom';

describe('Calendar Component', () => {
  // Тестируем базовый рендеринг календаря
  test('renders calendar grid with correct structure', () => {
    render(<Calendar />);
    
    // Проверяем наличие основных элементов календаря
    expect(screen.getByRole('grid')).toBeInTheDocument(); // Наличие grid структуры
    expect(screen.getAllByRole('gridcell')).toHaveLength(42); // 6 недель по 7 дней
    
    // Проверяем заголовки дней недели
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekDays.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  // Тестируем создание новой задачи
  test('creates new task when clicking on a day', async () => {
    render(<Calendar />);
    
    // Находим ячейку календаря и кликаем по ней
    const dayCell = screen.getAllByRole('gridcell')[10];
    fireEvent.click(dayCell);
    
    // Проверяем, что появилась новая задача с текстом "New task"
    expect(screen.getByText('New task')).toBeInTheDocument();
  });

  // Тестируем фильтрацию задач
  test('filters tasks based on search term', () => {
    render(<Calendar />);
    
    // Создаем задачу
    const dayCell = screen.getAllByRole('gridcell')[10];
    fireEvent.click(dayCell);
    
    // Вводим текст поиска
    const searchInput = screen.getByPlaceholderText('...search task');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    // Проверяем, что задача не видна при несовпадении поискового запроса
    expect(screen.queryByText('New task')).not.toBeInTheDocument();
  });
});
