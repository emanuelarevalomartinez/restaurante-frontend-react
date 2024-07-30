import { RiCheckboxCircleFill, RiCheckboxCircleLine, RiDeleteBin6Fill, RiDeleteBin6Line } from "react-icons/ri";
import { useContext, useState } from "react";
import { Contexto } from "../../../../Contexto";
import { deletePedido } from "../Secundaria-Servicios";
import { Cargando } from "../../../../common";
import { updatePlatoCaliente, updatePlatoCalienteByPedido } from "../../UI";


interface Props extends React.HTMLAttributes<HTMLDivElement> { 
    identificador:string;
    identificadorPlato:string;
    descripcion:string;
    cantidad:number;
    montoTotal:number;
    imagen:string;
    tipoProducto:string;
 }

export function Pedido({identificador,identificadorPlato,descripcion,cantidad,montoTotal,imagen,tipoProducto}:Props){
  
    

    const [guardarNota, setguardarNota] = useState(false);
    const [eliminarNota, seteliminarNota] = useState(false);
    const [colorProducto] = useState(() => {
        let color = "";
        if(tipoProducto == "Plato Caliente"){
              color = "text-[#ec7c6a]";
        }
        return color;
      });
      

    const { escuchaPedidos,setEscuchaPedidos,HanddleDevolverTodosLosPlatos,setEscuchaPlatoCaliente } = useContext(Contexto);

      if(escuchaPedidos){

            return(
              <div className="bg-[#262837] rounded-xl py-4 my-2 px-2 text-center w-auto">
                   <div className="grid grid-cols-6 items-center mb-4">
            <div className="flex items-center gap-3 col-span-5">
                <div className="w-10 h-10 bg-red-500 rounded-full">
                </div>
                <div className="text-start">
                    <h5 className="text-sm">
                        <Cargando/>
                        </h5>
                </div>
            </div>
            <div className="col-span-1">
                <span>0</span>
            </div>
        </div>
        <div className="grid grid-cols-6">
            <p className={`bg-[#1F1D2B] col-span-4 py-1 px-4 rounded-lg outline-none ${colorProducto}`}>
                <Cargando/>
                </p>
            <button
                onMouseEnter={() => setguardarNota(true)}
                onMouseLeave={() => setguardarNota(false)}
                className={`mx-1 rounded-lg border text-blue-500 border-blue-500 ${guardarNota? 'bg-blue-500 text-black border-none': ''} flex items-center justify-center`}
                >
                {guardarNota ? <RiCheckboxCircleFill/> : <RiCheckboxCircleLine/>}
            </button>
            <button
                onMouseEnter={() => seteliminarNota(true)}
                onMouseLeave={() => seteliminarNota(false)}
                className={`mx-1 rounded-lg border text-red-500 border-red-500 ${eliminarNota? 'bg-red-500 text-yellow-300 border-none': ''} flex items-center justify-center`}
                >
                {eliminarNota ? <RiDeleteBin6Fill/> : <RiDeleteBin6Line/>}
            </button>
                 
                    <h5 className="col-span-2">Total: </h5>
                   <span className="col-span-4">
                    <Cargando/>
                    </span>
        </div>
              </div>
            )
      }


   
    
    return (
        <div className="bg-[#262837] rounded-xl py-4 my-2 px-2 text-center w-auto">
        <div className="grid grid-cols-6 items-center mb-4">
            <div className="flex items-center gap-3 col-span-5">
                <img src={imagen}
                    alt="It's not posibble to se the photo"
                    className="w-10 h-10 object-cover"

                />
                <div className="text-start">
                    <h5 className="text-sm">{descripcion}</h5>
                </div>
            </div>
            <div className="col-span-1">
                <span>{cantidad}</span>
            </div>
        </div>
        <div className="grid grid-cols-6">
            <p className={`bg-[#1F1D2B] col-span-5 py-1 px-4 rounded-lg outline-none ${colorProducto}`}>{tipoProducto}</p>
            {/* <button
                onMouseEnter={() => setguardarNota(true)}
                onMouseLeave={() => setguardarNota(false)}
                className={`mx-1 rounded-lg border text-blue-500 border-blue-500 ${guardarNota? 'bg-blue-500 text-black border-none': ''} flex items-center justify-center`}
                >
                {guardarNota ? <RiCheckboxCircleFill/> : <RiCheckboxCircleLine/>}
            </button> */}
            <button
                onMouseEnter={() => seteliminarNota(true)}
                onMouseLeave={() => seteliminarNota(false)}
                disabled={escuchaPedidos}
                className={`mx-1 rounded-lg border text-red-500 border-red-500 ${eliminarNota? 'bg-red-500 text-yellow-300 border-none': ''} flex items-center justify-center`}
                onClick={ async ()=> {
                   await deletePedido(identificador);
                   await updatePlatoCalienteByPedido(identificadorPlato,cantidad).then(()=> {

                       HanddleDevolverTodosLosPlatos(identificadorPlato,cantidad);
                       setEscuchaPedidos(true);
                       setEscuchaPlatoCaliente(true);
                   });
                    // setEscuchaPlatosCalientes(true);
                } }
                >
                {eliminarNota ? <RiDeleteBin6Fill/> : <RiDeleteBin6Line/>}
            </button>
                 
                    <h5 className="col-span-2">Total: </h5>
                   <span className="col-span-4"> <span>$</span>  {montoTotal}</span>
        </div>
    </div>
    )
}