import { RiDeleteBin6Fill, RiDeleteBin6Line } from "react-icons/ri";
import { useContext, useState } from "react";
import { Contexto } from "../../../../Contexto";
import { deletePedido, getUnPedido } from "../Secundaria-Servicios";
import { updatePlatoCalienteByPedido } from "../../UI";
import {
  updateBebidaByPedido,
  updatePLatoFrioByPedido,
  updatePostreByPedido,
} from "../..";
import { NotificacionEmergente } from "../../../../common";
import { crearNotificacion } from "../../../../Notificaciones";
import { Auth } from "../../../../Autentificacion/Auth";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  identificador: string;
  identificadorProducto: string;
  descripcion: string;
  cantidad: number;
  montoTotal: number;
  imagen: string;
  tipoProducto: string;
}

export function Pedido({
  identificador,
  identificadorProducto,
  descripcion,
  cantidad,
  montoTotal,
  imagen,
  tipoProducto,
}: Props) {
  const [verNotificacion, setVerNotificacion] = useState(false);
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");


  const intervaloNotificacionEmergente = () => {
    return new Promise((resolve) => {
      setVerNotificacion(true);
      setTimeout(() => {
        setVerNotificacion(false);
        resolve(null);
      }, 3000);
    });
  };

 

  const [eliminarProducto, seteliminarProducto] = useState(false);
  const getColorProducto = (tipo: string) => {
    switch (tipo) {
      case "Plato Caliente":
        return "text-[#ec7c6a]";
      case "Plato Frio":
        return "text-blue-500";
      case "Bebida":
        return "text-emerald-500";
      case "Postre":
        return "text-yellow-500";
    }
  };

  const {
    escuchaPedidos,
    setEscuchaPedidos,
    setEscuchaBebidas,
    setEscuchaPlatosCalientes,
    setEscuchaPlatosFrios,
    setEscuchaPostres,
    setEscuchaNotificaciones,
  } = useContext(Contexto);

  const crearNuevaNotificacion = async (
    nuevoMensaje: string,
    nuevoTipo: string
  ) => {
    const auth = Auth();
    if (auth) {
      await crearNotificacion(auth.idUsuario, {
        mensaje: nuevoMensaje,
        tipo: nuevoTipo,
      }).then(() => {
        setEscuchaNotificaciones(true);
      });
    }
  };

  async function eliminarPedido() {

    const actualizarEstados = () => {
      setEscuchaPedidos(true);
    }

    await getUnPedido(identificador)
      .then((data) => {
        const tipoProducto = data.tipoProducto;

        if(tipoProducto){
          if (tipoProducto == "Plato Caliente") {
            updatePlatoCalienteByPedido(identificadorProducto, cantidad);
            deletePedido(identificador).then(() => {
              setEscuchaPlatosCalientes(true);
            });
          } else if (tipoProducto == "Plato Frio") {
            updatePLatoFrioByPedido(identificadorProducto, cantidad);
            deletePedido(identificador).then(() => {
              setEscuchaPlatosFrios(true);
            });
          } else if (tipoProducto == "Bebida") {
            updateBebidaByPedido(identificadorProducto, cantidad);
            deletePedido(identificador).then(() => {
              setEscuchaBebidas(true);
            });
          } else if (tipoProducto == "Postre") {
            updatePostreByPedido(identificadorProducto, cantidad);
            deletePedido(identificador).then(() => {
              setEscuchaPostres(true);
            });
          }
          setMensajeNotificacion(
            "El producto fue eliminado exitosamente del carrito de las compras"
          );
          setTipoNotificacion("Correcto");
          crearNuevaNotificacion(
            "El producto fue eliminado exitosamente del carrito de las compras",
            "Correcto"
          );
        } else {
          setMensajeNotificacion(
            "El producto  no pudo ser eliminado exitosamente del carrito de las compras"
          );
          setTipoNotificacion("Error");
          crearNuevaNotificacion(
            "El producto no pudo ser eliminado exitosamente del carrito de las compras",
            "Error"
          );
        }

      })
      .catch(() => {
        setMensajeNotificacion(
          "El producto  no pudo ser eliminado exitosamente del carrito de las compras"
        );
        setTipoNotificacion("Error");
        crearNuevaNotificacion(
          "El producto no pudo ser eliminado exitosamente del carrito de las compras",
          "Error"
        );
      })
      .finally( async () => {
        await intervaloNotificacionEmergente();
        actualizarEstados();
      });
  }

  return (
    <>
      {verNotificacion && (
        <NotificacionEmergente
          tipo={tipoNotificacion}
          mensaje={mensajeNotificacion}
        />
      )}

      <div className="bg-[#262837] rounded-xl py-4 my-2 px-2 text-center w-auto">
        <div className="grid grid-cols-6 items-center mb-4">
          <div className="flex items-center gap-3 col-span-5">
            <img
              src={imagen}
              alt="It's not posibble to se the photo"
              className="w-10 h-10 object-cover"
            />
            <div className="text-start">
              <h5 className="text-sm">{descripcion}</h5>
            </div>
          </div>
          <div className="col-span-1">
            <span>{cantidad}</span>
          </div>
        </div>
        <div className="grid grid-cols-6">
          <p
            className={`bg-[#1F1D2B] col-span-5 py-1 px-4 rounded-lg outline-none ${getColorProducto(
              tipoProducto
            )}`}
          >
            {tipoProducto}
          </p>
          <button
            onMouseEnter={() => seteliminarProducto(true)}
            onMouseLeave={() => seteliminarProducto(false)}
            disabled={escuchaPedidos || verNotificacion}
            className={`mx-1 rounded-lg border text-red-500 border-red-500 ${
              eliminarProducto ? "bg-red-500 text-yellow-300 border-none" : ""
            } flex items-center justify-center`}
            onClick={() => {
              eliminarPedido();
            }}
          >
            {eliminarProducto ? <RiDeleteBin6Fill /> : <RiDeleteBin6Line />}
          </button>

          <h5 className="col-span-2">Total: </h5>
          <span className="col-span-4">
            {" "}
            <span>$</span> {montoTotal}
          </span>
        </div>
      </div>
    </>
  );
}
