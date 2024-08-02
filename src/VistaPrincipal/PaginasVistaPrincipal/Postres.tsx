import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Paginacion, Seleccionar } from "../../common";
import { PLato } from "./UI";
import { ImagenPlato } from "./UI/ImagenPlato";
import { Contexto } from "../../Contexto";
import { getPostres } from ".";


export function Postres(){

  const { verOcultarRestoDeSeccion, losPostres, setLosPostres } = useContext(Contexto);

  const [isOpen, setIsOpen] = useState(false);
  const [seleccion, setSeleccion] = useState("A-Z");
  const [elementos] = useState(["A-Z", "Z-A"]);
  const referencia = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (escuchaPlatosCalientes) {
      const obtenerPostres = async () => {
        const postresObtenidos = await getPostres();
        setLosPostres(postresObtenidos);
        
      };
      obtenerPostres();
    // }
  }, []);

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
        <h2 className="text-xl text-gray-300">Postres</h2>

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
        {losPostres.map((postre, index) => {
          return (
            <PLato
              key={index}
              identificador={postre.id}
              nombreProducto={postre.descripcionPostre}
              precio={postre.precio}
              direccionImagen={postre.imagenAsociada}
              cantRestante={postre.cantRestante}
            >
              <ImagenPlato src={postre.imagenAsociada} />
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