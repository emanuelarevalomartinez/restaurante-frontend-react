import { useEffect, useState } from "react";
import {
  RiAlertLine,
  RiCheckLine,
  RiCloseLine,
  RiSpam2Line,
} from "react-icons/ri";

interface Props {
  mensaje: string;
  tipo: string;
  duracion?: number;
}

export function NotificacionEmergente({ tipo, mensaje, duracion = 3000 }: Props) {

  const [visible, setVisible] = useState(true);
  
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

  useEffect(() => {
    const tiempo = setTimeout(() => {
      setVisible(false);
    }, duracion);

    return () => clearTimeout(tiempo);
  }, [duracion]);

  if (!visible) return null;

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-10 rounded-xl bg-white p-4 text-sm w-3/4 sm:w-1/2 lg:w-1/4">
        <p 
        className="top-6 absolute right-4 ml-auto text-slate-500 hover:text-slate-900"
        onClick={ ()=> {
            setVisible(false);
        } }
        >
          <RiCloseLine className="w-5 h-5" />
        </p>
        <div className="flex space-x-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getTipoNotificacion(tipo)}`}>
            
            { tipo == "Correcto" && <RiCheckLine className="h-5 w-5"/> }
            { tipo == "Advertencia" && <RiAlertLine className="h-5 w-5"/> }
            { tipo == "Error" && <RiSpam2Line className="h-5 w-5"/> }
          </div>
          <div className="flex items-center">
            <p className="pr-6 font-medium text-slate-900">
              {tipo}
            </p>
          </div>
        </div>
        <div>
          <p className="truncate">
            { mensaje }
          </p>
        </div>
    </div>
  );
}
