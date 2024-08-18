import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NoHay, Paginacion, Seleccionar } from "../../common";
import { PLato } from "./UI";
import { ImagenPlato } from "./UI/ImagenPlato";
import { Contexto } from "../../Contexto";
import { getPostres } from ".";
import usePaginacion from "../../common/usePaginacion";

export function Postres() {
  const {
    verOcultarRestoDeSeccion,
    losPostres,
    setLosPostres,
    escuchaPostres,
    setEscuchaPostres,
    lenguajeEs,
  } = useContext(Contexto);

  const [isOpen, setIsOpen] = useState(false);
  const [seleccion, setSeleccion] = useState("A-Z");
  const { paginaActual, setPaginaActual, cantPaginas, calcularTotalPaginas } =
    usePaginacion("postres");
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

  const obtenerPostres = async () => {
    const { postres, totalDeProductos } = await getPostres(seleccion === "A-Z");
    calcularTotalPaginas(totalDeProductos);
    setLosPostres(postres);
    setEscuchaPostres(false);
  };

  useEffect(() => {
    obtenerPostres();

    document.addEventListener("mousedown", handleHacerClickFuera);

    return () => {
      document.removeEventListener("mousedown", handleHacerClickFuera);
    };
  }, [seleccion, escuchaPostres]);

  useEffect(() => {
    if (!losPostres.length) {
      obtenerPostres();
    }
  }, [losPostres.length]);

  if (!losPostres.length) {
    return <NoHay elemento="Postres" />;
  }

  return (
    <div className={`${verOcultarRestoDeSeccion ? "hidden" : "px-4"}`}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl text-gray-300"> { lenguajeEs? "Desserts" :"Postres" } </h2>

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
        {losPostres
          .slice((paginaActual - 1) * 6, paginaActual * 6)
          .map((postres, index) => (
            <PLato
              key={index}
              identificador={postres.idPostre}
              nombreProducto={postres.descripcionPostre}
              precio={postres.precio}
              direccionImagen={postres.imagenAsociada}
              cantRestante={postres.cantRestante}
            >
              <ImagenPlato src={postres.imagenAsociada} />
            </PLato>
          ))}
      </div>
      <Paginacion
        cantPaginas={cantPaginas}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
      />
    </div>
  );
}
