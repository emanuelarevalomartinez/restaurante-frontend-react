import { Usuario } from "../Interfaces";

export function Auth(): Usuario | null {
    const user = localStorage.getItem('usuario');
    if (user) {
        try {
            const use2: Usuario = JSON.parse(user);
            return use2;
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    } else {
        return null;
    }
}