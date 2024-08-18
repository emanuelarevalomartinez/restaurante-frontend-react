import { useNavigate } from "react-router-dom";
import { Contexto } from "../Contexto";
import { useContext } from "react";


export function RechasoEditarProductos(){

    const navigate = useNavigate(); 

  const { lenguajeEs } = useContext(Contexto);

    return(
        <div className="mx-auto w-[50vw] sm:w-[70vw] h-[60vh] sm:h-[40vh] flex items-center justify-center content-center">
        <div>
            <p className="text-xl text-start text-red-500">
        { lenguajeEs? `If you cannot see this section as a "User" please contact the administrators in the section:` : `Si no puede ver esta sección siendo "Usuario" por favor comuniquese con los administradores en el apartado:` }
            </p>
        <p className="flex items-center justify-center h-10 text-center text-white transition-all cursor-pointer rounded-xl bg-[#332f47] mt-2 lg:mt-8 w-auto sm:w-1/2 lg:w-1/3 text-lg m-auto hover:bg-[#1F1D2B] hover:text-blue-500  hover:text-xl "
        onClick={ ()=> { navigate("/AcercaDe") } }
        > { lenguajeEs? "CONTACT US" : "CONTACTANOS" } </p>
        </div>
    </div>
    )
}