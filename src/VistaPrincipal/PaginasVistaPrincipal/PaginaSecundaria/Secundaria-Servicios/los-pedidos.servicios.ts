
import { PedidoActualizar } from "../../../../Interfaces";


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

export async function updatePedido(pedidoId: string, pedido: PedidoActualizar) {
    try {
  
      const response = await fetch(`http://localhost:3000/api/carrito-usuario/${pedidoId}`, {
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
  
