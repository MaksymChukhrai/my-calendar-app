import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Task from './Task';

describe('Task Component', () => {
  const mockTask = {
    id: 'test-id',
    text: 'Test Task',
    date: '2024-01-01',
    order: 0
  };

  const mockProps = {
    task: mockTask,
    onUpdate: vi.fn(),
    onDelete: vi.fn()
  };

  test('renders task text', () => {
    const { getByText } = render(<Task {...mockProps} />);
    expect(getByText('Test Task')).toBeInTheDocument();
  });

  test('enters edit mode for new task', () => {
    const newTask = { ...mockTask, text: 'New task' };
    const { getByPlaceholderText } = render(
      <Task {...mockProps} task={newTask} />
    );
    expect(getByPlaceholderText('enter a task...')).toBeInTheDocument();
  });

  test('handles task deletion', () => {
    const { getByText } = render(<Task {...mockProps} />);
    const deleteButton = getByText('×');
    fireEvent.click(deleteButton);
    expect(mockProps.onDelete).toHaveBeenCalledWith('test-id');
  });

  test('handles task editing', () => {
    const { getByText } = render(<Task {...mockProps} />);
    const taskText = getByText('Test Task');
    
    fireEvent.doubleClick(taskText);
    const input = document.querySelector('input');
    expect(input).toBeInTheDocument();
    
    if (input) {
      fireEvent.change(input, { target: { value: 'Updated Task' } });
      fireEvent.blur(input);
      expect(mockProps.onUpdate).toHaveBeenCalledWith('test-id', 'Updated Task');
    }
  });
});

