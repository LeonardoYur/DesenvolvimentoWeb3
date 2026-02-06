export default function Texto({nome, data, end, est, CEP}){
    return(
        <>
    <p>{nome}</p>
    <p>{data}</p>
    <p>{end}</p>
    <p>{est}</p>
    <p>{CEP}</p>
        </>
    );
}