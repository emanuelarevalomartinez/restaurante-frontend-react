
import { PLato, getPlatosCalientes } from "./UI";
import { ImagenPlato } from "./UI/ImagenPlato";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Contexto } from "../../Contexto";
import { Cargando, Paginacion, Seleccionar } from "../../common";

export function PlatosCalientes() {
  const {
    setPlatosCalientes,
    platosCalientes,
    verOcultarRestoDeSeccion,
    escuchaPlatosCalientes,
    setEscuchaPlatosCalientes,
  } = useContext(Contexto);

  useEffect(() => {
    if (escuchaPlatosCalientes) {
      const obtenerPlatos = async () => {
        const platosObtenidos = await getPlatosCalientes();
        setPlatosCalientes(platosObtenidos);
        setEscuchaPlatosCalientes(false);
      };
      obtenerPlatos();
    }
  }, [escuchaPlatosCalientes]);

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

  if (escuchaPlatosCalientes) {
    return <Cargando />;
  }

  if (!platosCalientes.length) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500">Actualmente no hay platos</p>
      </div>
    );
  }

  return (
    <div className={`${verOcultarRestoDeSeccion ? "hidden" : "px-4"}`}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl text-gray-300">Platos Calientes</h2>

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
        {platosCalientes.map((plato, index) => {
          return (
            <PLato
              key={index}
              identificador={plato.id}
              nombreProducto={plato.descripcionPlato}
              precio={plato.precio}
              direccionImagen={plato.imagenAsociada}
              cantRestante={plato.cantRestante}
            >
              <ImagenPlato src={plato.imagenAsociada} />
            </PLato>
          );
        })}
      </div>
      <div>
        <Paginacion/>
      </div>
    </div>
  );
}
