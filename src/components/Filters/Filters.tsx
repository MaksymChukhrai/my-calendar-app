// src\components\Filters\Filters.tsx

import React, { useState } from 'react';
import {
  FiltersWrapper,
  Navigation,
  NavigationButton,
  Title,
  TogglePeriod,
  ViewToggle,
  SearchWrapper,
  SearchInput,
  SearchIcon,
} from './Filters.styles';

interface FiltersProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSearch: (searchTerm: string) => void; // Добавляем onSearch
}

const Filters: React.FC<FiltersProps> = ({ currentMonth, onPreviousMonth, onNextMonth }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Search term:', searchTerm); // Замените на логику фильтрации
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

    // Преобразование месяца и года
    const formatMonthAndYear = (date: Date) => {
      return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    };

  return (
    <FiltersWrapper>
      <Navigation>
        <NavigationButton className="arrow-up" onClick={onPreviousMonth}>
          <svg width="24" height="24">
            <use href="/sprite.svg#arrow-up" />
          </svg>
        </NavigationButton>
        <NavigationButton className="arrow-down" onClick={onNextMonth}>
          <svg width="24" height="24">
            <use href="/sprite.svg#arrow-up" />
          </svg>
        </NavigationButton>
      </Navigation>
      <Title>{formatMonthAndYear(currentMonth)}</Title>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="...search task"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SearchIcon onClick={handleSearch}>
          <svg width="30" height="30">
            <use href="/sprite.svg#search-icon" />
          </svg>
        </SearchIcon>
      </SearchWrapper>
      <TogglePeriod>
        <ViewToggle>Week</ViewToggle>
        <ViewToggle>Month</ViewToggle>
      </TogglePeriod>
    </FiltersWrapper>
  );
};

export default Filters;
