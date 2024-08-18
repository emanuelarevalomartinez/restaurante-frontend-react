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
import { Modal, NotificacionEmergente } from "../common";
import { crearNotificacion } from "../Notificaciones";

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
    setEscuchaNotificaciones,
    lenguajeEs,
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
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [verNotificacion, setVerNotificacion] = useState(false);

  const intervaloNotificacionEmergente = () => {
    setVerNotificacion(true);
    setTimeout(() => setVerNotificacion(false), 3000);
  };

  function cancelar() {
    setOpen(false);
  }

  function aceptar() {
    const auth = Auth();
  
    if (auth) {

      const actualizarEstados = () => {
        setEscuchaBebidas(true);
        setEscuchaPlatosCalientes(true);
        setEscuchaPlatosFrios(true);
        setEscuchaPostres(true);
        setEscuchaPedidos(true);
        setOpen(false);
      };

      const crearNuevaNotificacion = async (nuevoMensaje: string, nuevoTipo: string) => {
        await crearNotificacion(auth.idUsuario,{
          mensaje: nuevoMensaje,
          tipo: nuevoTipo,
        })
        .then( ()=> {
          setEscuchaNotificaciones(true);
        } )
      }

   
  
      const borrarTodosLosPedidos = async () => {
        try {
          const resultado = await deleteAllPedidos(auth.idUsuario);
  
          if (resultado) {
            setMensajeNotificacion("Todos los productos fueron eliminados exitosamente del carrito de las compras");
            setTipoNotificacion("Correcto");
            crearNuevaNotificacion("Todos los productos fueron eliminados exitosamente del carrito de las compras","Correcto");
          } else {
            setMensajeNotificacion("No fue posible eliminar todos los productos del carrito de las compras");
            setTipoNotificacion("Error");
            crearNuevaNotificacion("No fue posible eliminar todos los productos del carrito de las compras","Error");
          }
        } catch (error) {
          setMensajeNotificacion("No fue posible eliminar todos los productos del carrito");
          setTipoNotificacion("Error");
          crearNuevaNotificacion("No fue posible eliminar todos los productos del carrito de las compras","Error");
        } finally {
          actualizarEstados();
          intervaloNotificacionEmergente();
        }
      };
      borrarTodosLosPedidos();
    }
  }


  return (
    <>
      <Modal isOpen={open} cancelar={cancelar} aceptar={aceptar} disableAceptar={losPedidos.length == 0}>
      <div className="w-full h-full justify-center items-center flex">
      {losPedidos.length == 0 ? (
            <div>
                <p className="text-center text-3xl">
                  { lenguajeEs? "You don't have any products in your cart yet." : "Aún no tiene ningún producto en el carrito." }
                </p>
            </div>
          ) : (
            <div>
              <p className="text-center text-3xl">
             { lenguajeEs? "Are you sure you want to remove all your orders from the cart ?" : " ¿Estas seguro de que quieres eliminar todos tus pedidos del carrito?" }
              </p>
            </div>
          )}
          </div>
      </Modal>

      { verNotificacion && <NotificacionEmergente tipo={tipoNotificacion} mensaje={mensajeNotificacion}/> }

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
            <h1 className="text-2xl"> { lenguajeEs?  "Orders" : "Pedidos" } </h1>
          </div>

          <div
            className="flex flex-wrap items-center gap-2 p-2"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AccionEnCarrito nombre={ `${lenguajeEs? "Delete all orders" : "Eliminar todos los pedidos" }` } />
          </div>

          <div className="text-gray-300 mx-4">
            <div className="grid grid-cols-6">
              <h5 className="col-span-4">{ lenguajeEs? "Article" : "Artículo" }</h5>
              <h5 className="col-span-2 flex justify-center">Cant.</h5>
            </div>

            <div className="h-[50vh] lg:h-[60vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-100">
              {losPedidos.length === 0 ? (
                <div className="rounded-sm text-center py-10 sm:py-40 lg:py-52 text-red-500 border-t-2 mt-1 border-b-2 border-red-500 m-auto">
                  <span> { lenguajeEs? "You do not have any orders yet" : "Aún no tiene pedidos" } </span>
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
