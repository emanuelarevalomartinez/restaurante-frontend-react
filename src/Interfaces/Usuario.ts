

export interface Usuario{
    nombre:string;
    email:string;
    token:string;
    idUsuario:string;
}

export interface UsuarioUpdate{
    idUsuario:string;
    nombre?:string;
    email?:string;
    password?:string;
    
}