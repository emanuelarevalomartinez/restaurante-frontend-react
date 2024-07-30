import { PlatoCaliente, PlatoCalienteActualizar } from "../../../Interfaces";

export async function getPlatosCalientes(): Promise<PlatoCaliente[]> {
    try {
        const response = await fetch('http://localhost:3000/api/platos-calientes');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}; 
export async function getUnPlato( idPlato: string ): Promise<PlatoCaliente | null> {
    try {
        const response = await fetch(`http://localhost:3000/api/platos-calientes/obtenerUno/${idPlato}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        console.error('Error al obtener uno de los platosCalientes:', error);
        return null;
    }
}; 



export async function updatePlatoCaliente(platoId: string, platoCaliente: PlatoCalienteActualizar){
    try {
    
        const response = await fetch(`http://localhost:3000/api/platos-calientes/${platoId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(platoCaliente),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error en la respuesta del servidor:', errorData); // Depuración
          throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error de actualización de los platosCalientes:', error);
        return null;
      }
}
export async function updatePlatoCalienteByPedido(platoId: string,cantidad:number){
    try {
    
        const response = await fetch(`http://localhost:3000/api/platos-calientes/updateWhitPedido/${platoId}/${cantidad}`, {
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
        console.error('Error de actualización de los platosCalientes by pedido:', error);
        return null;
      }
}