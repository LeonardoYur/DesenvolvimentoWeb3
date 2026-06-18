'use server'

export async function Pesquisar() {
    let resultado = null;
    await fetch(`${process.env.API_URL}/docentes`).then(async (p) => {
        if (p.status === 200) {
            await p.json().then(q => {
                resultado = q;
            })
        }
    });
    return resultado;
}

export async function Listar() {
    let resultado = null;
    await fetch(`${process.env.API_URL}/docentes/listar`).then(async (p) => {
        if (p.status === 200) {
            await p.json().then(q => {
                resultado = q;
            })
        }
    });
    return resultado;
}

export async function Salvar(dados) {
    let resultado = null;

    const args = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    };
    console.log("API_URL:", process.env.API_URL);

    await fetch(`${process.env.API_URL}/docentes`, args).then(async (p) => {
    console.log("status:", p.status);
    const texto = await p.text();
    console.log("resposta:", texto); // ← mostra o erro exato
    if (p.status === 200) {
        resultado = JSON.parse(texto);
    }
});
    console.log(resultado);
    return resultado;
}
