// src/components/Header/Header.test.tsx
import { render, screen } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  // Тестируем базовый рендеринг компонента
  test('renders header with all required elements', () => {
    render(<Header />);
    
    // Проверяем наличие логотипа
    expect(screen.getByAltText('Calendar Logo')).toBeInTheDocument();
    
    // Проверяем наличие названия
    expect(screen.getByText('Personal Calendar')).toBeInTheDocument();
    
    // Проверяем наличие секции Team Visible
    expect(screen.getByText('Team Visible')).toBeInTheDocument();
  });

  // Тестируем доступность
  test('meets accessibility requirements', () => {
    render(<Header />);
    
    // Проверяем роль header
    expect(screen.getByRole('banner')).toBeInTheDocument();
    
    // Проверяем, что логотип имеет альтернативный текст
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('alt', 'Calendar Logo');
  });
});