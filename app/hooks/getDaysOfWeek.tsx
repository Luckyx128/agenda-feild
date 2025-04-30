export function getDaysOfWeekInMonth(dayOfWeek: number,date:Date) {
   const days = [];
   const currentMonth = date.getMonth();
   const currentYear = date.getFullYear();
   const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
   const semanasNoMesAtual = 7 - firstDayOfMonth.getDay();
   const quantidadeDeSemanasNoMesAnterior = 7 - semanasNoMesAtual;

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
   return days;
}