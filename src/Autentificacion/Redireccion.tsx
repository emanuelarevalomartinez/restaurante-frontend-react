import { useContext } from "react";
import { Contexto } from "../Contexto";
import { RiArrowRightLine } from "react-icons/ri";


export function Redireccion(){


    const { setRedireccion, lenguajeEs } = useContext(Contexto);

    return(
        <div className="w-full mt-0 sm:w-3/4 sm:mt-4 h-screen sm:h-[90vh] md:mt-[10vh] md:h-[80vh] text-white m-auto md:w-3/4 flex flex-col rounded-md p-2 bg-red-500">
         
         <div className=" flex flex-col items-center h-1/2 justify-center my-auto text-center">
           <p className="mb-2 text-2xl"> { lenguajeEs? "Your account has been created successfully" : "Su cuenta a sido creada correctamente" } </p>
           <button className="flex items-center  gap-1 justify-center hover:bg-black bg-[#1F1D3B] py-2 px-4 "
           onClick={ ()=> {
            setRedireccion(false);
           } }
           > { lenguajeEs? "Login" : "Iniciar Sesión" }
            <span> <RiArrowRightLine/> </span> 
            </button>
         </div>
        </div>
    )
}