import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ViewDayIcon from '@mui/icons-material/ViewDay';

type Props = {
	handleDateChange: (value:Date) => void;
	date:Date;
	selectedDate:Date | null
}

	export default function Actions({handleDateChange,date,selectedDate}:Props) {
		return (
			<div className="action">
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
					className={"btn " + (selectedDate ? 'activo' : 'not')}
					onClick={() => selectedDate ? window.location.href = `/calendario/${selectedDate?.toISOString().split('T')[0]}` : null}
				>
					<ViewDayIcon /> Ver dia selecionado
				</button>
			</div>
		)
	}
