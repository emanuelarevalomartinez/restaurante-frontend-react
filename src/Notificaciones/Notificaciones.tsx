import { RiArrowDownSLine } from "react-icons/ri";
import { Notificacion } from "./Notificacion";


export function Notificaciones(){
    return(
        <div className="mt-48 sm:mt-44 md:mt-40 lg:mt-40 mx-2">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl text-gray-300">Notificaciones</h2>
                <button 
                onClick={ ()=> { console.log("Cambiar a orden inverso de a-z");
                 } }
                className="flex bg-[#1F1D2B] items-center gap-4 text-gray-300 py-2 px-4 rounded-lg"
                > <RiArrowDownSLine 
                /> Ultimo 
                </button>
            </div>
       <Notificacion/>
       <Notificacion/>
       <Notificacion/>
       <Notificacion/>
       <Notificacion/>
        </div>
    )
}