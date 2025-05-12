import React, { useState, useEffect } from "react";
import { getDaysOfWeekInMonth } from "../hooks/getDaysOfWeek";
import EventIcon from '@mui/icons-material/Event';
import Dialog from "./dialog";
import ViewDayIcon from '@mui/icons-material/ViewDay';
import './fullCalendar.css'
type CalendarioProps = {
  date: Date;
  selectedDate:Date | null
  setSelectedDate:(value:Date)=> void;
};

type Event = {
  id: number;
  agent: string;
  date: Date;
  hora: string;
  descricao: string;
  empressa: string;
};

export default function FullCalendar({ date,selectedDate,setSelectedDate }: CalendarioProps) {
 
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
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
  const handleContextMenu = (e: React.MouseEvent,date:Date) => {
    e.preventDefault();
    setSelectedDate(date);
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setMenuVisible(true);
  };

  const handleClick = () => {
    setMenuVisible(false);
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

  const getDaysOfWeek = getDaysOfWeekInMonth
  const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  
  return (
    <div className="parent" onClick={handleClick}>
      {menuVisible && (
              <ul
                className="context-menu"
                style={{
                  top: menuPosition.y,
                  left: menuPosition.x,
      
                  listStyle: "none",
                  margin: 0,
                  zIndex: 1000,
                }}
              >
                <li className="context-option" onClick={() => window.location.href = `/calendario/${selectedDate?.toISOString().split('T')[0]}`}><ViewDayIcon/>Ver Eventos</li>
                <li className="context-option" onClick={() => setIsOpen(true)}><EventIcon/>Criar Evento</li>
              </ul>
            )}
      {diasDaSemana.map((semana, index) => (
        <div key={index} className="calendar-column">
          <div key={index} className="calendar-header">
            {semana}
          </div>
          {getDaysOfWeek(index, date).map((dia, index) => (
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
              
              onContextMenu={(e) => handleContextMenu(e, dia)}
              onClick={()=>setSelectedDate(dia)}
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
                {events.map((event) =>
                  new Date(event.date).getUTCDate() === dia.getDate() &&
                  new Date(event.date).getUTCMonth() === dia.getMonth() &&
                  new Date(event.date).getUTCFullYear() ===
                    dia.getFullYear() ? (
                    <small key={event.id} className="agent-letter">
                      {event.agent[0]}
                    </small>
                  ) : null
                )}
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
          preData={null}
          method="POST"
        />
      ) : null}
    </div>
  );
}
