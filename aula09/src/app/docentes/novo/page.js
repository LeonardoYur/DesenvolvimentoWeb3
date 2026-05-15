'use client'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { DocenteSchema, LivroSchema } from "../schema";
import { Salvar } from "../actions";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

export default function Novo() {
    const [busy, setBusy] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nome: '',
            email: '',
        },
        resolver: yupResolver(DocenteSchema),
    });
    const onSubmit = async (data) => {
        setBusy(true);
        const resultado = await Salvar(data);
        setBusy(false);
        if (resultado.sucesso) {
            if (resultado.mensagem) {
                Swal.fire({
                    text: resultado.mensagem,
                    icon: 'success',
                    timer: 3000,
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false
                })
            }
            router.push("/docentes");
        }
        else {
            let mensagem = "Erro ao buscar os dados";
            if (resultado.mensagem)
                mensagem = resultado.mensagem;
            Swal.fire({
                text: mensagem,
                icon: 'error',
                timer: 3000,
                toast: true,
                position: "top-right",
                showConfirmButton: false
            })
        }
    }
    return (
        <div className="mt-2 ml-2">
            <form className=" flex flex-row gap-8" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Nome
                    <input type="text" className="bg-neutral-50 border mx-2 px-2 py-2" {...register("nome")} />
                    <p className="text-sm text-red-600">{errors?.nome?.message}</p>
                </label>
                <label>
                    E-mail
                    <input type="text" className="bg-neutral-50 border ml-2 px-2 py-2" {...register("email")} />
                    <p className="text-sm text-red-600">{errors?.email?.message}</p>
                </label>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-200 ml-2" disabled={busy}>
                    {busy ? " ...... " : "Salvar"}
                </button>
            </form>
        </div>
    )
}