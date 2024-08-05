
interface Props{
    elemento:string;
}


export function NoHay({elemento} :Props){
   return(
    <>
     <div className="flex flex-col items-center">
        <p className="text-red-500">Actualmente no hay {elemento}</p>
      </div>
    </>
   )
}