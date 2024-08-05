
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NoHay, Paginacion, Seleccionar } from "../../common";
import { ImagenPlato } from "./UI/ImagenPlato";
import { PLato, getPlatosCalientes } from "./UI";
import { Contexto } from "../../Contexto";
import usePaginacion from "../../common/usePaginacion";

export function PlatosCalientes() {
  const { verOcultarRestoDeSeccion, setPlatosCalientes, platosCalientes, escuchaPlatosCalientes,setEscuchaPlatosCalientes } = useContext(Contexto);

  const [isOpen, setIsOpen] = useState(false);
  const [seleccion, setSeleccion] = useState("A-Z");
  const { paginaActual, setPaginaActual, cantPaginas, calcularTotalPaginas } = usePaginacion('platosCalientes');
  const [elementos] = useState(["A-Z", "Z-A"]);
  const referencia = useRef<HTMLDivElement>(null);

  const hacerClick = () => setIsOpen(!isOpen);

  const handleCambiarSeleccionado = (option: string) => {
    setSeleccion(option);
    setIsOpen(false);
  };

  const handleHacerClickFuera = (event: MouseEvent) => {
    if (referencia.current && !referencia.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const ocultarLista = useCallback(() => {
    setIsOpen(false);
  }, []);

  const obtenerPlatosCalientes = async () => {
    const { platos, totalDeProductos } = await getPlatosCalientes(seleccion === "A-Z");
    calcularTotalPaginas(totalDeProductos);
    setPlatosCalientes(platos);
    setEscuchaPlatosCalientes(false);
  };

  useEffect(() => {
    obtenerPlatosCalientes();

    document.addEventListener("mousedown", handleHacerClickFuera);

    return () => {
      document.removeEventListener("mousedown", handleHacerClickFuera);
    };
  }, [seleccion,escuchaPlatosCalientes]);

  useEffect(() => {
    if (!platosCalientes.length) {
      obtenerPlatosCalientes();
    }
  }, [platosCalientes.length]);

  

  if (!platosCalientes.length) {
    return <NoHay elemento="Platos Calientes" />;
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
        {platosCalientes.slice((paginaActual - 1) * 6, paginaActual * 6).map((platoCaliente, index) => (
          <PLato
            key={index}
            identificador={platoCaliente.id}
            nombreProducto={platoCaliente.descripcionPlato}
            precio={platoCaliente.precio}
            direccionImagen={platoCaliente.imagenAsociada}
            cantRestante={platoCaliente.cantRestante}
          >
            <ImagenPlato src={platoCaliente.imagenAsociada} />
          </PLato>
        ))}
      </div>
      <Paginacion cantPaginas={cantPaginas} paginaActual={paginaActual} setPaginaActual={setPaginaActual}/>
    </div>
  );
}

