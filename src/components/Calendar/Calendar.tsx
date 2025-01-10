// src/components/Calendar/Calendar.tsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import Filters from '../Filters/Filters';
import Task from '../Task/Task';
import { Task as TaskType, CalendarDayType} from '../../types/task';
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
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

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
        console.error('Error loading holidays:', error);
      }
    };

    fetchHolidays();
  }, [currentDate]);

  const generateDays = (month: number, year: number): CalendarDayType[] => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();

    return Array.from({ length: 42 }, (_, i): CalendarDayType => {
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
      }
      return {
        date: new Date(year, month, dayIndex),
        isCurrentMonth: true,
      };
    });
  };

  const handleCreateTask = (date: Date, event?: React.MouseEvent): void => {
    if (event) {
      event.stopPropagation();
    }
    if (isDragging) return;

    const dateStr = date.toISOString().split('T')[0];
    const tasksInDay = tasks.filter((t) => t.date === dateStr);
    
    if (tasksInDay.length >= 15) {
      alert('Maximum 15 tasks per day allowed');
      return;
    }

    const newTask: TaskType = {
      id: uuidv4(),
      text: 'New task',
      date: dateStr,
      order: tasksInDay.length,
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (taskId: string, newText: string): void => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, text: newText } : task
    ));
  };

  const handleDeleteTask = (taskId: string): void => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleSearch = (term: string): void => {
    setSearchTerm(term.toLowerCase());
  };

  const handlePreviousMonth = (): void => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = (): void => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const getFilteredTasks = (date: string): TaskType[] => {
    return tasks
      .filter(task => 
        task.date === date && 
        (searchTerm === '' || task.text.toLowerCase().includes(searchTerm))
      )
      .sort((a, b) => a.order - b.order);
  };

  const handleDragEnd = (result: DropResult): void => {
    setIsDragging(false);
    
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceDate = source.droppableId;
    const destDate = destination.droppableId;
    
    const updatedTasks = Array.from(tasks);
    const sourceTask = updatedTasks.filter(t => t.date === sourceDate);
    const [movedTask] = sourceTask.sort((a, b) => a.order - b.order).splice(source.index, 1);

    if (movedTask) {
      movedTask.date = destDate;
      const tasksInDestDay = updatedTasks.filter(t => t.date === destDate);
      tasksInDestDay.splice(destination.index, 0, movedTask);
      
      tasksInDestDay.forEach((task, index) => {
        task.order = index;
      });

      setTasks(updatedTasks);
    }
  };

  const handleDragStart = (): void => {
    setIsDragging(true);
  };

  const days = generateDays(currentDate.getMonth(), currentDate.getFullYear());

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <CalendarContainer>
        <Filters
          currentMonth={currentDate}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          onSearch={handleSearch}
        />
        <WeekDaysHeader>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </WeekDaysHeader>
        <CalendarGrid>
          {days.map(({ date, isCurrentMonth }, index) => {
            const dateString = date.toISOString().split('T')[0];
            const filteredTasks = getFilteredTasks(dateString);
            const holidayDate = new Date(date);
            holidayDate.setDate(holidayDate.getDate() + 1);
            const holidayDateString = holidayDate.toISOString().split('T')[0];
            const dayHolidays = holidays[holidayDateString] || [];

            return (
              <CalendarDay 
                key={index} 
                style={{ opacity: isCurrentMonth ? 1 : 0.5 }}
                onClick={(e) => handleCreateTask(date, e)}
              >
                <DayHeader>
                  <span className="day-number">{date.getDate()}</span>
                  {dayHolidays.map((holiday, i) => (
                    <span key={i} className="holiday-name">
                      {holiday}
                    </span>
                  ))}
                </DayHeader>
                <Droppable droppableId={dateString}>
                  {(provided) => (
                    <TaskList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {filteredTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Task
                                task={task}
                                onUpdate={handleUpdateTask}
                                onDelete={handleDeleteTask}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </TaskList>
                  )}
                </Droppable>
              </CalendarDay>
            );
          })}
        </CalendarGrid>
      </CalendarContainer>
    </DragDropContext>
  );
};

export default Calendar;
