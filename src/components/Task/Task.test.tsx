// src/components/Task/Task.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Task from './Task';
import '@testing-library/jest-dom';

describe('Task Component', () => {
  const mockTask = {
    id: '1',
    text: 'Test Task',
    date: '2024-01-01',
    order: 0
  };

  const mockProps = {
    task: mockTask,
    onUpdate: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Тестируем отображение задачи
  test('renders task with correct text', () => {
    render(<Task {...mockProps} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  // Тестируем редактирование задачи
  test('enters edit mode on double click', () => {
    render(<Task {...mockProps} />);
    
    const taskText = screen.getByText('Test Task');
    fireEvent.doubleClick(taskText);
    
    // Проверяем, что появилось поле ввода
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Test Task');
  });

  // Тестируем удаление задачи
  test('calls delete handler when delete button is clicked', () => {
    render(<Task {...mockProps} />);
    
    const deleteButton = screen.getByText('×');
    fireEvent.click(deleteButton);
    
    expect(mockProps.onDelete).toHaveBeenCalledWith(mockTask.id);
  });

  // Тестируем сохранение изменений
  test('saves changes on blur and enter key', () => {
    render(<Task {...mockProps} />);
    
    // Входим в режим редактирования
    fireEvent.doubleClick(screen.getByText('Test Task'));
    const input = screen.getByRole('textbox');
    
    // Меняем текст и нажимаем Enter
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockProps.onUpdate).toHaveBeenCalledWith(mockTask.id, 'Updated Task');
  });
});