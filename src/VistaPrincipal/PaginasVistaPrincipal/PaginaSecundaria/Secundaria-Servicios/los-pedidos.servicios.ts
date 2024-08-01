
import { PedidoActualizar, PedidoCrear } from "../../../../Interfaces";


export async function getLosPedidos(idUsuario : string){
  

    try {
        const response = await fetch(`http://localhost:3000/api/carrito-usuario/${idUsuario}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
export async function getUnPedido(idCarrito : string){
  

    try {
        const response = await fetch(`http://localhost:3000/api/carrito-usuario/obtenerUnCarrito/${idCarrito}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
export async function getUnPedidoPorUsuario(idUsuario : string,idProducto: string){
  

    try {
        const response = await fetch(`http://localhost:3000/api/carrito-usuario/${idUsuario}/${idProducto}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function crearPedido(idUsuario: string, idProducto: string, nuevoPedido: PedidoCrear){
  try {
  
    const response = await fetch(`http://localhost:3000/api/carrito-usuario/${idUsuario}/${idProducto}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoPedido),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error en la respuesta del servidor:', errorData); 
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error de acreacion de pedido:', error);
    return null;
  }
}

export async function updatePedido(idUsuario: string,pedidoId: string, pedido: PedidoActualizar) {
    try {
  
      const response = await fetch(`http://localhost:3000/api/carrito-usuario/${idUsuario}/${pedidoId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta del servidor:', errorData); // Depuración
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error de actualización:', error);
      return null;
    }
  }

  export async function deletePedidoMedianteUsuario(idUsuario: string,idProducto: string){
    try {
      const response = await fetch(`http://localhost:3000/api/carrito-usuario/viaUsuario/${idUsuario}/${idProducto}`, {
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
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al eliminar el pedido mediante usuario:', error);
      return null;
    }
  }
  export async function deletePedido(idCarrito: string){
    try {
      const response = await fetch(`http://localhost:3000/api/carrito-usuario/${idCarrito}`, {
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
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al eliminar el pedido mediante id:', error);
      return null;
    }
  }
  
  
