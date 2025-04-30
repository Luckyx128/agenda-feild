import React from 'react';

import './eventInfos.css';

type Props = {
	empresa: string;
	agente: string;
	hora: string;
};

export default function EventInfos({ empresa, agente, hora }: Props) {
	return (
		<div className="event-infos">
			<p className="empresa">{empresa}</p>
			<p className="hora">{hora}</p>
			<p className="agente">{agente}</p>
		</div>
	);
};
