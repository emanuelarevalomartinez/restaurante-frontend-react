
export interface UsuarioRegistrar{
  nombre:string;
  email:string;
  password:string;
}

export interface UsuarioRegisterExist{
  usuarioExiste:boolean;
    emailExiste:boolean;
}

export interface UsuarioLogin{
  email:string;
  password:string;
}
