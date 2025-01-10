import styled from "@emotion/styled";
export const CalendarContainer = styled.div`
  background-color: #edeff1;
`;

export const CalendarWrapper = styled.div`
  padding: 24px;
  width: 100%;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  padding: 16px;
  background-color: #edeff1;
`;

export const CalendarDay = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 120px;
  border: 1px solid #dfe1e6;
  background-color: #e3e5e6;
  padding: 8px;
  border-radius: 3px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #fafbfc;
  }

  /* Стиль для дней не текущего месяца */
  &.not-current-month {
    opacity: 0.5;
    background-color: #ebebeb;
  }

  /* Стиль для текущего дня */
  &.current-day {
    border: 2px solid #0052cc;
  }
`;

export const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  .day-number {
    font-weight: 500;
    color: #172b4d;
    font-size: 14px;
  }
  .day-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .cards-count {
    color: #6b778c; // менее контрастный цвет
    font-size: 12px;
  }
  .holiday {
    color: #ff5630;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .holiday-name {
    font-size: 0.8rem;
    color: red;
    display: block;
    margin-top: 2px;
    margin-left: 10px;
  }
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  flex-grow: 1;

  /* Стилизация скроллбара */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f4f5f7;
  }

  &::-webkit-scrollbar-thumb {
    background: #dfe1e6;
    border-radius: 2px;
  }
`;

export const WeekDaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  padding: 0 16px;
  margin-bottom: 8px;
  background-color: #edeff1;

  div {
    text-align: center;
    font-weight: 500;
    color: #767a7b;
    padding: 8px;
    font-size: 14px;
  }
`;

// Styles for tasks 
export const Task = styled.div`
  background-color: #ffffff;
  border-radius: 3px;
  padding: 8px;
  font-size: 14px;
  color: #172b4d;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 4px;
  cursor: grab;

  &:hover {
    background-color: #ebecf0;
  }

  &:active {
    cursor: grabbing;
  }
`;

// Styles for holidays
export const Holiday = styled.div`
  font-size: 12px;
  color: #ff5630;
  padding: 2px 4px;
  background-color: #ffebe6;
  border-radius: 3px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Styles for navigation buttons by month 
export const NavigationButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 0 16px;

  button {
    padding: 8px 16px;
    border: 1px solid #dfe1e6;
    border-radius: 3px;
    background-color: #ffffff;
    color: rgb(76, 93, 121);
    cursor: pointer;

    &:hover {
      background-color: #fafbfc;
    }
  }
`;
