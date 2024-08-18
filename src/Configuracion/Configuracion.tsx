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
import { deleteUsuario, updateUsuario } from "../Autentificacion";
import { UsuarioUpdate, UsuarioUpdateReturnError } from "../Interfaces";

// FIXME añadir todas las comprobaciones en el  backend antes de actualizar al usuario
// TODO añadir la funcionalidad de traducir al ingles usando localstorage para mantener el idioma

export function Configuracion() {
  const navigate = useNavigate();

  const auth = Auth();

  const validarEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const validarPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,16}$/;

  const validarNuevoNombre = /^[a-z0-9]{3,16}$/i;

  const [openBorrarNotificaciones, setOpenBorrarNotificaciones] =
    useState(false);
  const [openBorrarPerfil, setOpenBorrarPerfil] = useState(false);
  const [openEditarPerfil, setOpenEditarPerfil] = useState(false);
  const [noHayNotificaciones, setNoHayNotificaciones] = useState(true);

  const [editarNombre, setEditarNombre] = useState("");
  const [editarCorreo, setEditarCorreo] = useState("");
  const [editarVerificarContraseña, setEditarVerificarContraseña] =
    useState("");
  const [editarNuevaContraseña, setEditarNuevaContraseña] = useState("");
  const [editarNuevaContraseñaConfirmar, setEditarNuevaContraseñaConfirmar] =
    useState("");
  const [campoNombreYCorreoVacio, setCampoNombreYCorreoVacio] = useState(false);
  const [campoNombreInvalido, setCampoNombreInvalido] = useState(false);
  const [campoCorreoInvalido, setCampoCorreoInvalido] = useState(false);
  const [noIntrodujoContraseña, setNoIntrodujoContraseña] = useState(false);
  const [noIntrodujoContraseñaNueva, setNoIntrodujoContraseñaNueva] =
    useState(false);
  const [campoNuevaContraseñaEsInvalido, setCampoNuevaContraseñaEsInvalido] =
    useState(false);
  const [campoConfirmarNuevaContraseña, setCampoConfirmarNuevaContraseña] =
    useState(false);
  const [
    confirmarNuevaContraseñaSinQueExista,
    setConfirmarNuevaContraseñaSinQueExista,
  ] = useState(false);
  const [nombreYaExiste, setNombreYaExiste] = useState(false);
  const [emailYaExiste, setEmailYaExiste] = useState(false);
  const [passwordIncorrecta, setPasswordIncorrecta] = useState(false);

  const {
    lasNotificaciones,
    setLasNotificaciones,
    setRedireccionAutentificacion,
    logout,
    setLenguajeEs,
    lenguajeEs,
  } = useContext(Contexto);
  

  const actualizarPerfil = async (data: UsuarioUpdate) => {
    if (auth) {
      await updateUsuario(auth.idUsuario, data)
        .then((nuevaData) => {
          console.log("nuevaData");
          console.log(nuevaData);

          console.log("Actualización correcta");

          setNombreYaExiste(false);
          setEmailYaExiste(false);
          setPasswordIncorrecta(false);

          if (nuevaData == null) {
            console.log("error null");
          } else if ("nombre" in nuevaData) {
            const usuario = localStorage.getItem("usuario");
            if (usuario) {
              const usuarioActual = JSON.parse(usuario);
              usuarioActual.nombre = nuevaData.nombre;
              usuarioActual.email = nuevaData.email;
              localStorage.setItem("usuario", JSON.stringify(usuarioActual));
            }
            setOpenEditarPerfil(false);
          } else if ("nombreExiste" in nuevaData) {
            const errorData = nuevaData as UsuarioUpdateReturnError;
            console.log(errorData);
            setNombreYaExiste(errorData.nombreExiste);
            setEmailYaExiste(errorData.emailExiste);
            setPasswordIncorrecta(errorData.passwordIncorrecta);
          }
        })
        .catch(() => {
          console.log("error");
        })
        .finally(() => {
          // setOpenEditarPerfil(false);
        });
    }
  };

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
    const data: UsuarioUpdate = {};
    if (editarNombre.length > 0 && editarNombre !== auth?.nombre)
      data.nombre = editarNombre;
    if (editarCorreo.length > 0 && editarCorreo !== auth?.email)
      data.email = editarCorreo;
    if (editarVerificarContraseña.length > 0)
      data.password = editarVerificarContraseña;
    if (editarNuevaContraseña.length > 0)
      data.newPassword = editarNuevaContraseña;

    if (editarNombre.length === 0 || editarCorreo.length === 0) {
      setCampoNombreYCorreoVacio(true);
    } else {
      setCampoNombreYCorreoVacio(false);

      if (
        editarNuevaContraseñaConfirmar.length > 0 &&
        editarNuevaContraseña.length === 0
      ) {
        setConfirmarNuevaContraseñaSinQueExista(true);
      } else {
        setConfirmarNuevaContraseñaSinQueExista(false);
      }

      if (data.nombre) {
        if (validarNuevoNombre.test(editarNombre)) {
          setCampoNombreInvalido(false);
        } else {
          setCampoNombreInvalido(true);
          setCampoCorreoInvalido(false);
          setNoIntrodujoContraseñaNueva(false);
          setNoIntrodujoContraseña(false);
          setCampoNuevaContraseñaEsInvalido(false);
          setCampoConfirmarNuevaContraseña(false);
        }
      }

      if (data.email) {
        if (validarEmail.test(editarCorreo)) {
          setCampoCorreoInvalido(false);
        } else {
          setCampoCorreoInvalido(true);
          setCampoNombreInvalido(false);
          setNoIntrodujoContraseñaNueva(false);
          setNoIntrodujoContraseña(false);
          setCampoNuevaContraseñaEsInvalido(false);
          setCampoConfirmarNuevaContraseña(false);
        }
      }

      if (data.password) {
        if (data.newPassword) {
          setNoIntrodujoContraseñaNueva(false);
        } else {
          setNoIntrodujoContraseñaNueva(true);
          setCampoCorreoInvalido(false);
          setNoIntrodujoContraseña(false);
          setCampoCorreoInvalido(false);
          setCampoNombreInvalido(false);
          setCampoNuevaContraseñaEsInvalido(false);
          setCampoConfirmarNuevaContraseña(false);
        }
        setNoIntrodujoContraseña(false);
      } else {
        setNoIntrodujoContraseñaNueva(false);
      }

      if (data.newPassword) {
        if (data.password) {
          setNoIntrodujoContraseña(false);
          if (validarPassword.test(editarNuevaContraseña)) {
            setCampoNuevaContraseñaEsInvalido(false);
            if (data.newPassword === editarNuevaContraseñaConfirmar) {
              setCampoConfirmarNuevaContraseña(false);
            } else {
              setCampoConfirmarNuevaContraseña(true);
              setCampoNuevaContraseñaEsInvalido(false);
              setNoIntrodujoContraseña(false);
              setCampoCorreoInvalido(false);
              setNoIntrodujoContraseñaNueva(false);
              setCampoCorreoInvalido(false);
              setCampoNombreInvalido(false);
            }
          } else {
            setCampoNuevaContraseñaEsInvalido(true);
            setNoIntrodujoContraseña(false);
            setCampoCorreoInvalido(false);
            setNoIntrodujoContraseñaNueva(false);
            setCampoCorreoInvalido(false);
            setCampoNombreInvalido(false);
          }
        } else {
          setNoIntrodujoContraseña(true);
          setCampoCorreoInvalido(false);
          setNoIntrodujoContraseñaNueva(false);
          setCampoCorreoInvalido(false);
          setCampoNombreInvalido(false);
          setCampoConfirmarNuevaContraseña(false);
        }
        setNoIntrodujoContraseñaNueva(false);
      } else {
        setNoIntrodujoContraseña(false);
        setCampoNuevaContraseñaEsInvalido(false);
      }

      if (
        validarNuevoNombre.test(editarNombre) &&
        validarEmail.test(editarCorreo) &&
        validarPassword.test(editarNuevaContraseña) &&
        data.password &&
        data.newPassword === editarNuevaContraseñaConfirmar
      ) {
        actualizarPerfil(data);
      } else if (
        validarNuevoNombre.test(editarNombre) &&
        validarEmail.test(editarCorreo) &&
        !data.password &&
        !data.newPassword &&
        !editarNuevaContraseñaConfirmar
      ) {
        actualizarPerfil(data);
      } else {
        console.log("error");
      }
    }
  }

  function HandleCambiarIdioma(){
    localStorage.setItem("es", JSON.stringify(!lenguajeEs));
    console.log(lenguajeEs);
    
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
    setEditarNombre(() => {
      if (auth) {
        return auth.nombre;
      } else {
        return "";
      }
    });
    setEditarCorreo(() => {
      if (auth) {
        return auth.email;
      } else {
        return "";
      }
    });
    setEditarVerificarContraseña("");
    setEditarNuevaContraseña("");
    setEditarNuevaContraseñaConfirmar("");
    setCampoNombreYCorreoVacio(false);
    setCampoCorreoInvalido(false);
    setCampoNombreInvalido(false);
    setNoIntrodujoContraseña(false);
    setNoIntrodujoContraseñaNueva(false);
    setCampoNuevaContraseñaEsInvalido(false);
    setCampoConfirmarNuevaContraseña(false);
    setConfirmarNuevaContraseñaSinQueExista(false);
    setNombreYaExiste(false);
    setEmailYaExiste(false);
    setPasswordIncorrecta(false);
  }, [lasNotificaciones, openEditarPerfil]);

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
                { lenguajeEs? "You do not have any notification to delete yet." : "Aún no tiene ninguna notificación que borrar." }
              </p>
            </div>
          ) : (
            <div>
              <p className="text-center text-3xl">
                { lenguajeEs? "Are you sure you want to delete all your notifications ?" : "¿Estas seguro de que quieres eliminar todas tus notificaciones?" }
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
            <p className="text-center text-3xl text-red-400">
             { lenguajeEs? "Are you sure you want to delete your profile and all your data ?" : "¿Esta seguro de que quieres eliminar su perfil y todos sus datos?" }
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
          <div className="flex flex-col justify-center w-full h-full rounded-md">
            <div className="flex flex-col h-32">
              <p className="text-base sm:text-xl text-center text-blue-500">
                { lenguajeEs? "Edit Profile" : "Editar Perfíl" }
              </p>
              {campoNombreYCorreoVacio && (
                <p className="text-center text-white w-auto m-auto bg-red-500 px-2">
              { lenguajeEs? "Name and mail can not be empty" : "El nombre y el correo no puede quedar vacíos" }
                </p>
              )}
              {confirmarNuevaContraseñaSinQueExista &&
                !campoConfirmarNuevaContraseña &&
                !campoCorreoInvalido &&
                !campoNombreInvalido &&
                !campoNombreYCorreoVacio &&
                !noIntrodujoContraseñaNueva &&
                !noIntrodujoContraseña &&
                !campoNuevaContraseñaEsInvalido && (
                  <p className="text-center text-white w-auto m-auto bg-red-500 px-2">
                    { lenguajeEs? "To confirm enter the current password and the new password" : "Para confirmar ingrese la contraseña actual y la nueva contraseña" }
                  </p>
                )}

              {campoNombreInvalido &&
                !campoCorreoInvalido &&
                !campoNombreYCorreoVacio &&
                !noIntrodujoContraseñaNueva &&
                !noIntrodujoContraseña &&
                !campoNuevaContraseñaEsInvalido &&
                !campoConfirmarNuevaContraseña && (
                  <p className="text-center text-white w-auto m-auto bg-red-500 px-2">
                    { lenguajeEs? "The name must be between 3 and 16 letters long" : "El nombre debe tener entre 3 y 16 letras" }
                  </p>
                )}

              {campoCorreoInvalido &&
                !campoNombreInvalido &&
                !campoNombreYCorreoVacio &&
                !noIntrodujoContraseñaNueva &&
                !noIntrodujoContraseña &&
                !campoNuevaContraseñaEsInvalido &&
                !campoConfirmarNuevaContraseña && (
                  <p className="text-center text-white w-auto m-auto bg-red-500 px-2">
                    { lenguajeEs? "Please enter a valid email" : "Introduzca un email válido" }
                  </p>
                )}

              {noIntrodujoContraseñaNueva &&
                !campoCorreoInvalido &&
                !campoNombreInvalido &&
                !campoNombreYCorreoVacio &&
                !noIntrodujoContraseña &&
                !campoNuevaContraseñaEsInvalido &&
                !campoConfirmarNuevaContraseña && (
                  <p className="text-center text-white w-auto m-auto bg-red-500 px-2">
                    { lenguajeEs?  "Current password is only required if you create a new one" : "Contraseña actual solo es necesaria si crea una nueva" }
                  </p>
                )}

              {noIntrodujoContraseña &&
                !campoCorreoInvalido &&
                !campoNombreInvalido &&
                !campoNombreYCorreoVacio &&
                !noIntrodujoContraseñaNueva &&
                !campoNuevaContraseñaEsInvalido &&
                !campoConfirmarNuevaContraseña && (
                  <p className="text-center text-white w-auto m-auto bg-red-500 px-2">
                    { lenguajeEs? "For new password you need to enter the current one" : "Para nueva contraseña necesita introducir la actual" }
                  </p>
                )}

              {campoNuevaContraseñaEsInvalido &&
                !campoCorreoInvalido &&
                !campoNombreInvalido &&
                !campoNombreYCorreoVacio &&
                !noIntrodujoContraseñaNueva &&
                !noIntrodujoContraseña &&
                !campoConfirmarNuevaContraseña && (
                  <p className="text-center text-white w-auto m-auto bg-red-500 px-2">
                    { lenguajeEs? "The new password does not meet the requirements" : "La nueva contraseña no cumple con los requisitos" }
                  </p>
                )}

              {campoConfirmarNuevaContraseña &&
                !campoCorreoInvalido &&
                !campoNombreInvalido &&
                !campoNombreYCorreoVacio &&
                !noIntrodujoContraseñaNueva &&
                !noIntrodujoContraseña &&
                !campoNuevaContraseñaEsInvalido && (
                  <p className="text-center text-white w-auto m-auto bg-red-500 px-2">
                    { lenguajeEs? "The new password and its confirmation do not match" : "La nueva contraseña y su confirmación no coinciden" }
                  </p>
                )}

              {nombreYaExiste &&
                !emailYaExiste &&
                !passwordIncorrecta &&
                !campoConfirmarNuevaContraseña &&
                !campoCorreoInvalido &&
                !campoNombreInvalido &&
                !campoNombreYCorreoVacio &&
                !noIntrodujoContraseñaNueva &&
                !noIntrodujoContraseña &&
                !campoNuevaContraseñaEsInvalido && (
                  <p className="text-center text-white w-auto m-auto bg-red-500 px-2">
                    { lenguajeEs? "The username you are trying to provide already exists" : "El nombre de usuario que intenta proporcionar ya existe" }
                  </p>
                )}

              {emailYaExiste &&
                !nombreYaExiste &&
                !passwordIncorrecta &&
                !campoConfirmarNuevaContraseña &&
                !campoCorreoInvalido &&
                !campoNombreInvalido &&
                !campoNombreYCorreoVacio &&
                !noIntrodujoContraseñaNueva &&
                !noIntrodujoContraseña &&
                !campoNuevaContraseñaEsInvalido && (
                  <p className="text-center text-white w-auto m-auto bg-red-500 px-2">
                    { lenguajeEs? "The email you are trying to provide already exists" : "El email que intenta proporcionar ya existe" }
                  </p>
                )}

              {passwordIncorrecta &&
                !nombreYaExiste &&
                !emailYaExiste &&
                !campoConfirmarNuevaContraseña &&
                !campoCorreoInvalido &&
                !campoNombreInvalido &&
                !campoNombreYCorreoVacio &&
                !noIntrodujoContraseñaNueva &&
                !noIntrodujoContraseña &&
                !campoNuevaContraseñaEsInvalido && (
                  <p className="text-center text-white w-auto m-auto bg-red-500 px-2">
                    { lenguajeEs? "Please check that you have entered your password correctly" : "Verifique haber escrito correctamente su contraseña" }
                  </p>
                )}
            </div>
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full md:w-1/3 text-center py-0.5 px-1">
                <LabelGlobal color="primary"> { lenguajeEs? "Name" : "Nombre" } </LabelGlobal>
              </div>
              <div className="w-full md:w-2/3 py-0 sm:py-0.5 px-1">
                <ImputGlobal
                  value={editarNombre}
                  onChange={(e) => setEditarNombre(e.target.value)}
                ></ImputGlobal>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full md:w-1/3 text-center py-0.5 px-1">
                <LabelGlobal color="primary"> { lenguajeEs? "Email" : "Correo" } </LabelGlobal>
              </div>
              <div className="w-full md:w-2/3 py-0 sm:py-0.5 px-1">
                <ImputGlobal
                  value={editarCorreo}
                  onChange={(e) => setEditarCorreo(e.target.value)}
                ></ImputGlobal>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full md:w-1/3 text-center py-0.5 px-1">
                <LabelGlobal color="primary"> { lenguajeEs? "Current password" : "Contraseña actual" } </LabelGlobal>
              </div>
              <div className="w-full md:w-2/3 py-0 sm:py-0.5 px-1">
                <ImputGlobal
                  value={editarVerificarContraseña}
                  onChange={(e) => setEditarVerificarContraseña(e.target.value)}
                ></ImputGlobal>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full md:w-1/3 text-center py-0.5 px-1">
                <LabelGlobal color="primary"> { lenguajeEs? "New password" : "Nueva Contraseña" } </LabelGlobal>
              </div>
              <div className="w-full md:w-2/3 py-0 sm:py-0.5 px-1">
                <ImputGlobal
                  value={editarNuevaContraseña}
                  onChange={(e) => setEditarNuevaContraseña(e.target.value)}
                ></ImputGlobal>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full md:w-1/3 text-center py-0.5 px-1">
                <LabelGlobal color="primary"> { lenguajeEs? "Confirm Password" :"Confirmar Contraseña" } </LabelGlobal>
              </div>
              <div className="w-full md:w-2/3 py-0 sm:py-0.5 px-1">
                <ImputGlobal
                  value={editarNuevaContraseñaConfirmar}
                  onChange={(e) =>
                    setEditarNuevaContraseñaConfirmar(e.target.value)
                  }
                ></ImputGlobal>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="mt-48 sm:mt-44 md:mt-40 lg:mt-40 mx-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl text-gray-300"> { lenguajeEs? "Configuration" : "Configuración" } </h2>
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
              { lenguajeEs? "Edit profile" : "Editar perfíl" }
              </button>
              <button
                className="flex gap-2 items-center bg-[#6a97ec] hover:bg-[#0e2de0] border-0 sm:border text-black py-0 px-4 sm:py-2 m-auto rounded-2xl hover:text-white hover:border-transparent text-xl sm:text-base"
                onClick={() => {
                  setOpenBorrarPerfil(true);
                }}
              >
                <RiDeleteBin6Line />
                { lenguajeEs? "Delete profile" : "Eliminar erfíl" }
              </button>
            </div>
          </div>

          <div className="grid h-72 sm:h-auto col-span-1 row-span-1 col-start-1 row-start-3 sm:col-start-1 sm:row-start-2 lg:col-start-3 lg:row-start-1 border border-red-500 m-1 rounded-2xl">
            <div className="flex flex-col m-auto w-3/4 h-1/2 justify-between">
              <div>
                <div className="flex gap-2 h-6 justify-center">
                  <p className="text-white"> { lenguajeEs? "Translate" : "Traducir" } <span className={`${lenguajeEs? "" : "bg-orange-600"} rounded-md px-1`}> ES </span> </p>
                  <Chequear chequeado={lenguajeEs} setChequeado={setLenguajeEs} accion={HandleCambiarIdioma}/>
                  <p className={`text-white ${lenguajeEs? "bg-indigo-600" : ""} rounded-md px-1`}>EN </p>
                </div>
              </div>

              <hr className="border border-red-500" />

              <div className="flex py-2 text-xl sm:text-base text-white">
                <p>{ lenguajeEs? "Delete notifications" : "Borrar las  notificaciones" }</p>
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
                { lenguajeEs? "Resources" : "Recursos" }
                </button>
              </div>
            </div>
          </div>

          <div className="grid h-72 sm:h-auto col-start-1 row-start-4 sm:col-start-2 sm:row-start-2 lg:col-start-1 lg:row-start-2 lg:col-span-3 lg:row-span-1">
            <div className="flex text-wrap flex-col text-center m-auto justify-center items-center w-1/2 h-1/2">
              <p className="text-white text-xl">
                { lenguajeEs? "More customizations comming soon" : "Proximanente más personalizaciones" }
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
