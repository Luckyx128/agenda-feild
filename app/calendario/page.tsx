"use client";
import { useState } from "react";
import FullCalendar from "../components/fullCalendar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ViewDayIcon from '@mui/icons-material/ViewDay';

export default function Calendario() {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };
  
  return (
    <>
      
      <div className="action">
        <button
          className="btn"
          onClick={() =>
            handleDateChange(new Date(date.setMonth(date.getMonth() - 1)))
          }
        >
          <NavigateBeforeIcon />
        </button>
        <span className="date">
          {date.toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          className="btn"
          onClick={() =>
            handleDateChange(new Date(date.setMonth(date.getMonth() + 1)))
          }
        >
          <NavigateNextIcon />
        </button>

        <button
          className={"btn " + (selectedDate ? 'activo' : 'not') }
          onClick={() => selectedDate ? window.location.href = `/calendario/${selectedDate?.toISOString().split('T')[0]}`:null}
        >
          <ViewDayIcon /> Ver dia selecionado
        </button>
      </div>

      <FullCalendar date={date} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </>
  );
}
