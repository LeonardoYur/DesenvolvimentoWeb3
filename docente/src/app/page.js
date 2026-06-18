'use client'
import { useEffect, useState } from "react"
import { Listar, Pesquisar, Salvar } from "./actions";

export default function Home() {
  const [busy, setBusy] = useState(false);
  const [dados, setDados] = useState([]);
  const [atualizar, setAtualizar] = useState(true);



  const handlePesquisar = async () => {
    setBusy(true);
    const resultado = await Pesquisar();
    console.log(resultado);
    setBusy(false);
  }

  const handleInserir = async () => {
    setBusy(true);
    const resultado = await Salvar({
      nome: 'Tiago',
      email: 'tad@ifsp.du.br'
    });
    console.log(resultado);
    setBusy(false);
  }

  const handleAtualizar = async () => {
    setBusy(true);
    try {
      const pessoas = await Listar();
      setDados(Array.isArray(pessoas) ? pessoas : []);

    }
    catch {
      alert("oi");
    }
    setAtualizar(false);
    setBusy(false);
  }
  useEffect(() => {
    if (atualizar)
      handleAtualizar();
  }, [atualizar]);



  return (
    <div className="p-2">
      <button disabled={busy} className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer disabled:bg-blue-200"
        onClick={handlePesquisar}>Pesquisar</button>
      <button disabled={busy} className="px-4 py-2 ml-2 rounded text-white bg-blue-600 hover:bg-blue700 active:bg-blue-800 cursor-pointer disabled:bg-blue-200" onClick={handleInserir}>Inserir</button>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-200" disabled={busy} onClick={() => { setAtualizar(true) }}>
{busy ? " ...... " : "Atualizar"}
</button>
      <table className="w-full">
        <thead>
          <tr>
            <td>Título</td>
            <td>Ano de Publicação</td>
          </tr>
        </thead>
        <tbody>
          {
            dados.map((p) => {
              return (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.email}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </div>

  )
}