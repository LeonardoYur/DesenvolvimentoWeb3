import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(request) {
    const data = await request.json().catch(() => { });
    try {
        const resultado = await prisma.docente.findMany({
            where: {
                ...(data?.nome && {
                    nome: { contains: data.nome, mode: 'insensitive' }
                }),
                ...(data?.email && {
                    email: { equals: data.email, mode: 'insensitive' }
                })
            }
        });
        return NextResponse.json(resultado);
    }
    catch (e) {
        console.log(e);
        return new NextResponse('Falha geral', { status: 400 });
    }
}