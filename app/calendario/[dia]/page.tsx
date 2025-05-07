// Use client é obrigatório para usar hooks como useParams
"use client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch";
import "./dia.css";
import EventInfos from "../../components/eventInfos";
import Dialog from "@/app/components/dialog";

type Info = {
  id: number;
  agent: string;
  descricao: string;
  empressa: string ;
  date: string; // ISO date string
  hora: string; // formato "HH:mm"
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export default function Dia() {
  const date = new Date();
  const { hora } = {
    hora: date.getHours().toString().padStart(2, "0"),
    // minuto: date.getMinutes().toString().padStart(2, "0"),
  };
  const { dia } = useParams();
  let dateTaget = new Date()
  if( typeof dia === 'string'){
	   dateTaget = new Date(dia);

  }
  const [eventsList, setEventsList] = useState<Info[]>();
  const [event,setEvent] = useState<Info>();
  const [isOpen,setIsOpen] = useState<boolean>(false)
  const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  
  const { data, loading, error } = useFetch<Info[]>({
    method: "GET",
    param: null,
    url: `/event/${dia}`,
  });
  const dialogEditarEvento = (evento:Info) => {
      setEvent(evento)
      setIsOpen(true)
      console.log(isOpen)
  }
  const horaFormatada = (index: number) => {
    return index + 1 < 10 ? "0" + (index + 1) : index + 1 + "";
  };
  const reload = () => {

    window.location.reload();
  }
  useEffect(() => {
    if (data) setEventsList(data);
  }, [data, eventsList]);

  if (loading) {
    return <div>Carregando</div>;
  }
  if (error) {
    return <div>Erro</div>;
  }
  return (
    <div className="dia-container">
      <div className="dia-semana">
        <h1>
          {diasDaSemana[dateTaget.getUTCDay()]} - {dateTaget.getUTCDate()}{" "}
        </h1>
      </div>
      {Array.from({ length: 24 }, (_, index) => (
        <div className="hora" key={index}>
          <h2>{horaFormatada(index)}</h2>
          <section
            className={
              horaFormatada(index) == hora ? "hora-row-active" : "hora-row"
            }
          >
            <div className="after">
              {eventsList
                ?.filter(
                  (event) =>
                    event.hora.split(':')[0] === horaFormatada(index)
                )
                .map((event) => (
                  <EventInfos
                    key={event.id}
                    empresa={event.empressa ?? "Empresa não informada"}
                    agente={event.agent}
                    hora={event.hora}
                    onClick={()=>dialogEditarEvento(event)}
                  />
                ))}
            </div>
          </section>
        </div>
      ))}
      <p>Dia is a component that represents the agenda for {dia}</p>
      {isOpen && typeof event == 'object'?(
        <Dialog 
          dateIni={new Date(event.date)}
          isOpen={isOpen}
          onClose={reload}
          preData={event}
          method="PUT"
          />):null}
    </div>
  );
}
