import { useContext } from "react";
import { RiAlertLine, RiCheckLine, RiCloseLine, RiSpam2Line } from "react-icons/ri";
import { Contexto } from "../Contexto";
import { deleteNotificacion } from "./las-notificaciones.servicios";

interface Props {
    idNotificacion:string;
    tipo: string;
    mensaje: string;
    fecha:string;
    hora:string;
  }


export function Notificacion({idNotificacion,mensaje, tipo,fecha,hora}:Props) {

  const { setEscuchaNotificaciones } = useContext(Contexto);

  async function eliminarNotificacion(){
    await deleteNotificacion(idNotificacion)
    .then(() => {
       setEscuchaNotificaciones(true);
    });
  }

  const getTipoNotificacion = (tipo: string) => {
    switch (tipo) {
      case "Correcto":
        return "bg-green-100 text-green-500";
      case "Advertencia":
        return "bg-yellow-100 text-yellow-500";
      case "Error":
        return "bg-red-100 text-red-500";
    }
  };

  const getColorNotificacion = (tipo: string) => {
    switch (tipo) {
      case "Correcto":
        return "bg-green-600";
      case "Advertencia":
        return "bg-yellow-600";
      case "Error":
        return "bg-red-600";
    }
  };

  return (
    <div className={`rounded-lg text-gray-50 p-4 my-4 ${getColorNotificacion(tipo)}`}>
      <div className="flex flex-col">


        <div className=" flex w-full h-10">
          <p className="flex w-10/12 sm:w-11/12 items-center text-2xl gap-2">
          <span className={`border p-2 rounded-full ${getTipoNotificacion(tipo)}`}>

                    { tipo == "Correcto" && <RiCheckLine className=""/> }
                    { tipo == "Advertencia" && <RiAlertLine className=""/> }
                    { tipo == "Error" && <RiSpam2Line className=""/> }
          </span>
            {tipo}
          </p>
          <div
            className=" w-2/12 sm:w-1/12 flex justify-center items-center cursor-pointer border rounded-xl text-black hover:bg-red-500 hover:border-red-500 hover:text-white"
            onClick={() => {
              console.log("hola");
              eliminarNotificacion();
            }}
          >
            <RiCloseLine />
          </div>
        </div>

        <div className="text-lg flex flex-col">
          <p
          >
            {fecha}
          </p>

          <p
          >
            {hora}
          </p>
        </div>
      </div>

      <div className="pt-2">
        <p>
          {mensaje}
        </p>
      </div>
    </div>
  );
}
