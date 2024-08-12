import { NotificacionCrear } from "../Interfaces";


export async function getLasNotificaciones(idUsuario: string, ordenDes?: boolean) {
    try {
      let url = `http://localhost:3000/api/notificaciones/buscarTodos/${idUsuario}/`;
      if (typeof ordenDes !== 'undefined') {
        url += `${ordenDes}`;
      }
  
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export async function crearNotificacion(idUsuario:string, notificacion: NotificacionCrear){
    try {
  
      const response = await fetch(`http://localhost:3000/api/notificaciones/${idUsuario}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificacion),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta del servidor:', errorData); 
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al crear la notificacion:', error);
      return null;
    }
  }


  export async function deleteNotificacion(idNotificacion: string){
    try {
      const response = await fetch(`http://localhost:3000/api/notificaciones/${idNotificacion}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta del servidor:', errorData); 
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error al tratar de eliminar la notificacion mediante su id:', error);
      return null;
    }
  }

  export async function deleteAllNotificacionesByUsuario(IdUsuario: string){
    try {
      const response = await fetch(`http://localhost:3000/api/notificaciones/borrarTodas/${IdUsuario}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta del servidor:', errorData); 
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error al tratar de borrar todas las  notificaciones del usuario :', error);
      return null;
    }
  }

