import { useContext, useState } from "react";
import { RiAddLine, RiSubtractFill, RiSubtractLine } from "react-icons/ri";
import { Contexto } from "../../../Contexto";


interface Props extends React.HTMLAttributes<HTMLDivElement> {
    identificador:string;
    nombreProducto: string;
    precio: number;
    cantidadRestante: number;
    direccionImagen:string;
}


export function PLato({ children, identificador, nombreProducto, precio, cantidadRestante,direccionImagen }: Props) {

    const cantidadInicial:number = cantidadRestante;

    const [overDisminuir, setoverDisminuir] = useState(false);
    const [overAumentar, setoverAumentar] = useState(false);
    const [cantidadRest, setcantidadRest] = useState(cantidadRestante);
    const [cantidadAOrdenar] = useState(1)
    const { HandleAddPedido,HandleSubPedido, handleAddArticulo, handleSubArticulo } = useContext(Contexto);


    function handleAumentarCantidadRestante() {
        
        setcantidadRest(cantidadRest + 1);
        if(cantidadRest+1 > cantidadInicial){
            setcantidadRest(cantidadInicial);
        }
    }
    function handleDisminuirCantidadRestante() {
    
        setcantidadRest(cantidadRest - 1);
        if (cantidadRest - 1 < 0) {
            setcantidadRest(0);
        }
    }

   
    //
    

    return (
        <div className="bg-[#1F1D2B] w-auto lg:w-48 xl:w-auto p-8 rounded-xl flex flex-col items-center my-2 gap-2 text-center text-gray-300">
            {children}
            <p className="text-xl">{nombreProducto}</p>
            <span className="text-gray-400">$ {precio}</span>
            <div className=" flex gap-2 h-full w-full justify-around items-center">
                <button
                    onMouseEnter={() => setoverDisminuir(true)}
                    onMouseLeave={() => setoverDisminuir(false)}
                    className={`mx-1 rounded-md border text-red-500 border-red-500 p-2 ${overDisminuir ? 'bg-red-500 text-white border-none' : ''} flex items-center justify-center`}
                    onClick={() => { handleAumentarCantidadRestante();
                        HandleSubPedido(identificador,cantidadInicial,nombreProducto,precio,cantidadRest,cantidadAOrdenar,direccionImagen);
                        handleSubArticulo(cantidadRest,cantidadInicial);
                    }}
                >
                    {overDisminuir ? <RiSubtractFill /> : <RiSubtractLine />}
                </button>

                <p className="text-gray-600">{cantidadRest}</p>

                <button
                    onMouseEnter={() => setoverAumentar(true)}
                    onMouseLeave={() => setoverAumentar(false)}
                    className={`mx-1 rounded-md border text-blue-500 border-blue-500 p-2 ${overAumentar ? 'bg-blue-500 text-white border-none' : ''} flex items-center justify-center`}
                    onClick={() => { handleDisminuirCantidadRestante();
                                     HandleAddPedido(identificador,nombreProducto,precio,cantidadRest,cantidadAOrdenar,direccionImagen);
                                     handleAddArticulo(cantidadRest);
                     }}
                >
                    {overAumentar ? <RiAddLine /> : <RiAddLine />}
                </button>
            </div>
        </div>
    )
}