

interface Props extends React.HTMLAttributes<HTMLDivElement>{
    handleCambiarSeleccionado: (e: string)=> void;
    titulo:string;
}

export function Opcion({handleCambiarSeleccionado,titulo}:Props){
    return(
        <>
        <div
              className="text-gray-300 block px-4 py-2 text-sm rounded-lg cursor-pointer hover:bg-red-500"
              onClick={() => {
                handleCambiarSeleccionado(titulo);
                
              }
            }
              >
               {titulo}
              </div>
        </>
    )
}