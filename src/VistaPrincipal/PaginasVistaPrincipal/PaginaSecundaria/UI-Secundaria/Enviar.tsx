
interface Props{
    descuento:number,
    subtotal:number;
}


export function Enviar({descuento,subtotal}:Props){

    function alerta(){
            alert("Funcionalidad pago is coming soon...");
}

    return (
        <div className={`bg-[#262837] w-full fixed bottom-0 left-auto text-center lg:bottom-0 lg:right-0 lg:left-auto lg:w-1/4 p-4 mx-auto`}>
            <div className="flex items-center justify-between mb-1 sm:mb-4">
                <span className="text-gray-400">Descuento</span>
                <span>$ {descuento}</span>
            </div>
            <div className="flex items-center justify-between mb-1 sm:mb-6">
                <span className="text-gray-400">Subtotal</span>
                <span>$ {subtotal}</span>
            </div>
                <div className="w-full bg-[#ec7c6a] py-0 sm:py-2 rounded-lg text-white hover:bg-[#e02a0e]"
                onClick={ ()=> { alerta() } }
                >
                   <button
                   >Pagar
                   </button>
                </div>
        </div>
    )
}