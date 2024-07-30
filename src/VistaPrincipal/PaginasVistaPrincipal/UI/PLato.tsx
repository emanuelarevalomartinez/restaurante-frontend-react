import { useContext, useEffect, useState } from "react";
import { RiAddLine, RiSubtractFill, RiSubtractLine } from "react-icons/ri";
import { Contexto } from "../../../Contexto";
import { PlatoCalienteActualizar } from "../../../Interfaces";
import { Cargando } from "../../../common";
import { getUnPlato, updatePlatoCaliente } from ".";


interface Props extends React.HTMLAttributes<HTMLDivElement> {
    identificador:string;
    nombreProducto: string;
    precio: number;
    cantidadRestante: number;
    direccionImagen:string;
}


export function PLato({ children, identificador, nombreProducto, precio, cantidadRestante,direccionImagen }: Props) {

    const [overDisminuir, setoverDisminuir] = useState(false);
    const [overAumentar, setoverAumentar] = useState(false);
    const [cantidadRest, setcantidadRest] = useState(cantidadRestante);
    const [cantidadAOrdenar] = useState(1)
    const [addPedido, setAddPedido] = useState(false);
    const [removePedido, setRemovePedido] = useState(false);
    const { HandleAddPedido,HandleActualizarPlatoCalienteEspeficico,HandleSubPedido,losPedidos,escuchaPlatoCaliente,setEscuchaPlatoCaliente } = useContext(Contexto);


    useEffect(() => {
        if(escuchaPlatoCaliente){

           const obtenerUnPlato = async ()=> {
            const platoObtenido = await getUnPlato(identificador);
             if(platoObtenido){
                 setcantidadRest(platoObtenido.cantRestante);
             }
            
               setEscuchaPlatoCaliente(false);
           }
           obtenerUnPlato();
        }
    }, [escuchaPlatoCaliente])
    useEffect(() => {
        if(addPedido){
            const actualizarPlato = async () => {
                if(cantidadRest-1 < 0 ){
                    console.log("imposible");

                } else {

                    const nuevoPlato:PlatoCalienteActualizar = await updatePlatoCaliente(identificador,{
                        cantRestante: cantidadRest-1,
                        
                    });
                    if(nuevoPlato.id){
                        HandleActualizarPlatoCalienteEspeficico(nuevoPlato.id,nuevoPlato.cantRestante);
                            }
                            setcantidadRest(nuevoPlato.cantRestante);
                }
        }
        actualizarPlato();
        }
        setAddPedido(false);
   
  }, [addPedido])


  useEffect(() => {
    if(removePedido){
        const actualizarPlato = async () => {
            let nuevoPlato:PlatoCalienteActualizar;
            const findProductoExistente = losPedidos.filter(
                (pedido) => pedido.idProducto === identificador
              );
              if(findProductoExistente.length > 0){
                  nuevoPlato = await updatePlatoCaliente(identificador,{
                      cantRestante: cantidadRest+1,
                  });
                  if(nuevoPlato.id){
                      HandleActualizarPlatoCalienteEspeficico(nuevoPlato.id,nuevoPlato.cantRestante);
                  }
                  setcantidadRest(nuevoPlato.cantRestante);
              } else {

              }
    }
    actualizarPlato();
    }
    
    setRemovePedido(false);
  }, [removePedido])
  
  

  if(addPedido && cantidadRest-1 > 0  || removePedido && cantidadRest-1 > 0){
     return(
        <div  className="bg-[#1F1D2B] w-auto lg:w-48 xl:w-auto p-8 rounded-xl flex flex-col items-center my-2 gap-2 text-center text-gray-300">
       <div className="w-40 h-32 -mt-20 items-center bg-[#37334d] flex flex-col justify-center rounded-full ">
          <Cargando/>
        </div>
           <p className="text-xl"></p>
            <span className="text-gray-400"></span>
            <div className=" flex gap-2 h-full w-full justify-around items-center">
                <button
                    onMouseEnter={() => setoverDisminuir(true)}
                    onMouseLeave={() => setoverDisminuir(false)}
                    disabled={true}
                    className={`mx-1 rounded-md border text-red-500 border-red-500 p-2 ${overDisminuir ? 'bg-red-500 text-white' : ''} flex items-center justify-center`}
                >
                    {overDisminuir ? <RiSubtractFill /> : <RiSubtractLine />}
                </button>

                <p className="text-gray-600">0</p>

                <button
                    onMouseEnter={() => setoverAumentar(true)}
                    onMouseLeave={() => setoverAumentar(false)}
                    disabled={true}
                    className={`mx-1 rounded-md border text-blue-500 border-blue-500 p-2 ${overAumentar ? 'bg-blue-500 text-white' : ''} flex items-center justify-center`}
                >
                    {overAumentar ? <RiAddLine /> : <RiAddLine />}
                </button>
            </div>
        </div>
     )
  }

  //* tengo que añadir el nuevo pedido al arreglo de pedidos
  //*  evitar actualizar el plato cuando la cantidad sea menor que 0
    

    return (
        <div className="bg-[#1F1D2B] w-auto lg:w-48 xl:w-auto p-8 rounded-xl flex flex-col items-center my-2 gap-2 text-center text-gray-300">
            {children}
            <p className="text-xl">{nombreProducto}</p>
            <span className="text-gray-400">$ {precio}</span>
            <div className=" flex gap-2 h-full w-full justify-around items-center">
                <button
                    onMouseEnter={() => setoverDisminuir(true)}
                    onMouseLeave={() => setoverDisminuir(false)}
                    disabled={removePedido}
                    className={`mx-1 rounded-md border text-red-500 border-red-500 p-2 ${overDisminuir ? 'bg-red-500 text-white' : ''} flex items-center justify-center`}
                    onClick={() => { 
                        HandleSubPedido(identificador,nombreProducto,precio,cantidadAOrdenar,direccionImagen);
                        setRemovePedido(true);

                    }}
                >
                    {overDisminuir ? <RiSubtractFill /> : <RiSubtractLine />}
                </button>

                <p className="text-gray-600">{cantidadRest}</p>

                <button
                    onMouseEnter={() => setoverAumentar(true)}
                    onMouseLeave={() => setoverAumentar(false)}
                    disabled={addPedido}
                    className={`mx-1 rounded-md border text-blue-500 border-blue-500 p-2 ${overAumentar ? 'bg-blue-500 text-white' : ''} flex items-center justify-center`}
                    onClick={() => { 
                        setAddPedido(true);
                        // HandleDisminuirCantPlatos(identificador,data);
                        if(cantidadRest > 0){
                            HandleAddPedido(identificador,nombreProducto,precio,cantidadAOrdenar,direccionImagen);
                        }
                     }}
                >
                    {overAumentar ? <RiAddLine /> : <RiAddLine />}
                </button>
            </div>
        </div>
    )
}