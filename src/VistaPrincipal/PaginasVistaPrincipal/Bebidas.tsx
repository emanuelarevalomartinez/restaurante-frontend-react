import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Contexto } from "../../Contexto";
import { ImagenPlato } from "./UI/ImagenPlato";
import { PLato } from "./UI";
import { getBebidas } from ".";
import { NoHay, Paginacion, Seleccionar } from "../../common";
import usePaginacion from "../../common/usePaginacion";

export function Bebidas() {
  const {
    verOcultarRestoDeSeccion,
    lasBebidas,
    setLasBebidas,
    escuchaBebidas,
    setEscuchaBebidas,
  } = useContext(Contexto);

  const [isOpen, setIsOpen] = useState(false);
  const [seleccion, setSeleccion] = useState("A-Z");
  const { paginaActual, setPaginaActual, cantPaginas, calcularTotalPaginas } =
    usePaginacion("bebidas");
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

  const obtenerBebidas = async () => {
    const { bebidas, totalDeProductos } = await getBebidas(seleccion === "A-Z");
    calcularTotalPaginas(totalDeProductos);
    setLasBebidas(bebidas);
    setEscuchaBebidas(false);
  };

  useEffect(() => {
    obtenerBebidas();

    document.addEventListener("mousedown", handleHacerClickFuera);

    return () => {
      document.removeEventListener("mousedown", handleHacerClickFuera);
    };
  }, [seleccion, escuchaBebidas]);

  useEffect(() => {
    if (!lasBebidas.length) {
      obtenerBebidas();
    }
  }, [lasBebidas.length]);

  if (!lasBebidas.length) {
    return <NoHay elemento="Bebidas" />;
  }

  return (
    <div className={`${verOcultarRestoDeSeccion ? "hidden" : "px-4"}`}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl text-gray-300">Bebidas</h2>

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
        {lasBebidas
          .slice((paginaActual - 1) * 6, paginaActual * 6)
          .map((bebidas, index) => (
            <PLato
              key={index}
              identificador={bebidas.idBebida}
              nombreProducto={bebidas.descripcionBebida}
              precio={bebidas.precio}
              direccionImagen={bebidas.imagenAsociada}
              cantRestante={bebidas.cantRestante}
            >
              <ImagenPlato src={bebidas.imagenAsociada} />
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
