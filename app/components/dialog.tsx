import "./dialog.css";
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ArticleIcon from '@mui/icons-material/Article';

type Info = {
	id: number;
	agent: string;
	descricao: string;
	empressa: string;
	date: string; // ISO date string
	hora: string; // formato "HH:mm"
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
 };

type Props = {
	dateIni: Date;
	isOpen: boolean;
	onClose: () => void;
	preData:Info | null
	method: 'POST' | 'PUT'
};

export default function Dialog({ dateIni, isOpen, onClose,preData=null,method='POST' }: Props) {

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data = Object.fromEntries(formData.entries());
		console.log(JSON.stringify(data));
		const response = await fetch("/api/event", {
			method: method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			onClose();
		} else {
			console.log("Failed to create event");
		}
	};


	return (
		<div
			className={`dialog-overlay ${isOpen ? "open" : "closed"}`}

		>
			<div className="dialog">
				<h1>AGENDAR VISITA</h1>
				<section className="dialog-content">
					<form className="form-field" action="/api/evento" method="post" onSubmit={handleSubmit}>
						<div className="dialog-content-item">
							{preData?(
								<input type="hidden" defaultValue={preData.id} name="id" id="id" />
							):null}
							<label htmlFor="agent">
								<PersonIcon />
								<input name="agent" type="text" id="agent" placeholder="Agente" defaultValue={preData? preData.agent:'' } />
							</label>
						</div>
						<div className="dialog-content-item">
							<label htmlFor="empressa">
								<LocationCityIcon />
								<input name="empressa" type="text" id="empressa" placeholder="Empresa" defaultValue={preData? preData.empressa:'' } />
							</label>
						</div>

						<div className="dialog-content-item">
							<label htmlFor="date">
								<input
									type="date"
									id="date"
									name="date"
									defaultValue={preData ?preData.date.split("T")[0]:dateIni.toISOString().split("T")[0]}
								/>
							</label>
						</div>
						<div className="dialog-content-item">
							<label htmlFor="time">
								<input type="time" id="time" name="hora" defaultValue={preData?preData.hora:''} />
							</label>
						</div>
						<div className="dialog-content-item">
							<label htmlFor="description">
								<ArticleIcon />
								<textarea id="description" name="descricao" placeholder="Descrição" defaultValue={preData?preData.descricao:''} ></textarea>
							</label>
						</div>
						<div className="dialog-content-buttons">
							<button className="btn-submit" type="submit" >
								{method == 'POST'?(
										'Cadastrar'
									)
								:'Editar'}
							</button>
							<button className="btn-neutral" type="button" onClick={onClose}>
								Cancelar
							</button>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
}
