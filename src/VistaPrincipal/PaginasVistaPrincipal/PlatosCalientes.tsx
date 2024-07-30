import { RiArrowDownSLine } from "react-icons/ri";
import { PLato, getPlatosCalientes } from "./UI";
import { ImagenPlato } from "./UI/ImagenPlato";
import { useContext, useEffect } from "react";
import { Contexto } from "../../Contexto";
import { Cargando } from "../../common";

export function PlatosCalientes() {

  const { setPlatosCalientes,platosCalientes,verOcultarRestoDeSeccion,escuchaPlatosCalientes,setEscuchaPlatoCaliente,setEscuchaPlatosCalientes } = useContext(Contexto);
  
  useEffect(() => {
    if(escuchaPlatosCalientes){
      const obtenerPlatos = async () => {
        const platosObtenidos = await getPlatosCalientes();
        setPlatosCalientes(platosObtenidos);
        setEscuchaPlatosCalientes(false);
      };
      obtenerPlatos();
    }
  }, [escuchaPlatosCalientes]);


  if (escuchaPlatosCalientes) {
    return <Cargando/>;
  }

      if (!platosCalientes.length) {
        return(
          <div className="flex flex-col items-center">
            <p className="text-red-500">Actualmente no hay platos</p>
          </div>
        )
      }
      

    return (
        <div className={`${verOcultarRestoDeSeccion? "hidden" : "px-4"}`}>
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl text-gray-300">Platos Calientes</h2>
                <button 
                onClick={ ()=> { console.log("Cambiar a orden inverso de a-z");
                     setEscuchaPlatoCaliente(true);
                 } }
                className="flex bg-[#1F1D2B] items-center gap-4 text-gray-300 py-2 px-4 rounded-lg"
                > <RiArrowDownSLine 
                /> A-Z 
                </button>
            </div>
        <div className="grid p-8 grid-cols-1 md:grid-cols-2 gap-16 lg:grid-cols-3">



           { 
              platosCalientes.map( (plato,index)=> {
               return (
                    <PLato key={index}
                      identificador={plato.id}
                      nombreProducto={plato.descripcionPlato}
                      precio={plato.precio}
                      cantidadRestante={plato.cantRestante}
                      direccionImagen={plato.imagenAsociada}
                    >
                         <ImagenPlato src={plato.imagenAsociada}/>
                    </PLato>
               )
              } )
           }
        </div>
        </div>
    )
}