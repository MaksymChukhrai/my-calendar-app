// src/components/Filters/Filters.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './Filters';
import '@testing-library/jest-dom';

describe('Filters Component', () => {
  const mockProps = {
    currentMonth: new Date(2024, 0, 1), // January 2024
    onPreviousMonth: jest.fn(),
    onNextMonth: jest.fn(),
    onSearch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Тестируем корректное отображение месяца и года
  test('displays correct month and year', () => {
    render(<Filters {...mockProps} />);
    expect(screen.getByText('January 2024')).toBeInTheDocument();
  });

  // Тестируем навигацию по месяцам
  test('handles month navigation correctly', () => {
    render(<Filters {...mockProps} />);
    
    // Клик по кнопке предыдущего месяца
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(mockProps.onPreviousMonth).toHaveBeenCalledTimes(1);
    
    // Клик по кнопке следующего месяца
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(mockProps.onNextMonth).toHaveBeenCalledTimes(1);
  });

  // Тестируем поиск
  test('handles search input correctly', () => {
    render(<Filters {...mockProps} />);
    
    const searchInput = screen.getByPlaceholderText('...search task');
    fireEvent.change(searchInput, { target: { value: 'test task' } });
    
    // Проверяем, что коллбэк поиска вызван с правильным значением
    expect(mockProps.onSearch).toHaveBeenCalledWith('test task');
  });
});
