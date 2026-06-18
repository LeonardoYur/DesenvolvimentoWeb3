import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
    try {
        const resultado = await prisma.docente.findMany();
        return NextResponse.json(resultado);
    }
    catch (e) {
        console.log(e);
        return new NextResponse('Falha geral', { status: 400 });
    }
}

export async function POST(request) {
    try {
        const dados = await request.json();
        const existe = await prisma.docente.findUnique({ where: { email: dados.email } });
        if (existe)
            return new NextResponse('Já existe um docente com o e-mail informado', { status: 400 });
        const resultado = await prisma.docente.create({
            data: dados
        });
        if (resultado && resultado.id)
            return NextResponse.json(resultado);
        else
            return new NextResponse('Erro ao salvar o docente informado', { status: 400 });
    }
    catch (e) {
        console.log(e);
        return new NextResponse('Falha geral', { status: 400 });
    }
}

export async function DELETE(request, { params }) {
try {
const { id } = await params;
const existe = await prisma.docente.findUnique({ where: { id: parseInt(id) } });
if (!existe)
return new NextResponse(null, { status: 404 });
const resultado = await prisma.docente.delete({
where: {
id: parseInt(id)
}
});
if (resultado)
return new NextResponse('Docente removido com sucesso', { status: 200 });
else
return new NextResponse('Erro ao remover o docente informado', { status: 400 });
}
catch (e) {
console.log(e);
return new NextResponse('Falha geral', { status: 400 });
}
}