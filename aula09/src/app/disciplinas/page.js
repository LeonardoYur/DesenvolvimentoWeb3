'use client';
import { useEffect, useState } from "react";
import { Listar, Remover } from "./actions";
import Link from "next/link";

export default function Docentes() {
    const [busy, setBusy] = useState(false);
    const [dados, setDados] = useState([]);
    const [atualizar, setAtualizar] = useState(true);



    const handleAtualizar = async () => {
        setBusy(true);
        try {
            const docentes = await Listar();
            setDados(docentes);
            console.log(docentes);
        }
        catch (error) {
            alert("Erro ao buscar os dados");
        }

        setAtualizar(false);
        setBusy(false);
    }

    const handleRemover = async (id) => {
    const resposta = confirm('Deseja realmente remover este docente?');
    
    if (resposta) {
        setBusy(true);
        const resultado = await Remover(id);
        
        if (resultado.sucesso) {
            setAtualizar(true);
            alert("Docente removido com sucesso");
        }
        else {
            alert("Erro ao remover o docente informado");
        }
        setBusy(false);
    }
}

    useEffect(() => {
        if (atualizar)
            handleAtualizar();
    }, [atualizar]);


    return (
        <div>
            <h1>Docentes</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-200" disabled={busy} onClick={() => { setAtualizar(true) }}>
                {busy ? " ...... " : "Atualizar"}
            </button>
            <Link className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-200" href={"docentes/novo/"}>Novo</Link>

            <table className="w-full">
                <thead>
                    <tr>
                        <td>Nome</td>
                        <td>E-mail</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        dados.map((p) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.nome}</td>
                                    <td>{p.email}</td>
                                    <td><Link href={`/docentes/editar/${p.id}`} className="text-blue-600 pl-2">Editar</Link></td>
                                    <td><a href="#" className="text-red-600 pl-2" onClick={() => { handleRemover(p.id) }}>Remover</a></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}