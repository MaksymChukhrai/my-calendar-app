import { render, screen } from '@testing-library/react';
import Calendar from './Calendar';

describe('Calendar Component', () => {
  test('renders the calendar grid', () => {
    render(<Calendar />);
    // Должно быть 42 ячейки (6 недель * 7 дней)
    const days = screen.getAllByRole('generic').filter(element => 
      element.className.includes('emotion')
    );
    expect(days.length).toBeGreaterThan(40);
  });

  test('renders weekday headers', () => {
    render(<Calendar />);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekDays.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });
});
