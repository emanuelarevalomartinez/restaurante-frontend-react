
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { 
    nombre:string;
}
 
export function AccionEnCarrito({nombre}:Props) {
    return (
        <button 
        className="hover:bg-[#ec7c6a] text-[#ec7c6a] w-full hover:text-white py-2 px-2 rounded-xl border border-gray-500"
        >
         {nombre}
        </button>
    )
}