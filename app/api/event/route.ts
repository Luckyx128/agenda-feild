import { NextResponse } from 'next/server'
import { PrismaClient } from '../../generated/prisma/client'

const prisma = new PrismaClient()

export async function GET() {
	const events = await prisma.event.findMany()
	return NextResponse.json(events)
}

export async function POST(request: Request) {
	const body = await request.json()
	const { agent, date, hora, empressa, descricao,hora_saida } = body

	const event = await prisma.event.create({
		data: {
			agent,
			date: new Date(date),
			hora,
			descricao,
			empressa,
			hora_saida,
			createdAt: new Date(),
		},
	})

	return NextResponse.json(event)
}

export async function PUT(request: Request) {
	const body = await request.json()
	const { id, agent, date, hora, empressa, descricao,hora_saida } = body
	let result = ''
	let evento
	const intID = parseInt(id)
	try {
		evento = await prisma.event.update({
			where: {
				id: intID,
			},
			data: {
				agent,
				date: new Date(date),
				hora,
				descricao,
				hora_saida,
				empressa
			},
		})
		result = 'Evento editado com sucesso!'
	} catch (err) {
		console.error(err)
		result = 'Erro ao editar evento!'
	}
	return NextResponse.json({ result, evento })




}

export async function DELETE(request: Request) {
	const { id } = await request.json()
	const intID = parseInt(id)
	let result = ''
	try {
		await prisma.event.delete({
			where: {
				id: intID,
			},
		})
		result = 'Evento deletado com sucesso!'
	} catch (err) {
		console.error(err)
		result = 'Erro ao deletar evento!'
	}
	return NextResponse.json({ result })
}
