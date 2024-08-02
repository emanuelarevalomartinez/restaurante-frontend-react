import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Paginacion, Seleccionar } from "../../common";
import { ImagenPlato } from "./UI/ImagenPlato";
import { PLato } from "./UI";
import { Contexto } from "../../Contexto";
import { getPlatosFrios } from ".";


export function PlatosFrios(){

    const { verOcultarRestoDeSeccion,losPlatosFrios,setLosPlatosFrios } = useContext(Contexto);

    useEffect(() => {
        // if (escuchaPlatosCalientes) {
          const obtenerPlatosFrios = async () => {
            const platosObtenidos = await getPlatosFrios();
            setLosPlatosFrios(platosObtenidos);
            
          };
          obtenerPlatosFrios();
        // }
      }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [seleccion, setSeleccion] = useState("A-Z");
    const [elementos] = useState(["A-Z", "Z-A"]);
    const referencia = useRef<HTMLDivElement>(null);
  
    const hacerClick = () => setIsOpen(!isOpen);
  
    const handleCambiarSeleccionado = (option: string) => {
      setSeleccion(option);
      setIsOpen(false);
    };
  
    const handleHacerClickFuera = (event: MouseEvent) => {
      if (
        referencia.current &&
        !referencia.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
  
    const ocultarLista = useCallback(() => {
      setIsOpen(false);
  }, []);
  
    useEffect(() => {
      document.addEventListener("mousedown", handleHacerClickFuera);
  
      return () => {
        document.removeEventListener("mousedown", handleHacerClickFuera);
      };
    }, []);

    return (
        <div className={`${verOcultarRestoDeSeccion ? "hidden" : "px-4"}`}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl text-gray-300">Platos Frios</h2>
  
          <Seleccionar
            listaElementos={elementos}
            seleccion={seleccion}
            isOpen={isOpen}
            hacerClick={hacerClick}
            handleCambiarSeleccionado={handleCambiarSeleccionado}
            referencia={referencia}
            posicionListaDesplegable="right-4 lg:right-[26.5%] xl:right-[26%]"
            ocultarLista={ocultarLista}
            ancho={`w-20`}
          />
        </div>
        <div className="grid p-8 grid-cols-1 md:grid-cols-2 gap-16 lg:grid-cols-3">
          {losPlatosFrios.map((platoFrio, index) => {
            return (
              <PLato
                key={index}
                identificador={platoFrio.id}
                nombreProducto={platoFrio.descripcionPlatoFrio}
                precio={platoFrio.precio}
                direccionImagen={platoFrio.imagenAsociada}
                cantRestante={platoFrio.cantRestante}
              >
                <ImagenPlato src={platoFrio.imagenAsociada} />
              </PLato>
            );
          })}
        </div>
        <div>
          <Paginacion/>
        </div>
      </div>
    )
}