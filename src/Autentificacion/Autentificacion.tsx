import { FormEvent, useContext, useEffect, useState } from "react";
import {  getUsuarioLogeado, SetUsuarioRegister } from ".";
import {  UsuarioLogin, UsuarioRegisterExist, UsuarioRegistrar } from "../Interfaces";
import { ImputGlobal } from "../common";
import imagenShop from '../common/images/coffee-shop.jpg'
import imagenDrinkWine from '../common/images/drinking-wine.jpg'
import { Contexto } from "../Contexto";
import { useNavigate } from "react-router-dom";

export function Autentificacion() {


 const { login, setRedireccion } = useContext(Contexto);

 const navigate = useNavigate();


  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [campoNuevoNombreIncorrecto, setCampoNuevoNombreIncorrecto] = useState(false);
  const [camposIncorrectos, setCamposIncorrectos] = useState(false);
  const [camposEmailIncorrecto, setCamposEmailIncorrecto] = useState(false);
  const [camposPasswordIncorrecto, setCamposPasswordIncorrecto] = useState(false);
  const [confirmacionPasswordIncorrecta, setConfirmacionPasswordIncorrecta] = useState(false);
  const [camposVacios, setCamposVacios] = useState(false);
  const [usuarioNoExistente, setUsuarioNoExistente] = useState(false);
  const [usuarioYaExistenteRegistro, setUsuarioYaExistenteRegistro] = useState(false);
  const [emaiYaExistenteRegistro, setEmaiYaExistenteRegistro] = useState(false);

  const validarEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  const validarPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,16}$/

  const validarNuevoNombre = /^[a-z0-9]{3,16}$/i
  


   function HandleSubmit(e: FormEvent) {
    e.preventDefault();

   if(!isRegister){
    

     const datos: UsuarioLogin = {
       email: email,
       password: password,
     };


     if(email.length == 0 || password.length == 0){
        setCamposVacios(true);
     } else {
      setCamposVacios(false);
      if(validarEmail.test(email) && validarPassword.test(password)){
    
        setCamposIncorrectos(false);
          const logearse = async ()=> {
    
             const respuesta = await getUsuarioLogeado(datos);
             console.log(respuesta);
             
             if (respuesta) {
              setUsuarioNoExistente(false);
              login(respuesta);
              navigate("/");
             } else {
              setCamposIncorrectos(false);
              setCamposVacios(false);
              setUsuarioNoExistente(true);
               console.error('Datos incorrectos o error en la respuesta');
             }
           }
           logearse();
          
         } else {
          setCamposIncorrectos(true);
         }
     }
 

    } else {

      const datos: UsuarioRegistrar = {
         nombre: nombre,
         email: email,
         password: password,
      }

      if(nombre.length == 0 || email.length == 0 || password.length == 0  || confirmPassword.length == 0){
        setCamposVacios(true);
        setUsuarioYaExistenteRegistro(false);
        setEmaiYaExistenteRegistro(false);
        setUsuarioNoExistente(false);
     } else {
      setCamposVacios(false);
      setUsuarioYaExistenteRegistro(false);
        setEmaiYaExistenteRegistro(false);
        setUsuarioNoExistente(false);
      if(validarEmail.test(email) && validarPassword.test(password) && validarNuevoNombre.test(nombre)){ 

        setCamposIncorrectos(false);
        setCampoNuevoNombreIncorrecto(false);
        setCamposEmailIncorrecto(false);
        setCamposPasswordIncorrecto(false);
        setUsuarioYaExistenteRegistro(false);
        setEmaiYaExistenteRegistro(false);
        setUsuarioNoExistente(false);
       

       if(password !== confirmPassword){
        setConfirmacionPasswordIncorrecta(true);
       } else {
        setConfirmacionPasswordIncorrecta(false);
        console.log("correcto");

        const registrarse = async ()=> {
    
          const respuestaRegistro: null | UsuarioRegistrar | UsuarioRegisterExist = await SetUsuarioRegister(datos);
          console.log(datos);

          console.log(respuestaRegistro);
          
          
          
          if(respuestaRegistro == null){
          setUsuarioYaExistenteRegistro(false);
          setEmaiYaExistenteRegistro(false);
           setCamposIncorrectos(false);
           setCamposVacios(false);
           setUsuarioNoExistente(true);
           console.error('Datos incorrectos o error en la respuesta');
          } else if('usuarioExiste' in respuestaRegistro){
            setUsuarioNoExistente(false);
            const usuarioYaExiste = respuestaRegistro as UsuarioRegisterExist;

            if (usuarioYaExiste.usuarioExiste) {
              console.log("El usuario ya existe");
              setUsuarioYaExistenteRegistro(true);
          } else if(usuarioYaExiste.emailExiste){
              setEmaiYaExistenteRegistro(true);
          }
      } else {
        setUsuarioNoExistente(false);
          const nuevoUsuario = respuestaRegistro as UsuarioRegistrar;
          console.log("Usuario registrado con éxito:", nuevoUsuario);
          setUsuarioYaExistenteRegistro(false);
          setEmaiYaExistenteRegistro(false);
          setRedireccion(true);
      }
                  
        }
        registrarse();
        
       }

      } else if(!validarEmail.test(email) && !validarPassword.test(password) && !validarNuevoNombre.test(nombre)){
        setCamposIncorrectos(true);
        setCampoNuevoNombreIncorrecto(false);
        setCamposEmailIncorrecto(false);
        setCamposPasswordIncorrecto(false);
      } else if(!validarEmail.test(email) || !validarPassword.test(password) || !validarNuevoNombre.test(nombre)){
        setCamposIncorrectos(false);

        if(!validarNuevoNombre.test(nombre)){
          setCampoNuevoNombreIncorrecto(true);
          setCamposEmailIncorrecto(false);
          setCamposPasswordIncorrecto(false);
        } 

        if(!validarEmail.test(email)){
          setCamposEmailIncorrecto(true);
          setCampoNuevoNombreIncorrecto(false);
          setCamposPasswordIncorrecto(false);
        } 
        if(!validarPassword.test(password)){
          setCamposPasswordIncorrecto(true);
          setCampoNuevoNombreIncorrecto(false);
          setCamposEmailIncorrecto(false);
        }
      }


     }
      
    }
     

    
  }
  
  useEffect(() => {
    setCamposIncorrectos(false);
    setCamposVacios(false);
    setCampoNuevoNombreIncorrecto(false);
    setUsuarioNoExistente(false);
    setCamposEmailIncorrecto(false);
    setCamposPasswordIncorrecto(false);
    setUsuarioYaExistenteRegistro(false);
    setEmaiYaExistenteRegistro(false);
  }, [isRegister])
  

  return (
    <>
    <div className={`w-full mt-0 sm:w-3/4 sm:mt-4 h-screen sm:h-[90vh] md:mt-[10vh] md:h-[80vh] text-white m-auto md:w-3/4 flex flex-col rounded-md p-2 ${isRegister? "bg-red-500" : "bg-[#347ef5]"}`}>

      <div className={`flex m-2 h-5/6 transition-all duration-700 ease-in-out`}>
        <div className={`w-full m-auto sm:m-0 md:w-1/2 ${isRegister? "pl-0" : "translate-x-0 pl-0 md:translate-x-full md:pl-2"} transition-all duration-700 ease-in-out`}>
          <div className="flex flex-col text-center text-wrap">
          <p className="text-base sm:text-2xl text-wrap text-center">{ isRegister? "Bienvenido a nuestro Restaurante" : "Bienvenido de vuelta a" }</p>
          <p className={`text-2xl sm:text-4xl ${isRegister? "text-[#262837]" : "text-[#e02a0e]"}`}>PRESIDENTE</p>
          </div>
          <div className="flex h-4 md:h-5 w-full items-center justify-center">
            { !isRegister? (
              <div>
                { camposIncorrectos && !camposVacios &&  <p className="bg-red-500 px-1 rounded-md">EMAIL o CONTRASEÑA incorrecta </p> }
                { camposVacios &&  <p className="bg-red-500 px-1 rounded-md">Por favor complete los campos</p> }
                { usuarioNoExistente && !camposVacios && !camposIncorrectos && <p className="bg-red-500 px-1 rounded-md">Usuario no existente en el sistema</p> }
              </div>
            ) : (
              <div>
                 { camposVacios &&  <p className="bg-blue-500 px-1 rounded-md">Por favor complete los campos</p> }
                 { usuarioNoExistente && !camposVacios && !camposIncorrectos && <p className="bg-blue-500 px-1 rounded-md">Error en el sistema </p> }
                 { usuarioYaExistenteRegistro && !emaiYaExistenteRegistro && !camposVacios && !camposIncorrectos && <p className="bg-blue-500 px-1 rounded-md">Ya esite un usuario con ese nombre</p> }
                 { emaiYaExistenteRegistro &&  !usuarioYaExistenteRegistro && !camposVacios && !camposIncorrectos && <p className="bg-blue-500 px-1 rounded-md">Ya esite un usuario con ese correo</p> }
                 {!camposVacios && camposIncorrectos &&  <p className="bg-blue-500 px-1 rounded-md">Los campos poseen valores incorrectos</p> }
                 { !camposVacios && !camposIncorrectos && campoNuevoNombreIncorrecto && !camposEmailIncorrecto && !camposPasswordIncorrecto && <p className="bg-blue-500 px-1 rounded-md">Nombre entre 3 y 16 letras</p> }
                 { !camposVacios && !camposIncorrectos && camposEmailIncorrecto && !campoNuevoNombreIncorrecto && !camposPasswordIncorrecto && <p className="bg-blue-500 px-1 rounded-md">Introduzca un correo valido</p> }
                 { !camposVacios && !camposIncorrectos && camposPasswordIncorrecto && !campoNuevoNombreIncorrecto && !camposEmailIncorrecto && <p className="bg-blue-500 px-1 rounded-md">Contraseña no cumple los requisitos</p> }
                 { !camposVacios && !camposIncorrectos && confirmacionPasswordIncorrecta && !camposEmailIncorrecto && !camposPasswordIncorrecto && !campoNuevoNombreIncorrecto &&  <p className="bg-blue-500 px-1 rounded-md">Confirmación invalida de contraseña</p> }
              </div>
            )}
          </div>

             <div className="mb-4 border-b text-center w-auto sm:w-3/4 sm:mx-auto md:w-auto md:mb-5">
                        <div
                            className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Introduce tus datos
                        </div>
                    </div> 

        <div className={`sm:w-1/2 m-auto text-center md:text-start md:w-full lg:w-1/2 lg:text-center mb-2 ${isRegister? "" : "hidden"}`}>
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

        <div className={`sm:w-1/2 m-auto text-center md:text-start md:w-full lg:w-1/2 lg:text-center mb-2 ${isRegister? "" : "hidden"}`}>
           <ImputGlobal type="text" id="confirmPassword" name="confirmPassword"
           placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={ (e) => {
            setConfirmPassword(e.target.value); } }
          >
          </ImputGlobal>
        </div>
        <div className={`sm:w-1/2 m-auto md:w-full lg:w-1/2 text-center mb-2 ${isRegister? "mt-2 md:mt-6 lg:mt-10" : "mt-6 md:mt-4 lg:mt-8"}`}>
        <p className="mb-2">{ isRegister? "Si ya es usuario puede" : "Si aún no es usuario puede" }</p>
        <button className={`text-xl rounded hover:bg-black bg-[#1F1D3B] p-2`}
             onClick={ ()=> {
             setIsRegister(!isRegister);
              } }
             >{ isRegister? "Registrarse" : "Crear una cuenta"} </button>
        </div>
        </div>


        <div className={`hidden md:block w-0 md:w-1/2 ${isRegister? "ml-2" : "-translate-x-full ml-0"} flex flex-col transition-all duration-700 ease-in-out border-4 rounded-xl border-[#1F1D3B] text-center text-wrap bg-white`}>
             <div className="w-full h-full flex m-auto justify-center">
              <img 
              className=" object-cover transition-all duration-700 ease-in-out rounded-xl"
              src={isRegister? imagenShop : imagenDrinkWine} 
              alt="It's not possible to view the photo" />
             </div>
            </div>
      </div>

      <div className="h-auto sm:h-1/6 flex items-center mt-5 sm:justify-center flex-col">

        <button onClick={HandleSubmit} 
        className={`${isRegister? "bg-[#6a97ec] hover:bg-[#0e2de0]" : "bg-[#ec7c6a] hover:bg-[#e02a0e] "} mb-6 sm:mb-0 rounded-lg px-8 py-2 text-black cursor-pointer hover:text-white border hover:border-transparent`}
        >  ACEPTAR
        </button>
</div>
    </div>
    </>
  );
}
