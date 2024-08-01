import { RiArrowDownSLine } from "react-icons/ri";
import { Opcion } from ".";
import { useEffect } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement>{
    referencia: React.RefObject<HTMLDivElement>,
    isOpen:boolean,
    seleccion:string;
    listaElementos:string[];
    hacerClick: ()=> void;
    handleCambiarSeleccionado: (e: string)=> void;
    ancho:string;
    posicionListaDesplegable?:string;
    ocultarLista: ()=> void;
}


export function Seleccionar({referencia,seleccion,hacerClick,isOpen,listaElementos,ocultarLista,handleCambiarSeleccionado,posicionListaDesplegable,ancho}:Props){


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.1) { 
                    ocultarLista();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [ocultarLista]);

    return(
        <>
         <div className=" inline-block text-left" ref={referencia}>
      <div>
        <button
          className="flex bg-[rgb(31,29,43)] items-center gap-2 text-gray-300 py-2 px-4 rounded-lg"
          onClick={hacerClick}
        >
          {seleccion} <RiArrowDownSLine/>
        </button>
      </div>

      {isOpen && (
        // <div className={`origin-top-right absolute right-2 mt-1 ${ancho} rounded-lg shadow-lg bg-[#1F1D2B] ring-1 ring-black ring-opacity-5`}>
        <div className={`origin-top-right absolute mt-1 ${ancho} rounded-lg shadow-lg bg-[#1F1D2B] ring-1 ring-black ring-opacity-5 z-10 ${posicionListaDesplegable? `${posicionListaDesplegable}` : `right-2`}`}>
          <div>
            { 
               listaElementos.map( (opcion,index)=> {
                return (
                    <Opcion key={index} handleCambiarSeleccionado={handleCambiarSeleccionado} titulo={opcion}/>
                )
               } )
            }
          </div>
        </div>
      )}
    </div>
        </>
    )
}