import { RiCloseLine } from "react-icons/ri";


export function Notificacion(){

// colors
// ok => bg-green-800 text-white
// alert=> bg-orange-500 text-white
// critical => bg-red-800 text-white


    return(
        <div className="m-4 rounded-lg bg-green-800 text-white px-2 sm:px-8 py-2">
            <div className="grid grid-cols-4 sm:grid-cols-12 p-4">
            <p className="row-start-1 sm:row-start-auto col-start-1 sm:col-start-auto col-span-3 sm:col-span-4 md:col-span-5 ">Tipo de notificación </p>
            <p className="row-start-2 sm:row-start-auto col-span-3 sm:col-span-5 md:col-span-4"> 25 de Septiembre de 2043 </p>
            <p className="row-start-3 sm:row-start-auto col-span-3 sm:col-span-2">13 : 33 p.m.</p>
            
                <div className="row-start-1 row-span-3 sm:row-auto sm:row-start-auto col-start-4 sm:col-start-auto col-span-1 sm:col-span-1 text-center flex cursor-pointer ">
                <div className="w-2/3 h-2/3 sm:w-full sm:h-full m-auto flex justify-center items-center rounded-md  bg-[#1F1D2B] text-red-800"
            onClick={()=> {
            }}
            
            >
                <RiCloseLine/></div>
                </div>
            </div>
            <div className="py-2">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fuga numquam, repudiandae sint ut dicta porro iure repellendus facere illum quos minima unde, odit asperiores quidem cumque, maxime nemo tempore?</p>
            </div>
        </div>
    )
}