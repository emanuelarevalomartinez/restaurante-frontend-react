import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Contexto } from "../../Contexto";
import { ImagenPlato } from "./UI/ImagenPlato";
import { PLato } from "./UI";
import { getBebidas } from ".";
import { Cargando, Paginacion, Seleccionar } from "../../common";

export function Bebidas(){


    const { verOcultarRestoDeSeccion,lasBebidas, setLasBebidas,escuchaBebidas,setEscuchaBebidas } = useContext(Contexto);

    useEffect(() => {
      if(escuchaBebidas){

        const obtenerBebidas = async () => {
          await getBebidas()
          .then( (data)=> {

            setLasBebidas(data);
            setEscuchaBebidas(false);
          } 
          )
          
        };
        obtenerBebidas();
      }
      }, [escuchaBebidas]);

      const [isOpen, setIsOpen] = useState(false);
      const [seleccion, setSeleccion] = useState("A-Z");
      const [elementos] = useState(["A-Z", "Z-A"]);
      const referencia = useRef<HTMLDivElement>(null);
    
      const hacerClick = () => setIsOpen(!isOpen);
    
      const handleCambiarSeleccionado = (option: string) => {
        setSeleccion(option);
        setIsOpen(false);
      };

      const ocultarLista = useCallback(() => {
        setIsOpen(false);
    }, []);
    
      const handleHacerClickFuera = (event: MouseEvent) => {
        if (
          referencia.current &&
          !referencia.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener("mousedown", handleHacerClickFuera);
    
        return () => {
          document.removeEventListener("mousedown", handleHacerClickFuera);
        };
      }, []);


      if(escuchaBebidas){
         return(
          <div>
            <Cargando/>
          </div>
         )
      }


    return (
        <div className={`${verOcultarRestoDeSeccion? "hidden" : "px-4"}`}>
        <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl text-gray-300">Bebidas</h2>
            <Seleccionar
          listaElementos={elementos}
          seleccion={seleccion}
          isOpen={isOpen}
          hacerClick={hacerClick}
          handleCambiarSeleccionado={handleCambiarSeleccionado}
          referencia={referencia}
          posicionListaDesplegable="right-4 lg:right-[26.5%] xl:right-[26%]"
          ocultarLista={ocultarLista}
          ancho={`w-20`}
        />

        </div>
    <div className="grid p-8 grid-cols-1 md:grid-cols-2 gap-16 lg:grid-cols-3">



       { 
          lasBebidas.map( (bebida,index)=> {
           return (
                <PLato key={index}
                  identificador={bebida.idBebida}
                  nombreProducto={bebida.descripcionBebida}
                  precio={bebida.precio}
                  cantRestante={bebida.cantRestante}
                  direccionImagen={bebida.imagenAsociada}
                >
                     <ImagenPlato src={bebida.imagenAsociada}/>
                </PLato>
           )
          } )
       }
    </div>
    <div>
      <Paginacion/>
    </div>
    </div>
    )
}