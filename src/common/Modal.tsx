import { useEffect, useRef } from "react";

interface Props{
     children: React.ReactNode;
    isOpen:boolean;
    cancelar: ()=> void;
    aceptar: ()=> void;
  }

export function Modal({isOpen,cancelar,aceptar,children}:Props){

    const referencia = useRef<HTMLDivElement>(null);

    const handleHacerClickFuera = (event: MouseEvent) => {
        if (referencia.current && !referencia.current.contains(event.target as Node)) {
          cancelar();
        }
      };

    useEffect(() => {
        document.addEventListener("mousedown", handleHacerClickFuera);
        return () => {
          document.removeEventListener("mousedown", handleHacerClickFuera);
        };
      }, []);

    return(
        <>
        { isOpen &&

        <div 
        
        className="fixed w-screen h-screen bg-black bg-opacity-70 backdrop-blur-sm z-10 inset-0 transition-all duration-700 ease-in-out">
          <div 
          ref={referencia}
          className="fixed bg-transparent z-10 inset-0 flex flex-col justify-center border-0 sm:border w-full h-full sm:w-5/6 sm:h-5/6 lg:w-1/2 lg:h-1/2 left-0 top-0 sm:left-[10%] sm:top-[10%] lg:top-1/4 lg:left-1/4 rounded-2xl transition-all duration-700 ease-in-out"
          >

            <div 
            className="flex h-[92%] sm:h-[90%] md:h-5/6 rounded-2xl p-2">

            <div className="w-full rounded-2xl p-2 h-full m-auto flex text-white">
                {children}
            </div>
            </div>
            <div className="flex h-[8%] sm:h-[10%] md:h-1/6 gap-2 rounded-2xl p-2">

            <button 
            className="sm:bg-transparent bg-[#ec7c6a] hover:bg-[#e02a0e] border-0 sm:border text-black sm:text-red-500 py-0 px-4 sm:py-2 m-auto rounded-2xl hover:text-white hover:border-transparent"
            onClick={ ()=> { cancelar() } }
            >Cancelar</button>
            <button 
            className="sm:bg-transparent bg-[#6a97ec] hover:bg-[#0e2de0] border-0 sm:border text-black sm:text-blue-500 py-0 px-4 sm:py-2 m-auto rounded-2xl hover:text-white hover:border-transparent"
            onClick={ ()=> {
                aceptar();
            } }
            >Aceptar</button>
            </div>
          </div>
        </div>
        }
        </>
    )
}