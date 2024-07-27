import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Contexto } from "../Contexto";


export function BarraDeNavegacion() {

    let platosCalientes: string = "border-b border-[#ec7c6a] text-[#ec7c6a] mx-2 flex flex-nowrap";
    let platosFrios: string = "border-b border-blue-500 text-blue-500 mx-2 flex flex-nowrap";
    let bebidas: string = "border-b border-emerald-500 text-emerald-500 mx-2 flex flex-nowrap";
    let postres: string = "border-b border-yellow-500 text-yellow-500 mx-2 flex flex-nowrap";
    let estiloNormal: string = "mx-2 flex flex-nowrap";
    const [estadoSeleccion, setestadoSeleccion] = useState(0);

    function HandleCambiarEstado(nuevoEstado: number) {
        if (nuevoEstado == 0) {
            setestadoSeleccion(0);
        } else if (nuevoEstado == 1) {
            setestadoSeleccion(1);
        } else if (nuevoEstado == 2) {
            setestadoSeleccion(2);
        } else {
            setestadoSeleccion(3);
        }
    }

    const { verOcultarRestoDeSeccion } = useContext(Contexto);

    return (
        <nav className={`${verOcultarRestoDeSeccion? "hidden" : "flex overflow-x-auto sm:overflow-x-hidden text-gray-300 justify-start sm:justify-around mb-6 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-10"}`}>
            <Link 
                to="/"
                onClick={() => { HandleCambiarEstado(0) }}
                className={estadoSeleccion == 0 ? platosCalientes : estiloNormal}> <span className="mr-2">Platos</span> <span>Calientes</span>
            </Link>
            <Link 
                to="/PlatosFrios"
                onClick={() => { HandleCambiarEstado(1) }}
                className={estadoSeleccion == 1 ? platosFrios : estiloNormal}> <span className="mr-2">Platos</span> <span>Fríos</span>
            </Link>
            <Link 
                to="/Sopas"
                onClick={() => { HandleCambiarEstado(2) }}
                className={estadoSeleccion == 2 ? bebidas : estiloNormal}> Bebidas
            </Link>
            <Link 
                to="/Parrilladas"
                onClick={() => { HandleCambiarEstado(3) }}
                className={estadoSeleccion == 3 ? postres : estiloNormal}> Postres
            </Link>
        </nav>
    )
}