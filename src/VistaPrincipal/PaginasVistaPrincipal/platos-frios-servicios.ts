import { PlatoFrio, PlatoFrioActualizar } from "../../Interfaces";

export async function getPlatosFrios(ordenAsc?: boolean): Promise<{ platosFrios: PlatoFrio[], totalDeProductos: number }> {
  try {
    let url = 'http://localhost:3000/api/platos-frios/';
    if (typeof ordenAsc !== 'undefined') {
      url += `${ordenAsc}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { platosFrios: [], totalDeProductos: 0 };
  }
}

export async function updatePlatoFrio(platoFrioID: string, platoFrio: PlatoFrioActualizar){
    try {
    
        const response = await fetch(`http://localhost:3000/api/platos-frios/${platoFrioID}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(platoFrio),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error en la respuesta del servidor:', errorData); // Depuración
          throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error de actualización delplato frio:', error);
        return null;
      }
}

export async function updatePLatoFrioByPedido(platoFrioId: string, cantidad:number){
    try {
    
        const response = await fetch(`http://localhost:3000/api/platos-frios/updateWhitPLatoFrio/${platoFrioId}/${cantidad}`, {
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
        console.error('Error de actualización de los platos frios by pedido:', error);
        return null;
      }
}