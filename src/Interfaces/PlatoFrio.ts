

export interface PlatoFrio{
    idPlatoFrio:string;
    descripcionPlatoFrio:string;
    precio:number;
    cantRestante:number;
    imagenAsociada:string;
}

export interface PlatoFrioActualizar{
    idPlatoFrio?:string;
    descripcionPlatoFrio?:string;
    precio?:number;
    cantRestante:number;
    imagenAsociada?:string;
}