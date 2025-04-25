import React, { useState, useEffect } from "react";
import Dialog from "./dialog";
type CalendarioProps = {
  date: Date;
};

type Event = {
  id: number;
  agent: string;
  date: Date;
  hora: string;
  descricao: string;
  empressa: string;
};

export default function FullCalendar({ date }: CalendarioProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const currentData = new Date();
  const buscarEventos = async () => {
    const response = await fetch("/api/event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    return response.json();
  };

  useEffect(() => {
    buscarEventos()
      .then((data) => {
        console.log(data);
        setEvents(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isOpen]);

  const getDaysOfWeekInMonth = (dayOfWeek: number) => {
    const days = [];
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const semanasNoMesAtual = 7 - firstDayOfMonth.getDay();
    const quantidadeDeSemanasNoMesAnterior = 7 - semanasNoMesAtual;

    for (let i = 0; i < quantidadeDeSemanasNoMesAnterior; i++) {
      const diaDoMesAnterior = new Date(currentYear, currentMonth, 0 - i);
      if (diaDoMesAnterior.getDay() === dayOfWeek) {
        days.push(diaDoMesAnterior);
      }
    }
    for (let day = 1; day <= 31; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      if (currentDate.getMonth() !== currentMonth) break;
      if (currentDate.getDay() === dayOfWeek) {
        days.push(new Date(currentYear, currentMonth, day));
      }
    }
    return days;
  };
  const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(true);
  };
  return (
    <div className="parent">
      {diasDaSemana.map((semana, index) => (
        <div key={index} className="calendar-column">
          <div key={index} className="calendar-header">
            {semana}
          </div>
          {getDaysOfWeekInMonth(index).map((dia, index) => (
            <div
              key={index}
              className={
                "calendar-day " +
                (date.getMonth() !== dia.getMonth()
                  ? "not-current-month "
                  : "current-month ") +
                (`${selectedDate?.getDate()} - ${selectedDate?.getMonth()}` ===
                `${dia.getDate()} - ${dia.getMonth()}` 
                  ? "selected "
                  : "")
              }
              onClick={() => handleDateClick(dia)}
            >
            
               
              <span
                className={
                  "day-label " +
                  (`${currentData.getDate()} - ${currentData.getMonth()}` ===
                  `${dia.getDate()} - ${dia.getMonth()}`
                    ? "today-label "
                    : "")
                }
              >
                {dia.getDate()}{" "}
              </span>
              <span>
              {events.map((event) => (
             ((new Date(event.date).getUTCDate() === dia.getDate() && new Date(event.date).getUTCMonth() === dia.getMonth() &&
               new Date(event.date).getUTCFullYear() === dia.getFullYear()
             ) ? (
               <>
               <small key={event.id}  className="agent-letter">{event.agent[0]}</small>
               

               </>
            
             ) : null)
                 
             ))}
             </span>
            </div>
          ))}
        </div>
      ))}
      {isOpen ? (
        <Dialog
          dateIni={selectedDate || date}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </div>
  );
}
