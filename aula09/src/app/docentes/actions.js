'use server'
import { prisma } from "../../../lib/prisma";

export async function Listar() {
    const docentes = await prisma.docente.findMany();
    return docentes;
}

async function Validar(docente) {
    docente.nome = docente.nome?.trim();
    if (!docente.nome || docente.nome.length < 2 || docente.nome.length > 100)
        throw new Error('Nome inválido');
    if (!docente.email || docente.email.length < 2 || docente.email.length > 100)
        throw new Error('E-mail inválido');
}

export async function Salvar(docente) {
    try {
        await Validar(docente);
    }
    catch (e) {
        return { sucesso: false, mensagem: e };
    }
    let resultado = null;
    try {
        resultado = await prisma.docente.create({
            data: docente
        });
    }
    catch {
        return { sucesso: false, mensagem: 'Erro na inserção' };
    }
    return { sucesso: true, dados: resultado, mensagem: 'Inserção realizada com sucesso' };
}

export async function Obter(id) {
    const docentes = await prisma.docente.findUnique({
        where: {
            id: id
        }
    });
    return docentes;
}

export async function Atualizar(docentes) {
    try {
        await Validar(docentes);
    }
    catch (e) {
        return { sucesso: false, mensagem: e };
    }
    let resultado = null;
    try {
        resultado = await prisma.docente.update({
            where: {
                id: docentes.id
            },
            data: { ...docentes, id: undefined }
        });
    }
    catch {
        return { sucesso: false, mensagem: 'Erro na atualização' };
    }
    return { sucesso: true, dados: resultado, mensagem: 'Atualização realizada com sucesso' };
}

export async function Remover(id) {
    let resultado = null;
    try {
        resultado = await prisma.docente.delete({
            where: {
                id: id
            }
        });
    } catch { }
    if (resultado)
        return { sucesso: true };
    else
        return { sucesso: false };
}