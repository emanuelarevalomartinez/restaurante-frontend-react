
import { Notificacion } from "./Notificacion";
import { Cargando, NoHay, Seleccionar } from "../common";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Contexto } from "../Contexto";
import { getLasNotificaciones } from "./las-notificaciones.servicios";
import { Auth } from "../Autentificacion/Auth";


export function Notificaciones(){

  const { lasNotificaciones, setLasNotificaciones, escuchaNotificaciones, setEscuchaNotificaciones, lenguajeEs } = useContext(Contexto);
  
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [seleccion, setSeleccion] = useState( ()=> {
      if(lenguajeEs){
      return "Latest"
      } else {
        return "Ultimas"
      }
    } );
    const [elementos] = useState(()=> {
      if(lenguajeEs){
      return ["Latest", "First"]
       } else {
        return ["Ultimas", "Primeras"];
       }
    });
    const referencia = useRef<HTMLDivElement>(null);

  
    const hacerClick = () => setIsOpen(!isOpen);
  
    const handleCambiarSeleccionado = (option: string) => {
      setSeleccion(option);
      setIsOpen(false);
    };

    const ocultarLista = useCallback(() => {
        setIsOpen(false);
    }, []);
  
    const handleHacerClickFuera = (event: MouseEvent) => {
      if (
        referencia.current &&
        !referencia.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const obtenerLasNotificaciones = async () => {
      setIsLoading(true);
     const auth = Auth();
     if(auth){
       const notificaciones = await getLasNotificaciones(auth.idUsuario, seleccion === "Ultimas" || seleccion === "Latest");
       setLasNotificaciones(notificaciones);
       setEscuchaNotificaciones(false);
       setIsLoading(false);
     }
    };
  
    useEffect(() => {
      obtenerLasNotificaciones();
      document.addEventListener("mousedown", handleHacerClickFuera);
  
      return () => {
        document.removeEventListener("mousedown", handleHacerClickFuera);
      };
    }, [seleccion,escuchaNotificaciones]);

    if(isLoading){
       return(
        <div className="mt-48 sm:mt-44 md:mt-40 lg:mt-40 mx-2">
          <Cargando/>
        </div>
       )
    }

    if(!lasNotificaciones.length){
        return(
          <div className="mt-48 sm:mt-44 md:mt-40 lg:mt-40 mx-2">
            <NoHay elemento="Notificaciones"/>
          </div>
        )
    }


    return(
        <div className="mt-48 sm:mt-44 md:mt-40 lg:mt-40 mx-2">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl text-gray-300"> { lenguajeEs? "Notifications" : "Notificaciones"} </h2>
                   <Seleccionar
          listaElementos={elementos}
          seleccion={seleccion}
          isOpen={isOpen}
          hacerClick={hacerClick}
          handleCambiarSeleccionado={handleCambiarSeleccionado}
          referencia={referencia}
          ocultarLista={ocultarLista}
          ancho={`w-32`}
        />
            </div>
            {
                lasNotificaciones.map( (notificacion, index)=> (
                 <Notificacion
                 key={index}
                 idNotificacion={notificacion.idNotificacion}
                 fecha={notificacion.fecha}
                 hora={notificacion.hora}
                 mensaje={notificacion.mensaje}
                 tipo={notificacion.tipo}
                 >
                 </Notificacion>
                )
                 )
            }
        </div>
    )
}