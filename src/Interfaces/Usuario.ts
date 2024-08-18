

export interface Usuario{
    nombre:string;
    email:string;
    token:string;
    idUsuario:string;
}

export interface UsuarioUpdate{
    nombre?:string;
    email?:string;
    password?:string;
    newPassword?:string;
    
}
export interface UsuarioUpdateReturnCorrect{
    token:string;
    nombre?:string;
    email?:string;
    password?:string;
    newPassword?:string;
}

export interface UsuarioUpdateReturnError{
    nombreExiste:boolean;
  emailExiste: boolean;
  passwordIncorrecta: boolean;
}