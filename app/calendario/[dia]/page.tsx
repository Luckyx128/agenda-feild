"use client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch";
import "./dia.css";
import EventInfos from "../../components/eventInfos";
import Dialog from "@/app/components/dialog";
import CardInfo from "@/app/components/CardInfo"
type Info = {
  id: number;
  agent: string;
  descricao: string;
  empressa: string ;
  date: string;
  hora: string;
  hora_saida: string;
  createdAt: string;
  updatedAt: string;
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
  const diasDaSemana = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
  
  const { data, loading, error } = useFetch<Info[]>({
    method: "GET",
    param: null,
    url: `/api/event/${dia}`,
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

   if (loading) return <CardInfo tipo="info" titulo="CONSULTANDO LISTA DE EVENTOS DO DIA!" descricao="Eventos agendados para hoje ordenados pelo horário"/>;
    if (error) return <CardInfo tipo="erro" titulo="ERRO AO OBTER LISTA DE EVENTOS DO DIA!" descricao="Possivel erro no banco de dados, consultar admistração!"/>;
  return (
    <div className="dia-container">
      <div className="dia-semana">
          <h1 className="titulo-dia">
           {dateTaget.getUTCDate()}{" "}
        </h1>
        <small> - {diasDaSemana[dateTaget.getUTCDay()]}</small>
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
                    hora_saida={event.hora_saida}
                    
                    onClick={()=>dialogEditarEvento(event)}
                  />
                ))}
            </div>
          </section>
        </div>
      ))}
      {isOpen && typeof event == 'object'?(
        <Dialog 
          dateIni={new Date(event.date)}
          isOpen={isOpen}
          onClose={reload}
          preData={event}
          method="PUT"
          setIsOpen={setIsOpen}
          />):null}
    </div>
  );
}
