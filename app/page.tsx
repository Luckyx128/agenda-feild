"use client";
import Image from "next/image";
import "./main.css";
import { useFetch } from "./hooks/useFetch";
import { useEffect, useState } from "react";
import DetailEvent from "./components/detailEvents";
import CardInfo from "./components/CardInfo"
import AddBoxIcon from '@mui/icons-material/AddBox';
type Event = {
	id: number;
	agent: string;
	date: string;
	hora: string;
	hora_saida: string;
	empressa: string;
	descricao: string;
	createdAt: string;
	updatedAt: string;
};

export default function Home() {
	const [nextEventos, setNextEventos] = useState<Event[]>([]);
	const [todayEventos, setTodayEventos] = useState<Event[]>([]);
	const { data, loading, error } = useFetch<Event[]>({
		method: "GET",
		param: null,
		url: "/api/event/list/next",
	});
	const result = useFetch<Event[]>({
		method: "GET",
		param: null,
		url: "/api/event/list/today",
	});
	useEffect(() => {
		if (data) setNextEventos(data);
		if (result.data) setTodayEventos(result.data);
	}, [data, nextEventos, result]);

	if (loading) return <CardInfo tipo="info" titulo="CARREGANDO EVENTOS CADASTRADOS" descricao="Eventos agendados para hoje e para os proximos dias!" />;
	if (error) return <CardInfo tipo="erro" titulo="ERRO AO OBTER EVENTOS CADASTRADOS" descricao="Possivel erro no banco de dados, consultar admistração!" />;
	return (
		<main className="">
			<Image
				src="/Icone agenda.png"
				alt="Next.js logo"
				width={180}
				height={38}
				priority
			/>
			<button className="btn mob" onClick={() => window.location.href = '/calendario'}>Mes</button>
			<section className="sec ">
				<h1 className="TitleEvent">Eventos de Hoje</h1>
				<div className="secin">
					{todayEventos.length > 0 ?
						(todayEventos.map((evento) => (
							<DetailEvent key={evento.id} evento={evento} />)
						)) : (
							<div>
								<p>Nenhum evento encontrado para hoje!</p>
								<p onClick={() => window.location.href = '/calendario'}>Para cadastrar um evento clique aqui » <AddBoxIcon /></p>
							</div>
						)}
				</div>
			</section>

			<section className="sec ">
				<h1 className="TitleEvent">Proximos eventos</h1>
				<div className="secin">
					{nextEventos.length > 0 ? (

						nextEventos.map((evento) => (
							<DetailEvent key={evento.id} evento={evento} />
						))
					) : (<div>
						<p>Nenhum evento encontrado para os próximos dias!</p>
						<p onClick={() => window.location.href = '/calendario'}>Para cadastrar um evento clique aqui » <AddBoxIcon /></p>
					</div>)
					}
				</div>
			</section>
		</main>
	);
}
