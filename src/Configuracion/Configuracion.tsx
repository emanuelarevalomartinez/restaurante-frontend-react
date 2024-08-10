import { useState } from "react";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export function Configuracion() {

  const navigate = useNavigate();

  const [chequeado, setchequeado] = useState(false);

  return (
    <div className="mt-48 sm:mt-44 md:mt-40 lg:mt-40 mx-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl text-gray-300">Configuración</h2>
      </div>

      <div className="grid grid-cols-1 grid-rows-1 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 lg:grid-rows-2 rounded-2xl">
        <div className="grid h-72 sm:h-auto col-span-1 row-span-1 col-start-1 row-start-1 lg:col-start-1 lg:row-start-1 border border-red-500 m-1 rounded-2xl">
          <div className="flex justify-center">
            <div className="bg-[#0e2de0] flex justify-center items-center w-48 h-48 m-4 rounded-full shadow-lg">
              <svg
                className="w-32 h-32 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
          <div className="flex py-2 justify-center text-wrap text-white">
            <p>@NombreUsuarioConUnNombreLargo</p>
          </div>
        </div>

        <div className="grid h-72 sm:h-auto col-span-1 row-span-1 col-start-1 row-start-2 sm:col-start-2 sm:row-start-1 lg:col-start-2 lg:row-start-1 border border-red-500 m-1 rounded-2xl">
          <div className="flex flex-col justify-center w-3/4 sm:w-1/2 h-1/2 items-center m-auto">
            <button className="flex gap-2 items-center bg-[#6a97ec] hover:bg-[#0e2de0] border-0 sm:border text-black py-0 px-4 sm:py-2 m-auto rounded-2xl hover:text-white hover:border-transparent text-xl sm:text-base">
              <RiEditLine />
              Editar Perfíl
            </button>
            <button className="flex gap-2 items-center bg-[#6a97ec] hover:bg-[#0e2de0] border-0 sm:border text-black py-0 px-4 sm:py-2 m-auto rounded-2xl hover:text-white hover:border-transparent text-xl sm:text-base">
              <RiDeleteBin6Line />
              Eliminar Perfíl
            </button>
          </div>
        </div>

        <div className="grid h-72 sm:h-auto col-span-1 row-span-1 col-start-1 row-start-3 sm:col-start-1 sm:row-start-2 lg:col-start-3 lg:row-start-1 border border-red-500 m-1 rounded-2xl">
          <div className="flex flex-col m-auto w-3/4 h-1/2 justify-between">
            <div>
              <div className="flex gap-2 h-6 justify-center">
                <p className="text-white">Traducir ES </p>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    onChange={() => {
                      setchequeado(!chequeado);
                    }}
                    defaultChecked={chequeado}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white  peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                </label>
                <p className=" text-white">EN </p>
              </div>
            </div>

            <hr className="border border-red-500" />

            <div className="flex py-2 text-xl sm:text-base text-white">
              <p>Borrar las Notificaciones</p>
              <button className="flex gap-2 items-center bg-[#6a97ec] hover:bg-[#0e2de0] border-0 sm:border text-black py-0 px-4 sm:py-2 m-auto rounded-2xl hover:text-white hover:border-transparent">
                <RiDeleteBin6Line />
              </button>
            </div>

            <hr className="border border-red-500" />

            <div>
              <button 
              className="flex items-center text-white m-auto border-b border-blue-500 hover:text-blue-500 hover:border-b-white"
              onClick={ ()=> {
                navigate("/Recursos");
              } }
              >
                Recursos
              </button>
            </div>
          </div>
        </div>

        <div className="grid h-72 sm:h-auto col-start-1 row-start-4 sm:col-start-2 sm:row-start-2 lg:col-start-1 lg:row-start-2 lg:col-span-3 lg:row-span-1">
          <div className="flex text-wrap flex-col text-center m-auto justify-center items-center w-1/2 h-1/2">
            <p className="text-white text-xl">
              Proximanente más personalizaciones
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
