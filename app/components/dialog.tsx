import "./dialog.css";
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
type Info = {
	id: number;
	agent: string;
	descricao: string;
	empressa: string;
	date: string; // ISO date string
	hora: string; // formato "HH:mm"
	hora_saida: string; // formato "HH:mm"
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
};

type Props = {
	dateIni: Date;
	isOpen: boolean;
	onClose: () => void;
	preData: Info | null
	method: 'POST' | 'PUT'
	setIsOpen: (boolean: boolean) => void
};

export default function Dialog({ dateIni, isOpen, onClose, preData = null, method = 'POST', setIsOpen }: Props) {
	const showSwal = (title: string,
					  text: string, icon: "success" | "error" | "warning",color:"#FF627DFF" | "#FCB700FF" | "#00D390FF") => {
		Swal.fire({
			title: title,
			text: text,
			icon: icon,
			confirmButtonColor: color,
		});
	}

	const deletarEvento = async (id: number) => {
		const response = await fetch(`/api/event/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		});
		if (response.ok) {
			onClose();
			showSwal("Sucesso!", "Visita deletada com sucesso!", "success", "#00D390FF");
		} else {
			showSwal("Erro!", "Erro durante a deleção!", "error", "#FF627DFF");
		}
	}

	const validarFormData = (formData: FormData) => {
		const agent = formData.get("agent");
		const empressa = formData.get("empressa");
		const date = formData.get("date");
		const hora = formData.get("hora");
		const hora_saida = formData.get("hora_saida");
		if (!agent || !empressa || !date || !hora || !hora_saida) {
			showSwal("Atenção!", "Os campos obrigatórios não foram preenchidos!", "warning", "#FCB700FF");
		}
		return !(!agent || !empressa || !date || !hora || !hora_saida );

	}
	const validHora = (hora:string,hora_saida:string) => {
		const horaFormatada = hora.split(':');
		const horaSaidaFormatada = hora_saida.split(':');
		const horaDate = new Date();
		const horaSaidaDate = new Date();

		horaDate.setHours(parseInt(horaFormatada[0]),parseInt(horaFormatada[1]),0);
		horaSaidaDate.setHours(parseInt(horaSaidaFormatada[0]),parseInt(horaSaidaFormatada[1]),0);

		if (horaDate.getTime() > horaSaidaDate.getTime()) {
			showSwal("Atenção!", "A hora de entrada não pode ser maior que a hora de saída!", "warning", "#FCB700FF");
			return false;
		}
		return horaDate.getTime() <= horaSaidaDate.getTime();

	}
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		if (validarFormData(formData) && validHora(formData.get("hora") as string,formData.get("hora_saida") as string)) {
			const data = Object.fromEntries(formData.entries());

			const response = await fetch("/api/event", {
				method: method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				onClose();
				showSwal("Sucesso!", "Visita cadastrada com sucesso!", "success", "#00D390FF");
			} else {
				showSwal("Erro!", "Erro durante o cadastro!", "error", "#FF627DFF");
			}
		}
	};


	return (
		<div
			className={`dialog-overlay ${isOpen ? "open" : "closed"}`}

		>
			<div className="dialog">
				<h1 className={'dialog-title'}>AGENDAR VISITA { preData ? <DeleteIcon onClick={()=>{
					deletarEvento(preData.id);
				}} color={'error'}/> : null} </h1>
				<section className="dialog-content">
					<form className="form-field" action="/api/evento" method="post" onSubmit={handleSubmit}>
						<div className="dialog-content-item">
							{preData ? (
								<input type="hidden" defaultValue={preData.id} name="id" id="id" />
							) : null}
							<label htmlFor="agent">
								<small className='required'>*</small>
								<PersonIcon />
								<input name="agent" type="text" id="agent" placeholder="Agente" defaultValue={preData ? preData.agent : ''} />
							</label>
						</div>
						<div className="dialog-content-item">
							<label htmlFor="empressa">
								<small className='required'>*</small>
								<LocationCityIcon />
								<input name="empressa" type="text" id="empressa" placeholder="Empresa" defaultValue={preData ? preData.empressa : ''} />
							</label>
						</div>

						<div className="dialog-content-item">
							<label htmlFor="date">
								<small className='required'>*</small>
								<input
									type="date"
									id="date"
									name="date"
									defaultValue={preData ? preData.date.split("T")[0] : dateIni.toISOString().split("T")[0]}
								/>
							</label>
						</div>
						<div className="dialog-content-item">
							<label htmlFor="time">
								<small className='required'>*</small>
								Entrada
								<input type="time" placeholder={'Entrada'} id="time" name="hora" defaultValue={preData ? preData.hora : ''} />
							</label>
						</div>
						<div className="dialog-content-item">
							<label htmlFor="time">
								<small className='required'>*</small>
								Saida
								<input type="time" placeholder={'Saida'} id="timeFim" name="hora_saida" defaultValue={preData ? preData.hora_saida : ''} />
							</label>
						</div>
						<div className="dialog-content-item">
							<label htmlFor="description">
								<ArticleIcon />
								<textarea id="description" name="descricao" placeholder="Descrição" defaultValue={preData ? preData.descricao : ''} ></textarea>
							</label>
						</div>
						<div className="dialog-content-buttons">
							<button className="btn-submit" type="submit" >
								{method == 'POST' ? (
									'Cadastrar'
								)
									: 'Editar'}
							</button>
							<button className="btn-neutral" type="button" onClick={() => setIsOpen(false)}>
								Cancelar
							</button>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
}
