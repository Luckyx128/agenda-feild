"use client";
import { useState } from "react";
import FullCalendar from "../components/fullCalendar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AddIcon from "@mui/icons-material/Add";

export default function Calendario() {
  const [date, setDate] = useState(new Date());

  
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };
  
  return (
    <>
      
      <div
        className="action"
        
      >
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
          className="btn"
          onClick={() => {
            /* Add event creation logic here */
          }}
        >
          <AddIcon /> Criar Evento
        </button>
      </div>

      <FullCalendar date={date} />
    </>
  );
}
