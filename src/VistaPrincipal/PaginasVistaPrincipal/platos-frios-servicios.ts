import { PlatoFrio } from "../../Interfaces";


export async function getPlatosFrios(): Promise<PlatoFrio[]> {
    try {
        const response = await fetch('http://localhost:3000/api/platos-frios');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}; 