

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface Props{
  cantPaginas:number;
  paginaActual:number;
  setPaginaActual: (e: number)=> void;
}

export function Paginacion ({ cantPaginas, paginaActual, setPaginaActual }:Props) {
  const add = () => {
    if (paginaActual < cantPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const sub = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  return (
    <div className={`${cantPaginas < 2? "hidden" : "flex justify-center space-x-1 text-gray-800"}`}>
      <button
        className={`${paginaActual === 1 ? "hidden" : "bg-[#1F1D2B] flex items-center content-center justify-center w-14 gap-2 h-8 text-sm rounded text-white hover:text-white hover:bg-red-500"}`}
        onClick={sub}
      >
        <RiArrowLeftSLine />
        <span>{paginaActual - 1}</span>
      </button>
      <p className="bg-[#262837] flex items-center content-center justify-center w-14 gap-2 h-8 text-sm rounded text-white">
        {paginaActual}
      </p>
      <button
        className={`${paginaActual === cantPaginas ? "hidden" : "bg-[#1F1D2B] flex items-center content-center justify-center w-14 gap-2 h-8 text-sm rounded text-white hover:text-white hover:bg-red-500"}`}
        onClick={add}
      >
        <span>{paginaActual + 1}</span>
        <RiArrowRightSLine />
      </button>
    </div>
  );
};

