import { useContext } from "react";
import { Contexto } from "../Contexto";



export function RedireccionAutentificacion(){

const { setRedireccionAutentificacion, lenguajeEs } = useContext(Contexto);

    return(
        <div className="w-full mt-0 sm:w-3/4 sm:mt-4 h-screen sm:h-[90vh] md:mt-[10vh] md:h-[80vh] text-white m-auto md:w-3/4 flex flex-col rounded-md p-2 bg-red-500">
         
        <div className=" flex flex-col items-center h-1/2 justify-center my-auto text-center">
          <p className="mb-2 text-2xl"> { lenguajeEs? "Your account has been deleted successfully" : "Su cuenta a sido eliminada correctamente" } </p>
          <button className="flex items-center  gap-1 justify-center hover:bg-black bg-[#1F1D3B] py-2 px-4 "
          onClick={ ()=> {
            console.log("volver a inicio");
            setRedireccionAutentificacion(false);
          } }
          > { lenguajeEs? "Return to Home Screen" : "Volver a pantalla Inicio" }
           </button>
        </div>
       </div>
    )
}