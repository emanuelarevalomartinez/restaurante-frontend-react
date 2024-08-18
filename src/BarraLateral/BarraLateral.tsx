

import {
  RiHome6Line,
  RiPieChartLine,
  RiMailLine,
  RiNotificationLine,
  RiSettings4Line,
  RiLogoutCircleRLine,
  RiEditLine,
} from "react-icons/ri";
import { LI, A } from "./Styles/UI";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Contexto } from "../Contexto";
import { Modal } from "../common";

interface Props {
  visivility: boolean;
}

export function BarraLateral({ visivility }: Props) {
  const {
    handleVerOcultarContenido,
    selectElementBarraLateral,
    handleChangeSelecionBarraLateral,
    logout,
    lenguajeEs,
  } = useContext(Contexto);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function cancelar() {
    setOpen(false);
  }

  function aceptar() {
    logout();
    setOpen(false);
  }

  function handleHacerClickEnSeccion(seccion: string) {
    if (seccion === "salir") {
      setOpen(true);
    } else {
      const isHome = seccion === "/";
      localStorage.setItem("verSeccionesAmpliadas", JSON.stringify(!isHome));
  
      handleVerOcultarContenido(!isHome);
      navigate(seccion);
      handleChangeSelecionBarraLateral(seccion);
    }
  }

  return (
    <>
      <Modal isOpen={open} cancelar={cancelar} aceptar={aceptar}>
        <div className="w-full h-full justify-center items-center flex">
          <p className="text-center text-3xl">
           { lenguajeEs? "Are you sure you want to leave ?" : " ¿Estás seguro de que quieres salir?" }
          </p>
        </div>
      </Modal>

      <div
        className={`flex flex-col justify-between bg-[#1F1D2B] -left-full fixed top-0 w-28 h-full py-6 rounded-l-xl lg:left-0 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-100 ${
          visivility ? "left-0" : "-left-full"
        }`}
      >
        <div>
          <ul className="pl-4">
            <li>
              <h1 className="text-2xl text-gray-300 uppercase font-bold text-center my-5">
                Logo
              </h1>
            </li>

            {selectElementBarraLateral.map((seccion, index) => (
              <LI key={index} selected={seccion.seleccionado}>
                <A
                  selected={seccion.seleccionado}
                  onClick={() => handleHacerClickEnSeccion(seccion.nombre)}
                >
                  {index === 0 && <RiHome6Line className="text-2xl" />}
                  {index === 1 && <RiEditLine className="text-2xl" />}
                  {index === 2 && <RiPieChartLine className="text-2xl" />}
                  {index === 3 && <RiMailLine className="text-2xl" />}
                  {index === 4 && <RiNotificationLine className="text-2xl" />}
                  {index === 5 && <RiSettings4Line className="text-2xl" />}
                  {index === 6 && <RiLogoutCircleRLine className="text-2xl" />}
                </A>
              </LI>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

