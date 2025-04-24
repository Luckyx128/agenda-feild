import React, { useState } from "react";

type CalendarioProps = {
   date: Date;
}

export default function FullCalendar({ date }: CalendarioProps) {
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
   const currentData = new Date();
      const getDaysOfWeekInMonth = (dayOfWeek: number) => {
         const days = [];
         const currentMonth = date.getMonth();
         const currentYear = date.getFullYear();
         const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
         const semanasNoMesAtual =  7 - firstDayOfMonth.getDay(); 
         const quantidadeDeSemanasNoMesAnterior = 7 - semanasNoMesAtual;
         // console.log(quantidadeDeSemanasNoMesAnterior);
         
         for (let i = 0; i < quantidadeDeSemanasNoMesAnterior; i++) {
           const diaDoMesAnterior = new Date(currentYear, currentMonth, 0 - i);
           if (diaDoMesAnterior.getDay() === dayOfWeek) {
              days.push(diaDoMesAnterior);
           }
         }
         for (let day = 1; day <= 31; day++) {
           const currentDate = new Date(currentYear, currentMonth, day);
            if (currentDate.getMonth() !== currentMonth) break;
            if (currentDate.getDay() === dayOfWeek) {
               days.push(new Date(currentYear, currentMonth, day));
            }
           
            
         }
         console.log(days);
         return days;
      };
     const diasDaSemana = [
       "Dom",
       "Seg",
       "Ter",
       "Qua",
       "Qui",
       "Sex",
       "Sáb",
     ];
     const handleDateClick = (date: Date) => {
       
       return setSelectedDate(date);
     };
   return (
      <div className="parent">
      {diasDaSemana.map((semana, index) => (
         <div key={index}  className="calendar-column">
           <div key={index} className="calendar-header">
              {semana}
           </div>
           {getDaysOfWeekInMonth(index).map((dia, index) => (
              <div key={index} 
              className={"calendar-day "+ (date.getMonth() !== dia.getMonth() ? "not-current-month " : "current-month ") + (`${currentData.getDate()} - ${currentData.getMonth()}`  === `${dia.getDate()} - ${dia.getMonth()}` ? "today " : "") + (`${selectedDate?.getDate()} - ${selectedDate?.getMonth()}` === `${dia.getDate()} - ${dia.getMonth()}` ? "selected " : "")}
              onClick={() => handleDateClick(dia)}>
                 <span className="day-label">{dia.getDate()} </span>
              </div>
           ))}
        </div>
      ))}
      </div>
   );
}