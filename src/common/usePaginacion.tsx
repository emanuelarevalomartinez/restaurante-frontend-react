import { useState, useEffect } from "react";


const usePaginacion = (seccion: string, elementosPorPagina:number = 6) => {
  const [paginaActual, setPaginaActual] = useState(() => {
    const storedPage = localStorage.getItem(`paginaActual-${seccion}`);
    return storedPage ? JSON.parse(storedPage) : 1;
  });
  const [cantPaginas, setCantPaginas] = useState(0);

  useEffect(() => {
    localStorage.setItem(`paginaActual-${seccion}`, JSON.stringify(paginaActual));
  }, [paginaActual, seccion]);

  const calcularTotalPaginas = (totalDeProductos: number) => {
    setCantPaginas(Math.ceil(totalDeProductos / elementosPorPagina));
  };

  return {
    paginaActual,
    setPaginaActual,
    cantPaginas,
    calcularTotalPaginas,
  };
};

export default usePaginacion;
