
import { Usuario, UsuarioLogin, UsuarioRegisterExist, UsuarioRegistrar } from "../Interfaces";


export async function SetUsuarioRegister(datos: UsuarioRegistrar): Promise<UsuarioRegistrar | UsuarioRegisterExist | null>{
  try {
    const response = await fetch('http://localhost:3000/api/usuario/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar usuario');
    }

    const data: UsuarioRegistrar | UsuarioRegisterExist = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUsuarioLogeado(datos: UsuarioLogin): Promise<Usuario | null> {

    try {
      const response = await fetch('http://localhost:3000/api/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar usuario');
      }
  
      const data: Usuario = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }