
export interface PedidoCrear{
 
   descripcion:string;
   montoTotal:number;
   imagen:string;
   cantidadAOrdenar:number,
}


export interface PedidoActualizar{
    idProducto?:string;
    descripcion?:string;
    cantidad?:number;
    montoTotal?:number;
    imagen?:string;
    cantidadAOrdenar?:number;
}