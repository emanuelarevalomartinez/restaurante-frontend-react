

export async function getLosPedidos(){
    try {
        const response = await fetch("http://localhost:3000/api/carrito-usuario/e8bbbe02-d4ca-43de-9fb6-5dacd5f7758c");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}