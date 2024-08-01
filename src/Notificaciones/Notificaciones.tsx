
import { Notificacion } from "./Notificacion";
import { Seleccionar } from "../common";
import { useCallback, useEffect, useRef, useState } from "react";


export function Notificaciones(){

    const [isOpen, setIsOpen] = useState(false);
    const [seleccion, setSeleccion] = useState("Ultimas");
    const [elementos] = useState(["Ultimas", "Primeras"]);
    const referencia = useRef<HTMLDivElement>(null);
  
    const hacerClick = () => setIsOpen(!isOpen);
  
    const handleCambiarSeleccionado = (option: string) => {
      setSeleccion(option);
      setIsOpen(false);
    };

    const ocultarLista = useCallback(() => {
        setIsOpen(false);
    }, []);
  
    const handleHacerClickFuera = (event: MouseEvent) => {
      if (
        referencia.current &&
        !referencia.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleHacerClickFuera);
  
      return () => {
        document.removeEventListener("mousedown", handleHacerClickFuera);
      };
    }, []);


    return(
        <div className="mt-48 sm:mt-44 md:mt-40 lg:mt-40 mx-2">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl text-gray-300">Notificaciones</h2>
                   <Seleccionar
          listaElementos={elementos}
          seleccion={seleccion}
          isOpen={isOpen}
          hacerClick={hacerClick}
          handleCambiarSeleccionado={handleCambiarSeleccionado}
          referencia={referencia}
          ocultarLista={ocultarLista}
          ancho={`w-32`}
        />
            </div>
       <Notificacion/>
       <Notificacion/>
       <Notificacion/>
       <Notificacion/>
       <Notificacion/>
        </div>
    )
}