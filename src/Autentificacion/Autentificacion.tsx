import { FormEvent, useContext, useState } from "react";
import { getRegistrarUsuario } from ".";
import { UsuarioLogin } from "../Interfaces";
import { ImputGlobal } from "../common";
import imagenShop from '../common/images/coffee-shop.jpg'
import imagenDrinkWine from '../common/images/drinking-wine.jpg'
import { Contexto } from "../Contexto";

export function Autentificacion() {


 const { login } = useContext(Contexto);


  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);


  async function HandleSubmit(e: FormEvent) {
    e.preventDefault();
    const datos: UsuarioLogin = {
      nombre: nombre,
      email: email,
      password: password,
    };
    const respuesta = await getRegistrarUsuario(datos);
    console.log(respuesta);
    
    if (respuesta) {
     login(respuesta);
    } else {
      console.error('Datos incorrectos o error en la respuesta');
    }
  }

  return (
    <>
    <div className={`w-full mt-0 sm:w-3/4 sm:mt-4 h-screen sm:h-[90vh] md:mt-[10vh] md:h-[80vh] text-white m-auto md:w-3/4 flex flex-col rounded-md p-2 ${isLogin? "bg-red-500" : "bg-[#347ef5]"}`}>

      <div className={`flex m-2 h-5/6 transition-all duration-700 ease-in-out`}>
        <div className={`w-full m-auto sm:m-0 md:w-1/2 ${isLogin? "pl-0" : "translate-x-0 pl-0 md:translate-x-full md:pl-2"} transition-all duration-700 ease-in-out`}>
          <div className="flex flex-col text-center text-wrap">
          <p className="text-base sm:text-2xl text-wrap text-center">{ isLogin? "Bienvenido a nuestro Restaurante" : "Bienvenido de vuelta a" }</p>
          <p className={`text-2xl sm:text-4xl ${isLogin? "text-[#262837]" : "text-[#e02a0e]"}`}>PRESIDENTE</p>
          </div>

             <div className="my-4 border-b text-center w-auto sm:w-3/4 sm:mx-auto md:w-auto md:my-5">
                        <div
                            className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Introduce tus datos
                        </div>
                    </div> 

        <div className={`sm:w-1/2 m-auto text-center md:text-start md:w-full lg:w-1/2 lg:text-center mb-2`}>
          <ImputGlobal type="text" id="nombre" name="nombre"
          placeholder="Nombre"
            value={nombre}
            onChange={ (e) => {
            setNombre(e.target.value); } }
          >
          </ImputGlobal>
        </div>
        <div className={`sm:w-1/2 m-auto text-center md:text-start md:w-full lg:w-1/2 lg:text-center mb-2`}>
           <ImputGlobal type="text" id="correoElectronico" name="correoElectronico"
           placeholder="Correo"
            value={email}
            onChange={ (e) => {
            setEmail(e.target.value); } }
          >
          </ImputGlobal>
        </div>
        <div className={`sm:w-1/2 m-auto text-center md:text-start md:w-full lg:w-1/2 lg:text-center mb-2`}>
           <ImputGlobal type="text" id="password" name="password"
           placeholder="Contraseña"
            value={password}
            onChange={ (e) => {
            setPassword(e.target.value); } }
          >
          </ImputGlobal>
        </div>

        <div className={`sm:w-1/2 m-auto text-center md:text-start md:w-full lg:w-1/2 lg:text-center mb-2 ${isLogin? "" : "hidden"}`}>
           <ImputGlobal type="text" id="confirmPassword" name="confirmPassword"
           placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={ (e) => {
            setConfirmPassword(e.target.value); } }
          >
          </ImputGlobal>
        </div>
        <div className={`sm:w-1/2 m-auto md:w-full lg:w-1/2 text-center mb-2 ${isLogin? "mt-2 md:mt-6 lg:mt-10" : "mt-6 md:mt-4 lg:mt-8"}`}>
        <p className="mb-2">{ isLogin? "Si ya es usuario puede" : "Si aún no es usuario puede" }</p>
        <button className={`text-xl rounded hover:bg-black bg-[#1F1D3B] p-2`}
             onClick={ ()=> {
             setIsLogin(!isLogin);
              } }
             >{ isLogin? "Registrarse" : "Crear una cuenta"} </button>
        </div>
        </div>


        <div className={`hidden md:block w-0 md:w-1/2 ${isLogin? "ml-2" : "-translate-x-full ml-0"} flex flex-col transition-all duration-700 ease-in-out border-4 rounded-xl border-[#1F1D3B] text-center text-wrap bg-white`}>
             <div className="w-full h-full flex m-auto justify-center">
              <img 
              className=" object-cover transition-all duration-700 ease-in-out rounded-xl"
              src={isLogin? imagenShop : imagenDrinkWine} 
              alt="It's not possible to view the photo" />
             </div>
            </div>
      </div>

      <div className="h-auto sm:h-1/6 flex items-center mt-5 sm:justify-center flex-col">

        <button onClick={HandleSubmit} 
        className={`${isLogin? "bg-blue-400 hover:bg-blue-600 " : "bg-[#ec7c6a] hover:bg-[#e02a0e] "} mb-6 sm:mb-0 rounded-lg px-8 py-2 text-black cursor-pointer`}
        >  ACEPTAR
        </button>
</div>
    </div>
    </>
  );
}
