import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(request) {
    try {
        const resultado = await prisma.docente.findMany();
        return NextResponse.json(resultado);
    }
    catch (e) {
        console.log(e);
        return new NextResponse('Falha geral', { status: 400 });
    }
}