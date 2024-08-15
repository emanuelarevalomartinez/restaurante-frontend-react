import { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Chequear, ImputGlobal, LabelGlobal, Modal } from "../common";
import { Auth } from "../Autentificacion/Auth";
import { Contexto } from "../Contexto";
import {
  deleteAllNotificacionesByUsuario,
  getLasNotificaciones,
} from "../Notificaciones";
import { deleteUsuario } from "../Autentificacion";

// FIXME hacer que editar funcione con  toda y la validacion del frontend 
// TODO añadir la funcionalidad de traducir al ingles usando localstorage para mantener el idioma

export function Configuracion() {
  const navigate = useNavigate();

  const auth = Auth();

  const [chequeado, setChequeado] = useState(false);
  const [openBorrarNotificaciones, setOpenBorrarNotificaciones] =
    useState(false);
  const [openBorrarPerfil, setOpenBorrarPerfil] = useState(false);
  const [openEditarPerfil, setOpenEditarPerfil] = useState(false);
  const [noHayNotificaciones, setNoHayNotificaciones] = useState(true);

  const [editarNombre, setEditarNombre] = useState("");
  const [editarCorreo, setEditarCorreo] = useState("");
  const [editarVerificarContraseña, setEditarVerificarContraseña] = useState("");
  const [editarNuevaContraseña, setEditarNuevaContraseña] = useState("");
  const [editarNuevaContraseñaConfirmar, setEditarNuevaContraseñaConfirmar] = useState("");

  const {
    lasNotificaciones,
    setLasNotificaciones,
    setRedireccionAutentificacion,
    logout,
  } = useContext(Contexto);

  function cancelarBorrarNotificaciones() {
    setOpenBorrarNotificaciones(false);
  }

  function aceptarBorrarNotificaciones() {
    setOpenBorrarNotificaciones(true);

    const eliminarTodasNotificaciones = async () => {
      if (auth) {
        await deleteAllNotificacionesByUsuario(auth.idUsuario)
          .then(() => {
            console.log("correcto");
          })
          .catch(() => {
            console.log("error");
          })
          .finally(() => {
            setOpenBorrarNotificaciones(false);
          });
      }
    };
    eliminarTodasNotificaciones();
    setLasNotificaciones([]);
  }

  function cancelarBorrarPerfil() {
    setOpenBorrarPerfil(false);
  }

  function aceptarBorrarPerfil() {
    const borrarUsuario = async () => {
      if (auth) {
        await deleteUsuario(auth.idUsuario)
          .then(() => {
            console.log("correcto eliminacion");
            setRedireccionAutentificacion(true);
            logout();
          })
          .catch(() => {
            console.log("error al eliminar el usuario");
          })
          .finally(() => {
            setOpenBorrarPerfil(false);
          });
      }
    };

    borrarUsuario();
  }

  function cancelarEditarPerfil() {
    setOpenEditarPerfil(false);
  }

  function aceptarEditarPerfil() {
    setOpenEditarPerfil(false);
  }

  useEffect(() => {
    const verificarHayNotificaciones = async () => {
      if (auth) {
        const verificarExistenNotificciones = await getLasNotificaciones(
          auth.idUsuario
        );
        let arregloNotificaciones: [] = verificarExistenNotificciones;

        if (arregloNotificaciones.length !== 0) {
          setNoHayNotificaciones(false);
        } else {
          setNoHayNotificaciones(true);
        }
      }
    };
    verificarHayNotificaciones();
    setEditarNombre( ()=> {
      if(auth){
        return auth.nombre;
      } else {
        return "";
      }
    } )
    setEditarCorreo( ()=> {
      if(auth){
        return auth.email;
      } else {
        return "";
      }
    } )
    setEditarVerificarContraseña("");
    setEditarNuevaContraseña("");
    setEditarNuevaContraseñaConfirmar("");
  }, [lasNotificaciones,openEditarPerfil]);

  return (
    <>
      <Modal
        isOpen={openBorrarNotificaciones}
        cancelar={cancelarBorrarNotificaciones}
        aceptar={aceptarBorrarNotificaciones}
        disableAceptar={noHayNotificaciones}
      >
        <div className="w-full h-full justify-center items-center flex">
          {noHayNotificaciones ? (
            <div>
              <p className="text-center text-3xl">
                Aún no tiene ninguna notificación que borrar.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-center text-3xl">
                ¿Estas seguro de que quieres eliminar todas tus notificaciones?
              </p>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={openBorrarPerfil}
        cancelar={cancelarBorrarPerfil}
        aceptar={aceptarBorrarPerfil}
      >
        <div className="w-full h-full justify-center items-center flex">
          <div>
            <p className="text-center text-3xl">
              Esta seguro de que quieres eliminar su perfil y todos sus datos.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={openEditarPerfil}
        cancelar={cancelarEditarPerfil}
        aceptar={aceptarEditarPerfil}
      >
        <div className="w-full h-full justify-center items-center flex">
          <div className=" w-full h-full rounded-md">
            <p className="text-base sm:text-2xl text-center text-blue-500">Editar Perfíl</p>
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full md:w-1/3 text-center py-1 px-1">
                <LabelGlobal color="primary">Nombre</LabelGlobal>
              </div>
              <div className="w-full md:w-2/3 py-0 sm:py-1 px-1">
                <ImputGlobal
              value={editarNombre}
              onChange={(e) => setEditarNombre(e.target.value)}
                ></ImputGlobal>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full md:w-1/3 text-center py-1 px-1">
                <LabelGlobal color="primary">Correo</LabelGlobal>
              </div>
              <div className="w-full md:w-2/3 py-0 sm:py-1 px-1">
                <ImputGlobal
                value={editarCorreo}
                onChange={(e) => setEditarCorreo(e.target.value)}
                ></ImputGlobal>
              </div>
            </div>{" "}
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full md:w-1/3 text-center py-1 px-1">
                <LabelGlobal color="primary">Contraseña actual</LabelGlobal>
              </div>
              <div className="w-full md:w-2/3 py-0 sm:py-1 px-1">
                <ImputGlobal
                value={editarVerificarContraseña}
                onChange={(e) => setEditarVerificarContraseña(e.target.value)}
                ></ImputGlobal>
              </div>
            </div>{" "}
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full md:w-1/3 text-center py-1 px-1">
                <LabelGlobal color="primary">Nueva Contraseña</LabelGlobal>
              </div>
              <div className="w-full md:w-2/3 py-0 sm:py-1 px-1">
                <ImputGlobal
                value={editarNuevaContraseña}
                onChange={(e) => setEditarNuevaContraseña(e.target.value)}
                ></ImputGlobal>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full md:w-1/3 text-center py-1 px-1">
                <LabelGlobal color="primary">Confirmar Contraseña</LabelGlobal>
              </div>
              <div className="w-full md:w-2/3 py-0 sm:py-1 px-1">
                <ImputGlobal
                value={editarNuevaContraseñaConfirmar}
                onChange={(e) => setEditarNuevaContraseñaConfirmar(e.target.value)}
                ></ImputGlobal>
              </div>
            </div>
          </div>
        </div>
      </Modal>

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
            <div className="flex h-16 w-[90%] m-auto py-2 justify-center text-wrap text-white">
              <p className="overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-100 text-wrap text-center">
                {auth?.nombre.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="grid h-72 sm:h-auto col-span-1 row-span-1 col-start-1 row-start-2 sm:col-start-2 sm:row-start-1 lg:col-start-2 lg:row-start-1 border border-red-500 m-1 rounded-2xl">
            <div className="flex flex-col justify-center w-3/4 sm:w-1/2 h-1/2 items-center m-auto">
              <button
                className="flex gap-2 items-center bg-[#6a97ec] hover:bg-[#0e2de0] border-0 sm:border text-black py-0 px-4 sm:py-2 m-auto rounded-2xl hover:text-white hover:border-transparent text-xl sm:text-base"
                onClick={() => {
                  setOpenEditarPerfil(true);
                }}
              >
                <RiEditLine />
                Editar Perfíl
              </button>
              <button
                className="flex gap-2 items-center bg-[#6a97ec] hover:bg-[#0e2de0] border-0 sm:border text-black py-0 px-4 sm:py-2 m-auto rounded-2xl hover:text-white hover:border-transparent text-xl sm:text-base"
                onClick={() => {
                  setOpenBorrarPerfil(true);
                }}
              >
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
                  <Chequear chequeado={chequeado} setChequeado={setChequeado} />
                  <p className=" text-white">EN </p>
                </div>
              </div>

              <hr className="border border-red-500" />

              <div className="flex py-2 text-xl sm:text-base text-white">
                <p>Borrar las Notificaciones</p>
                <button
                  className="flex gap-2 items-center bg-[#6a97ec] hover:bg-[#0e2de0] border-0 sm:border text-black py-0 px-4 sm:py-2 m-auto rounded-2xl hover:text-white hover:border-transparent"
                  onClick={() => {
                    setOpenBorrarNotificaciones(true);
                  }}
                >
                  <RiDeleteBin6Line />
                </button>
              </div>

              <hr className="border border-red-500" />

              <div>
                <button
                  className="flex items-center text-white m-auto border-b border-blue-500 hover:text-blue-500 hover:border-b-white"
                  onClick={() => {
                    navigate("/Recursos");
                  }}
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
    </>
  );
}
