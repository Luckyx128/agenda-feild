"use client";
import { useState } from "react";
import FullCalendar from "../components/fullCalendar";
import Actions from "../components/action";


export default function Calendario() {
	const [date, setDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const handleDateChange = (newDate: Date) => {
		setDate(newDate);
	};

	return (
		<>


			<Actions handleDateChange={handleDateChange} date={date} selectedDate={selectedDate}/>
			<FullCalendar date={date} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
		</>
	);
}
