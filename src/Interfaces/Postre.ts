

export interface Postre{
    idPostre:string;
    descripcionPostre:string;
    precio:number;
    cantRestante:number;
    imagenAsociada:string;
}

export interface PostreActualizar{
    idPostre?:string;
    descripcionPostre?:string;
    precio?:number;
    cantRestante:number;
    imagenAsociada?:string;
}