import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/index";
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
} from "./Filters.styles";

interface FiltersProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSearch: (searchTerm: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Добавляем debounce эффект для поиска
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const formatMonthAndYear = (date: Date) => {
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <FiltersWrapper>
      <Navigation>
        <NavigationButton className="arrow-up" onClick={onPreviousMonth}>
          <svg width="24" height="24">
            <use href={`${BASE_URL}sprite.svg#arrow-up`} />
          </svg>
        </NavigationButton>
        <NavigationButton className="arrow-down" onClick={onNextMonth}>
          <svg width="24" height="24">
            <use href={`${BASE_URL}sprite.svg#arrow-up`} />
          </svg>
        </NavigationButton>
      </Navigation>
      <Title>{formatMonthAndYear(currentMonth)}</Title>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="...search task"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <SearchIcon>
          <svg width="30" height="30">
            <use href={`${BASE_URL}sprite.svg#search-icon`} />
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
