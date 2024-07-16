import { FormEvent, useContext, useState } from "react";
import { Contexto } from "../Contexto";
import { getRegistrarUsuario } from ".";
import { UsuarioLogin } from "../Interfaces";

export function Autentificacion() {
  const { handleAcceso } = useContext(Contexto);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  async function HandleSubmit(e: FormEvent) {
    e.preventDefault();
    const datos: UsuarioLogin = {
      nombre: nombre,
      email: email,
      password: password,
    };

    const respuesta = await getRegistrarUsuario(datos);

    if (respuesta && respuesta.email === datos.email && respuesta.nombre === datos.nombre && respuesta.password === datos.password) {
      handleAcceso(true);
    } else {
      console.error('Datos incorrectos o error en la respuesta');
    }
  }

  return (
    <>
    <div className="mt-[30vh] h-96 text-white m-auto w-3/4 flex flex-col bg-red-500 rounded-md p-2">
       
      <div className="grid grid-cols-2 grid-rows-3 m-2 h-5/6 transition-all">
        <div className={`${isLogin? "col-start-1 flex flex-col w-full" : "hidden"}`}>
            <label>Nombre</label>
          <input
            className="text-red-500"
            type="text"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </div>
        <div className={`flex flex-col w-full ${isLogin? "col-start-1" : "col-start-2"}`}>
            <label>Correo</label>
          <input
            className="text-red-500"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={`flex flex-col w-full ${isLogin? "col-start-1" : "col-start-2"}`}>
            <label>Contraseña</label>
          <input
            className="text-red-500"
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={`mx-2 row-start-1 row-span-3 justify-around border-4 rounded-xl border-[#262837] flex flex-col items-center ${isLogin? "col-start-2" : "col-start-1"}`}>
             <p className="text-2xl">Bienvenido a nuestro Restaurante</p>
             <p className="text-4xl text-[#262837]">Presidente</p>
             <p>{ isLogin? "Si ya es usuario puede:" : "Si aún no es usuario puede:" }</p>
             <button className={`text-xl rounded hover:bg-black bg-[#1F1D3B] p-2`}
             onClick={ ()=> { console.log("hola");
             setIsLogin(!isLogin);
              } }
             >{ isLogin? "Registrarse" : "Crear una cuenta"} </button>
        </div>
      </div>

      <div className="h-1/6 flex items-center justify-center">

        <button onClick={HandleSubmit} className="flex justify-center content-center items-center h-3/4 w-1/3 rounded-lg text-black cursor-pointer py-1 px-6 bg-blue-400 hover:bg-blue-600"
        >  ACEPTAR
        </button>
      </div>
    </div>
    <div className="fixed bottom-2 w-[100vw]">
        <div className="m-auto w-1/2 flex justify-center">
        <p className="p-2 text-blue-500">Power by: Emanuel</p>
        </div>
    </div>
    </>
  );
}
