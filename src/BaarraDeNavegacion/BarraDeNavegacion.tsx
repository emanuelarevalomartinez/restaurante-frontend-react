import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Contexto } from "../Contexto";
import { Auth } from "../Autentificacion/Auth";


export function BarraDeNavegacion() {

    let platosCalientes: string = "border-b border-[#ec7c6a] text-[#ec7c6a] mx-2 flex flex-nowrap";
    let platosFrios: string = "border-b border-blue-500 text-blue-500 mx-2 flex flex-nowrap";
    let bebidas: string = "border-b border-emerald-500 text-emerald-500 mx-2 flex flex-nowrap";
    let postres: string = "border-b border-yellow-500 text-yellow-500 mx-2 flex flex-nowrap";
    let estiloNormal: string = "mx-2 flex flex-nowrap";
    const [estadoSeleccion, setestadoSeleccion] = useState(0);

    const auth = Auth();

    const { verOcultarRestoDeSeccion, lenguajeEs } = useContext(Contexto);

useEffect(() => {

    if(auth){
        const posicion = localStorage.getItem('posicionBarraNavegacion');
        if(posicion){
            const parsear= JSON.parse(posicion);
            setestadoSeleccion(parsear);
        } else {
            setestadoSeleccion(0);
        }
    }

}, [verOcultarRestoDeSeccion])



    function HandleCambiarEstado(nuevoEstado: number) {
        if (nuevoEstado == 0) {
            localStorage.setItem("posicionBarraNavegacion", JSON.stringify(0));
            setestadoSeleccion(0);
        } else if (nuevoEstado == 1) {
            localStorage.setItem("posicionBarraNavegacion", JSON.stringify(1));
            setestadoSeleccion(1);
        } else if (nuevoEstado == 2) {
            localStorage.setItem("posicionBarraNavegacion", JSON.stringify(2));
            setestadoSeleccion(2);
        } else {
            localStorage.setItem("posicionBarraNavegacion", JSON.stringify(3));
            setestadoSeleccion(3);
        }
    }


    return (
        <nav className={`${verOcultarRestoDeSeccion? "hidden" : "flex overflow-x-auto sm:overflow-x-hidden text-gray-300 justify-start sm:justify-around mb-6 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-10"} z-30`}>
            <Link 
                to="/"
                onClick={() => { HandleCambiarEstado(0) }}
                className={estadoSeleccion == 0 ? platosCalientes : estiloNormal}> <span className="mr-2">{ lenguajeEs? "Hot" : "Platos" }</span> <span> { lenguajeEs? "Dishes" : "Calientes" }</span>
            </Link>
            <Link 
                to="/PlatosFrios"
                onClick={() => { HandleCambiarEstado(1) }}
                className={estadoSeleccion == 1 ? platosFrios : estiloNormal}> <span className="mr-2">{ lenguajeEs? "Cold" : "Platos" }</span> <span> { lenguajeEs? "Dishes" : "Fríos" } </span>
            </Link>
            <Link 
                to="/Bebidas"
                onClick={() => { HandleCambiarEstado(2) }}
                className={estadoSeleccion == 2 ? bebidas : estiloNormal}> { lenguajeEs? "Drinks" : "Bebidas" }
            </Link>
            <Link 
                to="/Postres"
                onClick={() => { HandleCambiarEstado(3) }}
                className={estadoSeleccion == 3 ? postres : estiloNormal}> { lenguajeEs? "Desserts" : "Postres" }
            </Link>
        </nav>
    )
}