import { useContext, useState } from "react";
import { RiAddLine, RiSubtractFill, RiSubtractLine } from "react-icons/ri";
import { Contexto } from "../../../Contexto";


interface Props extends React.HTMLAttributes<HTMLDivElement> {
    identificador:string;
    nombreProducto: string;
    precio: number;
    cantRestante: number;
    direccionImagen:string;
}


export function PLato({ children, identificador, nombreProducto, precio, cantRestante,direccionImagen }: Props) {

    const [overDisminuir, setoverDisminuir] = useState(false);
    const [overAumentar, setoverAumentar] = useState(false);
    const [cantidadAOrdenar] = useState(1)
    const { HandleAddPedido,HandleSubPedido,escuchaPedidos } = useContext(Contexto);

    return (
        <div className="bg-[#1F1D2B] w-auto lg:w-48 xl:w-auto p-8 rounded-xl flex flex-col items-center my-2 gap-2 text-center text-gray-300">
            {children}
            <p className="text-xl">{nombreProducto}</p>
            <span className="text-gray-400">$ {precio}</span>
            <div className=" flex gap-2 h-full w-full justify-around items-center">
                <button
                    onMouseEnter={() => setoverDisminuir(true)}
                    onMouseLeave={() => setoverDisminuir(false)}
                    disabled={escuchaPedidos}
                    className={`mx-1 rounded-md border text-red-500 border-red-500 p-2 ${overDisminuir ? 'bg-red-500 text-white' : ''} flex items-center justify-center`}
                    onClick={() => { 
                        HandleSubPedido(identificador,nombreProducto,precio,cantidadAOrdenar,direccionImagen,cantRestante);
                    }}
                >
                    {overDisminuir ? <RiSubtractFill /> : <RiSubtractLine />}
                </button>

                <p className="text-gray-600">{cantRestante}</p>

                <button
                    onMouseEnter={() => setoverAumentar(true)}
                    onMouseLeave={() => setoverAumentar(false)}
                    disabled={escuchaPedidos}
                    className={`mx-1 rounded-md border text-blue-500 border-blue-500 p-2 ${overAumentar ? 'bg-blue-500 text-white' : ''} flex items-center justify-center`}
                    onClick={() => {
                        if(cantRestante > 0){
                            HandleAddPedido(identificador,nombreProducto,precio,cantidadAOrdenar,direccionImagen,cantRestante);
                        }
                     }}
                >
                    {overAumentar ? <RiAddLine /> : <RiAddLine />}
                </button>
            </div>
        </div>
    )
}