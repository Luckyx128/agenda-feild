// Use client é obrigatório para usar hooks como useParams

"use client";
import { useParams } from 'next/navigation';

export default function Dia() {
   const { dia } = useParams();
   return (
      <div>
         <h1>Dia: {dia}</h1>
         <p>Dia is a component that represents the agenda for {dia}</p>
      </div>
   );
}