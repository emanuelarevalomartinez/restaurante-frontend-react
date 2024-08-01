

export interface Bebida{
    idBebida:string;
    descripcionBebida:string;
    precio:number;
    cantRestante:number;
    imagenAsociada:string;
}


export interface BebidaActualizar{
    idBebida?:string;
    descripcionBebida?:string;
    precio?:number;
    cantRestante:number;
    imagenAsociada?:string;
}