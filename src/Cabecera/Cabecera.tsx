import { RiSearch2Line } from "react-icons/ri";
import { PalabraCambiarColor } from "./PalabraCambiarColor";
import { useContext } from "react";
import { Contexto } from "../Contexto";


export function Cabecera() {

const { verOcultarRestoDeSeccion, logout } = useContext(Contexto);

    return (
        <header className={`${verOcultarRestoDeSeccion? "w-screen" : "w-auto"} px-4 sm:p-4`}>
            <div className={`${verOcultarRestoDeSeccion? "md:justify-between md:items-stretch lg:pl-2 lg:pr-28" : "md:justify-around md:items-center"} flex flex-col gap-4 mb-1 sm:mb-6 md:flex-row`}>
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2">
                    <h1 className="flex flex-wrap flex-row gap-4 text-gray-300 text-xl col-span-2 text-start md:text-center">Bienvenido al Restaurante </h1>
                    <PalabraCambiarColor palabra="Presidente" tiempoEspera={3000}/>
                    <p className="text-gray-500 text-sm sm:text-base">{new Date().getDate()} - {new Date().getMonth() + 1} - {new Date().getFullYear()}</p>
                    <button className="bg-red-500" onClick={ ()=> {
                    logout();
                    } }>Salir</button>
                </div>
                <form>
                    <div className="w-full relative">
                        <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                        <input type="text" className="bg-[#1F1D2B] w-full py-2 pl-8 pr-4 rounded-lg text-gray-300 outline-none" placeholder="Buscar" />
                    </div>
                </form>
            </div>
        </header>
    )
}