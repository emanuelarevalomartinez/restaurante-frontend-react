import { Postre, PostreActualizar } from "../../Interfaces";


export async function getPostres(ordenAsc?: boolean): Promise<{ postres: Postre[], totalDeProductos: number }> {
    try {
      let url = 'http://localhost:3000/api/postres/';
      if (typeof ordenAsc !== 'undefined') {
        url += `${ordenAsc}`;
      }
  
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return { postres: [], totalDeProductos: 0 };
    }
}; 

export async function updatePostre(postreId: string, postre: PostreActualizar){
    try {
    
        const response = await fetch(`http://localhost:3000/api/postres/${postreId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postre),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error en la respuesta del servidor:', errorData); // Depuración
          throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error de actualización del postre:', error);
        return null;
      }
}

export async function updatePostreByPedido(postreId: string, cantidad:number){
  try {
    
    const response = await fetch(`http://localhost:3000/api/postres/updateWhitPostre/${postreId}/${cantidad}`, {
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
    console.error('Error de actualización de los postres by pedido:', error);
    return null;
  }
}