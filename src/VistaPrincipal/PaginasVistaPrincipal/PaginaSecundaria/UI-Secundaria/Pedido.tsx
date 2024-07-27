import { RiCheckboxCircleFill, RiCheckboxCircleLine, RiDeleteBin6Fill, RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";


interface Props extends React.HTMLAttributes<HTMLDivElement> { 
    descripcion:string;
    cantidad:number;
    montoTotal:number;
    imagen:string;
    tipoProducto:string;
 }

export function Pedido({descripcion,cantidad,montoTotal,imagen,tipoProducto}:Props){
    

    const [guardarNota, setguardarNota] = useState(false);
    const [eliminarNota, seteliminarNota] = useState(false);
    const [colorProducto, setcolorProducto] = useState(() => {
        let color = "";
        if(tipoProducto == "plato-Caliente"){
              color = "text-[#ec7c6a]";
        }
        return color;
      });

   
    
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
            {/* <input
                type="text"
                className="bg-[#1F1D2B] col-span-4 py-1 px-4 rounded-lg outline-none"
                placeholder="Añadir nota"
            /> */}
            <p className={`bg-[#1F1D2B] col-span-4 py-1 px-4 rounded-lg outline-none ${colorProducto}`}>{tipoProducto}</p>
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
                 
                    <h5 className="col-span-2">Precio: </h5>
                   <span className="col-span-4">{montoTotal}</span>
        </div>
    </div>
    )
}