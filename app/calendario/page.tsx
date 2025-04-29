"use client";
import { useState } from "react";
import FullCalendar from "../components/fullCalendar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AddIcon from "@mui/icons-material/Add";

type layout = `calendar` | `dia`;

export default function Calendario() {
  const [date, setDate] = useState(new Date());
  const [layout, setLayout] = useState<layout>("calendar");
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setMenuVisible(true);
  };

  const handleClick = () => {
    setMenuVisible(false);
  };
  return (
    <>
     {menuVisible && (
        <ul className="context-menu"
          style={{
            top: menuPosition.y,
            left: menuPosition.x,
            
            listStyle: 'none',
            margin: 0,
            zIndex: 1000,
          }}
        >
          <li onClick={() => alert('Opção 1 clicada')}>Opção 1</li>
          <li onClick={() => alert('Opção 2 clicada')}>Opção 2</li>
        </ul>
      )}
      <div className="action" onClick={handleClick} onContextMenu={handleContextMenu}>
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
        <button
          className="btn-layout"
          onClick={() => {
            setLayout("dia");
          }}
        >
          {" "}
          Dia
        </button>
        <button
          className="btn-layout"
          onClick={() => {
            setLayout("calendar");
          }}
        >
          {" "}
          Mes
        </button>
      </div>
      {layout === "calendar" ? (
        <FullCalendar date={date} />
      ) : (
        <div className="dia">
          <h1>Dia</h1>
          <p>Conteudo do dia</p>
        </div>
      )}
    </>
  );
}
