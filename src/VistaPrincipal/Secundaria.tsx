import { RiCloseLine } from "react-icons/ri";
import {
  AccionEnCarrito,
  Enviar,
  Pedido,
} from "./PaginasVistaPrincipal/PaginaSecundaria/UI-Secundaria";
import { useContext, useEffect } from "react";
import { Contexto } from "../Contexto";
import { getLosPedidos } from "./PaginasVistaPrincipal/PaginaSecundaria/Secundaria-Servicios/los-pedidos.servicios";
import { Auth } from "../Autentificacion/Auth";

interface Props {
  visivility: boolean;
  changeVisilitySecundaria: () => void;
}

export function Secundaria({ visivility, changeVisilitySecundaria }: Props) {
  const {
    losPedidos,
    verOcultarRestoDeSeccion,
    escuchaPedidos,
    setEscuchaPedidos,
    setlosPedidos,
  } = useContext(Contexto);

  useEffect(() => {
    const obtenerLosPedidos = async () => {
      const usuario = Auth();
      if (usuario) {
        const pedidosObtenidos = await getLosPedidos(usuario.idUsuario);
        setlosPedidos(pedidosObtenidos);
        setEscuchaPedidos(false);
      }
    };
    obtenerLosPedidos();
  }, [escuchaPedidos]);
  

  return (
    <>
      <div
        className={`${verOcultarRestoDeSeccion ? "hidden -right-full" : ""}`}
      >
        <div
          className={`w-full h-full fixed top-0 col-span-2 lg:min-h-screen lg:w-3/12 lg:left-3/4 bg-[#1F1D2B] transition-all ${
            visivility ? "right-0" : "-right-full"
          }`}
        >
          <div className="text-gray-300 p-4 pt-16 lg:hidden">
            <div
              onClick={() => {
                changeVisilitySecundaria();
              }}
            >
              <RiCloseLine className=" absolute left-4 top-4 p-3 box-content text-gray-300 bg-[#262837] rounded-full text-xl" />
            </div>
          </div>

          <div className="text-gray-300 px-4 lg:mt-5">
            <h1 className="text-2xl">Pedidos</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-2">
            <AccionEnCarrito nombre={"Eliminar todos los pedidos"} />
          </div>

          <div className="text-gray-300 mx-4">
            <div className="grid grid-cols-6">
              <h5 className="col-span-4">Artículo</h5>
              <h5 className="col-span-2 flex justify-center">Cant.</h5>
            </div>

            <div className="h-[50vh] lg:h-[60vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-100">
              {losPedidos.length === 0 ? (
                <div className="rounded-sm text-center py-10 sm:py-32 lg:py-48 text-red-500 border-t-2 mt-4 border-b-2 border-red-500 m-auto">
                  <span>Aún no tiene pedidos</span>
                </div>
              ) : 
              (
                losPedidos.map((pedido, index) => (
                  <Pedido
                    key={index}
                    identificador={pedido.idCarrito}
                    identificadorProducto={pedido.idProducto}
                    descripcion={pedido.descripcion}
                    montoTotal={pedido.montoTotal}
                    imagen={pedido.imagen}
                    tipoProducto={pedido.tipoProducto}
                    cantidad={pedido.cantidadAOrdenar}
                  />
                ))
              )}
            </div>
          </div>
          <Enviar descuento={30} subtotal={2000} />
        </div>
      </div>
    </>
  );
}
