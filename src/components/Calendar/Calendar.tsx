// src/components/Calendar/Calendar.tsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Filters from '../Filters/Filters';
import Task from '../Task/Task';
import { Task as TaskType } from '../../types/task';
import {
  CalendarGrid,
  CalendarDay,
  DayHeader,
  TaskList,
  WeekDaysHeader,
  CalendarContainer,
} from './Calendar.styles';

const Calendar: React.FC = () => {
  const [holidays, setHolidays] = useState<Record<string, string[]>>({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const year = currentDate.getFullYear();
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/UA`);
        const data = await response.json();

        const holidaysMap: Record<string, string[]> = {};
        data.forEach((holiday: { date: string; localName: string }) => {
          holidaysMap[holiday.date] = holidaysMap[holiday.date] || [];
          holidaysMap[holiday.date].push(holiday.localName);
        });

        setHolidays(holidaysMap);
      } catch (error) {
        console.error('Ошибка при загрузке праздников:', error);
      }
    };

    fetchHolidays();
  }, [currentDate]);

  const handleCreateTask = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const newTask: TaskType = {
      id: uuidv4(),
      text: '',
      date: dateStr, // Дата задачи привязывается к выбранному дню
      order: tasks.filter((t) => t.date === dateStr).length, // Учитываются задачи для конкретного дня
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (taskId: string, newText: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, text: newText } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Добавленная функция handleSearch
  const handleSearch = (searchTerm: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({
        ...task,
        hidden: !task.text.toLowerCase().includes(searchTerm.toLowerCase()),
      }))
    );
  };

  const generateDays = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();

    const days = Array.from({ length: 42 }, (_, i) => {
      const dayIndex = i - firstDay + 1;
      if (dayIndex <= 0) {
        return {
          date: new Date(year, month - 1, previousMonthDays + dayIndex),
          isCurrentMonth: false,
        };
      } else if (dayIndex > daysInMonth) {
        return {
          date: new Date(year, month + 1, dayIndex - daysInMonth),
          isCurrentMonth: false,
        };
      } else {
        return {
          date: new Date(year, month, dayIndex),
          isCurrentMonth: true,
        };
      }
    });

    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const days = generateDays(currentDate.getMonth(), currentDate.getFullYear());

  return (
    <CalendarContainer>
      <Filters
        currentMonth={currentDate}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onSearch={handleSearch} // Передача функции handleSearch
      />
      <WeekDaysHeader>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </WeekDaysHeader>
      <CalendarGrid>
        {days.map(({ date, isCurrentMonth }, index) => {
          const holidayDate = new Date(date);
          holidayDate.setDate(holidayDate.getDate() + 1);
          const holidayDateString = holidayDate.toISOString().split('T')[0];
          const taskDateString = date.toISOString().split('T')[0];
          const dayHolidays = holidays[holidayDateString] || [];

          return (
            <CalendarDay 
              key={index} 
              style={{ opacity: isCurrentMonth ? 1 : 0.5 }}
              onClick={() => handleCreateTask(date)}
            >
              <DayHeader>
                <span className="day-number">{date.getDate()}</span>
                {dayHolidays.map((holiday, i) => (
                  <span key={i} className="holiday-name">
                    {holiday}
                  </span>
                ))}
              </DayHeader>
              <TaskList>
                {tasks
                  .filter((task) => task.date === taskDateString && !task.hidden) // Фильтрация задач по дате и поиску
                  .sort((a, b) => a.order - b.order)
                  .map((task) => (
                    <Task
                      key={task.id}
                      task={task}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                    />
                  ))}
              </TaskList>
            </CalendarDay>
          );
        })}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;
