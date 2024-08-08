import { RiCloseLine } from "react-icons/ri";
import {
  AccionEnCarrito,
  Enviar,
  Pedido,
} from "./PaginasVistaPrincipal/PaginaSecundaria/UI-Secundaria";
import { useContext, useEffect, useState } from "react";
import { Contexto } from "../Contexto";
import { deleteAllPedidos, getLosPedidos } from "./PaginasVistaPrincipal/PaginaSecundaria/Secundaria-Servicios/los-pedidos.servicios";
import { Auth } from "../Autentificacion/Auth";
import { Modal } from "../common";

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
    setEscuchaBebidas,
    setEscuchaPlatosCalientes,
    setEscuchaPlatosFrios,
    setEscuchaPostres,
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

  const [open, setOpen] = useState(false);

  function cancelar() {
    setOpen(false);
  }

  function aceptar() {
    const auth = Auth();

    if(auth){
       const borrarTodosLosPedidos = async ()=> {
          await deleteAllPedidos(auth.idUsuario)
          .then( ()=> {
            setEscuchaPedidos(true);
            setEscuchaBebidas(true);
            setEscuchaPlatosCalientes(true);
            setEscuchaPlatosFrios(true);
            setEscuchaPostres(true);
            setOpen(false);
          } )
       }
       borrarTodosLosPedidos();
    }
  }

  return (
    <>
      <Modal isOpen={open} cancelar={cancelar} aceptar={aceptar}>
      <div className="w-full h-full justify-center items-center flex">
      {losPedidos.length == 0 ? (
            <div>
                <p className="text-center text-3xl">
                  Aún no tiene ningún producto en el carrito.
                </p>
            </div>
          ) : (
            <div>
              <p className="text-center text-3xl">
              ¿Estas seguro de que quieres eliminar todos tus pedidos del carrito?
              </p>
            </div>
          )}
          </div>
      </Modal>

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

          <div
            className="flex flex-wrap items-center gap-2 p-2"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AccionEnCarrito nombre={"Eliminar todos los pedidos"} />
          </div>

          <div className="text-gray-300 mx-4">
            <div className="grid grid-cols-6">
              <h5 className="col-span-4">Artículo</h5>
              <h5 className="col-span-2 flex justify-center">Cant.</h5>
            </div>

            <div className="h-[50vh] lg:h-[60vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-100">
              {losPedidos.length === 0 ? (
                <div className="rounded-sm text-center py-10 sm:py-40 lg:py-52 text-red-500 border-t-2 mt-1 border-b-2 border-red-500 m-auto">
                  <span>Aún no tiene pedidos</span>
                </div>
              ) : (
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
          <Enviar/>
        </div>
      </div>
    </>
  );
}
