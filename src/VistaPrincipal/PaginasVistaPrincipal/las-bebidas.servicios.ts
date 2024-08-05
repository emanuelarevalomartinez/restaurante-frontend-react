import { Bebida, BebidaActualizar } from "../../Interfaces/Bebida";


export async function getBebidas(ordenAsc?: boolean) : Promise<{ bebidas: Bebida[], totalDeProductos: number }> {
    try {
      let url = 'http://localhost:3000/api/bebidas/';
      if (typeof ordenAsc !== 'undefined') {
        url += `${ordenAsc}`;
      }
  
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return { bebidas: [], totalDeProductos: 0 };
    }
}

export async function updateBebida(bebidaId: string, bebida: BebidaActualizar){
    try {
    
        const response = await fetch(`http://localhost:3000/api/bebidas/${bebidaId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bebida),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error en la respuesta del servidor:', errorData); // Depuración
          throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error de actualización de la bebida:', error);
        return null;
      }
}

export async function updateBebidaByPedido(bebidaId: string, cantidad: number){
    try {
    
        const response = await fetch(`http://localhost:3000/api/bebidas/updateWhitBebida/${bebidaId}/${cantidad}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error en la respuesta del servidor:', errorData); // Depuración
          throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error de actualización de las bebidas by pedido:', error);
        return null;
      }
}