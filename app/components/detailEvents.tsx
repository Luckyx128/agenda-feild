type Event = {
  id: number;
  agent: string;
  date: string;
  hora: string;
  empressa: string;
  descricao: string;
  createdAt: string;
  updatedAt: string;
};

type PropsDetailEvent = {
  evento: Event;
};

export default function DetailEvent({ evento }: PropsDetailEvent) {

   const converterData = (data:string) => {
      const dataSplit = data.split('T')[0].split('-')

      const dia = dataSplit[2]
      const mes = dataSplit[1]
      const ano = dataSplit[0]

      return `${dia}/${mes}/${ano}`

   }

  return (
    <div key={evento.id} className="evento">
      <div className="esquerda">
        <p>
          <strong>Empresa:</strong> {evento.empressa}
        </p>
        <p>
          <strong>Agente:</strong> {evento.agent}
        </p>
        <small>
          <strong>Quando:</strong> { converterData(evento.date)} - {evento.hora}
        </small>
      </div>
      <div className="direita">
         <p>{evento.descricao ? evento.descricao : 'Sem Descrição'}</p>
      </div>
    </div>
  );
}
