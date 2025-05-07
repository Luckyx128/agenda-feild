import React from 'react';
import './eventInfos.css';

type Props = {
	empresa: string;
	agente: string;
	hora: string;
	onClick:()=>void;
};

export default function EventInfos({ empresa, agente, hora,onClick }: Props) {
	return (
		<div className="event-infos" onClick={onClick}>
			<p className="empresa">{empresa}</p>
			<p className="hora">{hora}</p>
			<p className="agente">{agente}</p>
		</div>
	);
};
