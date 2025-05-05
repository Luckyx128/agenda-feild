import { NextResponse } from 'next/server'
import { PrismaClient } from '../../generated/prisma/client'

const prisma = new PrismaClient()

export async function GET() {
	const events = await prisma.event.findMany()
	return NextResponse.json(events)
}

export async function POST(request: Request) {
	const body = await request.json()
	const { agent, date, hora, empressa, descricao } = body

	const event = await prisma.event.create({
		data: {
			agent,
			date: new Date(date),
			hora,
			descricao,
			empressa,
			createdAt: new Date(),
		},
	})

	return NextResponse.json(event)
}

export async function PUT(request:Request) {
	const body = await request.json()
	const {id, agent, date, hora, empressa, descricao } = body
	console.log({id, agent, date, hora, empressa, descricao })
	let result = ''
	let evento
	const intID = parseInt(id)
	try{
		  evento = await prisma.event.update({
			where: {
				id:intID,
		  },
		  data: {
				agent,
				date: new Date(date),
				hora,
				descricao,
				empressa
		  },
		})
		result = 'Evento editado com sucesso!'
	}catch(err){
		console.error(err)
		result = 'Erro ao editar evento!'
	}finally{
		return NextResponse.json({result,evento})
	}
	


}
