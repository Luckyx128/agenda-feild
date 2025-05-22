import React from 'react';
import './eventInfos.css';

type Props = {
	empresa: string;
	agente: string;
	hora: string;
	hora_saida:string;
	onClick:()=>void;
};

export default function EventInfos({ empresa, agente, hora,hora_saida,onClick }: Props) {
	return (
		<div className="event-infos" onClick={onClick}>
			<p className="empresa">{empresa}</p>
			<p className="hora">{hora}</p>
			<p className="hora">-</p>
			<p className="hora_saida">{hora_saida}</p>
			<p className="agente">{agente}</p>
		</div>
	);
};
