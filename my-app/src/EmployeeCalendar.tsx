
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addWeeks, addMonths, subMonths, eachDayOfInterval, isSameDay } from 'date-fns';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'year'

  const handleChangeView = (newView: React.SetStateAction<string>) => {
    setView(newView);
  };

  const handlePrev = () => {
    setCurrentDate((prev) => (view === 'month' ? subMonths(prev, 1) : addWeeks(prev, -1)));
  };

  const handleNext = () => {
    setCurrentDate((prev) => (view === 'month' ? addMonths(prev, 1) : addWeeks(prev, 1)));
  };

  const renderMonthView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });
  
    return (
      <div className="calendar-month"> {/* Wrapping in a parent div */}
        {days.map((day) => (
          <div key={day.getTime()} className="calendar-day"> {/* Using timestamp */}
            {format(day, 'd')}
          </div>
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="calendar-week">
        {days.map((day) => (
          <div key={day.getTime()} className="calendar-day">
            {format(day, 'EEEE, d')}
          </div>
        ))}
      </div>
    );
  };

  const renderYearView = () => {
    const months = Array.from({ length: 12 }, (_, index) => new Date(currentDate.getFullYear(), index, 1));

    return (
      <div className="calendar-year">
        {months.map((month) => (
          <div key={month.getTime()} className="calendar-month-item">
            {format(month, 'MMMM')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Calendar</h1>
      <div>
        <button onClick={() => handleChangeView('month')}>Month</button>
        <button onClick={() => handleChangeView('week')}>Week</button>
        <button onClick={() => handleChangeView('year')}>Year</button>
      </div>
      <div>
        <button onClick={handlePrev}>Previous</button>
        <span>{format(currentDate, view === 'month' ? 'MMMM yyyy' : view === 'week' ? 'MMMM d' : 'yyyy')}</span>
        <button onClick={handleNext}>Next</button>
      </div>
      {view === 'month' && renderMonthView()}
      {view === 'week' && renderWeekView()}
      {view === 'year' && renderYearView()}
    </div>
  );
};

const EmployeeCalendar = () => <Calendar />;

export default EmployeeCalendar;
