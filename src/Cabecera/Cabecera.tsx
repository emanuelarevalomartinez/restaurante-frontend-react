
import { useContext } from "react";
import { PalabraCambiarColor } from "./PalabraCambiarColor";
import { Contexto } from "../Contexto";


export function Cabecera() {

    const { lenguajeEs } = useContext(Contexto)


    return (
        <header className={`px-4 pt-4`}>
            <div className={`flex flex-col gap-4 mb-6 md:flex-row md:justify-start md:items-center`}>
                <div className="flex flex-col w-full">
                    <h1 className="flex flex-wrap flex-row text-gray-300 text-xl col-span-2 text-start md:text-center gap-2">
                        {lenguajeEs? "Welcome to the Restaurant" : "Bienvenido al Restaurante"  }
                    <PalabraCambiarColor palabra="Presidente" tiempoEspera={3000}/>
                    </h1>
                    <p className="text-gray-500 text-base">{new Date().getDate()} - {new Date().getMonth() + 1} - {new Date().getFullYear()}</p>
                </div>
            </div>
        </header>
    )
}