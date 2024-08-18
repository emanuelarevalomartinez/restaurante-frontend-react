import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Contexto } from "../../Contexto";
import { useContext } from "react";


export function Recursos(){

    const navigate = useNavigate();

    const { lenguajeEs } = useContext(Contexto);

    // TODO: Hay que colocar todos los datos pertinentes aqui y ajustar el texto

    return(
        <div className="mt-48 sm:mt-44 md:mt-40 lg:mt-40 mx-2">
           <div className="flex items-center justify-between mb-2">
        <h2 
        className="text-xl text-gray-300 flex gap-2"
        > 
            <span className="flex items-center border rounded-full p-1 cursor-pointer"
              onClick={ ()=> {
                navigate("/Configuracion");
              } }
            >
                <RiArrowLeftLine/>
                 </span> 
           { lenguajeEs? "Configuration/Resources" : " Configuración/Recursos" }
            </h2>
      </div>

<div  className="text-white text-wrap">
    <p> { lenguajeEs? "External resources used in the project which were used with a free license" : "Recursos externos empleados en el proyecto los cuales fueron empleados con una  licencia gratuita" }   </p>
</div>

        </div>
    )
}