import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Header from './Header';

describe('Header Component', () => {
  test('renders company name and title', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Travidux, LLC')).toBeInTheDocument();
    expect(getByText('TeamSync Calendar')).toBeInTheDocument();
  });

  test('renders team visible section', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Team Visible')).toBeInTheDocument();
  });

  test('renders action buttons', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Calendar')).toBeInTheDocument();
    expect(getByText('Share')).toBeInTheDocument();
  });

  test('renders logo image', () => {
    const { container } = render(<Header />);
    const logoImg = container.querySelector('.logo-img');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg?.getAttribute('alt')).toBe('Airplane Icon');
  });
});
