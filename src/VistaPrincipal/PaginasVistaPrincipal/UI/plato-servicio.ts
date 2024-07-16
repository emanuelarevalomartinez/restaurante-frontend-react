import { Plato } from "../../../Interfaces";

export async function getPlatosCalientes(): Promise<Plato[]> {
    try {
        const response = await fetch('http://localhost:3000/api/platos-calientes');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}; 