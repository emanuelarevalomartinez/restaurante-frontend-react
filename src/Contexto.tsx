import { ReactNode, createContext, useState } from "react";
import { pedidos } from "./pedidos";
import { Pedidos, SeleccionSeccion, UsuarioLogin } from "./Interfaces";
import { seleccionSeccion } from ".";


// tablas de base de datos:  carrito, notificaciones, usuario, 
// estoy trabajando en el backend en ver como establecer las relaciones del  usuario 
// si es usuario o administrador
// luego de eso arreglar el crear usuario  y asociarle sus respectivas relaciones
// añadir el tocken asociado a cada respectivo usuario
// documentar la api
// añadir /api/ a la ruta global
// añadir limite de los datos que se devuelvan por pagina
// añadir paginacion en el frontend
// crear modal del frontend y las notificaciones emergentes

//! hay un problema serio , al añadir productos al carrito y  cambiar de pestaña y volver a platos calientes se vuelven a cargar todos  los datos

interface ContextoProps {
  barraVistaMovil: boolean;
  barraLateralVisivilidad: boolean;
  mostrarVistaSecundaria: boolean;
  HandlevisibilidadBarraLateral: () => void;
  HandleHacerVisibleSecundaria: () => void;
  losPedidos: Pedidos[];
  HandleAddPedido: (
    id: string,
    descripcion: string,
    cantidad: number,
    cantidadRestante: number,
    cantidadAOrdenar: number,
    imagen: string
  ) => void;
  HandleSubPedido: (
    id: string,
    cantidadInicial: number,
    descripcion: string,
    cantidad: number,
    cantidadRestante: number,
    cantidadAOrdenar: number,
    imagen: string
  ) => void;
  handleAddArticulo: (e: number) => void;
  handleSubArticulo: (e: number, f: number) => void;
  verPedidos: boolean;
  direcciones:string[];
  handleVerOcultarContenido: (e: boolean)=> void;
  verOcultarRestoDeSeccion: boolean;
  selectElementBarraLateral: SeleccionSeccion[];
  handleChangeSelecionBarraLateral: (e: string )=> void;
  acceso: boolean;
  handleAcceso: (e: boolean, f: UsuarioLogin)=> void;
}

interface ContextoGlobalProps {
  children: ReactNode;
}

const defaultContext: ContextoProps = {
  barraVistaMovil: false,
  barraLateralVisivilidad: false,
  mostrarVistaSecundaria: false,
  HandlevisibilidadBarraLateral: () => {},
  HandleHacerVisibleSecundaria: () => {},
  losPedidos: pedidos,
  HandleAddPedido: () => {},
  HandleSubPedido: () => {},
  handleAddArticulo: () => {},
  handleSubArticulo: () => {},
  verPedidos: false,
  direcciones:[],
  handleVerOcultarContenido: ()=> {},
  verOcultarRestoDeSeccion: false,
  selectElementBarraLateral: [{ 
    nombre:"home",
    seleccionado: true,
   }],
   handleChangeSelecionBarraLateral: ( )=> {},
   acceso: false,
   handleAcceso: ()=> {},
  };

export const Contexto = createContext<ContextoProps>(defaultContext);

export function ContextoGlobal({ children }: ContextoGlobalProps) {

  const [barraVistaMovil] = useState<boolean>(true);
  const [barraLateralVisivilidad, setbarraLateralVisivilidad] =
    useState<boolean>(false);
  const [mostrarVistaSecundaria, setmostrarVistaSecundaria] =
    useState<boolean>(false);
  const [losPedios, setlosPedios] = useState<Pedidos[]>(pedidos);
  const [cantidadArticulosIguales, setcantidadArticulosIguales] = useState(0);
  const [verPedidos, setverPedidos] = useState(false);
  const direcciones:string[]= ["/AcercaDe"];
  const [verOcultarRestoDeSeccion, setverOcultarRestoDeSeccion] = useState(false);
  const [selectElementBarraLateral, setSelectElementBarraLateral] = useState(seleccionSeccion);
  const [acceso, setAcceso] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  });


  function handleAddArticulo(cantidadRestante: number) {
    if (cantidadRestante - 1 < 0) {
      setcantidadArticulosIguales(cantidadArticulosIguales);
    } else {
      setcantidadArticulosIguales(cantidadArticulosIguales + 1);
    }
  }

  function handleSubArticulo(
    cantidadRestante: number,
    cantidadInicial: number
  ) {
    if (cantidadRestante + 1 > cantidadInicial) {
      setcantidadArticulosIguales(cantidadArticulosIguales);
    } else {
      setcantidadArticulosIguales(cantidadArticulosIguales - 1);
    }
  }

  function HandlevisibilidadBarraLateral() {
    setbarraLateralVisivilidad(!barraLateralVisivilidad);
  }

  function HandleHacerVisibleSecundaria() {
    if (barraLateralVisivilidad == true) {
      setbarraLateralVisivilidad(false);
    }
    setmostrarVistaSecundaria(!mostrarVistaSecundaria);
  }

  function HandleAddPedido(
    id: string,
    descripcion: string,
    montoTotal: number,
    cantidadRest: number,
    cantidadAOrdenar: number,
    imagen: string
  ) {
    let nuevoPedido: Pedidos = {
      idproducto: id,
      descripcion: descripcion,
      cantidad: cantidadRest,
      montoTotal: montoTotal,
      imagen: imagen,
      cantidadAOrdenar: cantidadAOrdenar,
    };


    let pedidoDiferente: Pedidos[] = losPedios.filter(pedido => pedido.idproducto === id)
    
    if (pedidoDiferente.length > 0) {

      let indicePedidoExcistente = losPedios.findIndex(
        (pedido) => pedido.idproducto === id
      );

      
      
      let actualizarPedidos: Pedidos[] = [...losPedios];
      
      actualizarPedidos[indicePedidoExcistente] = {
        ...actualizarPedidos[indicePedidoExcistente],
        montoTotal:
        losPedios[indicePedidoExcistente].montoTotal +
          (cantidadRest - 1 >= 0
            ? nuevoPedido.montoTotal
            : 0),
        cantidadAOrdenar:
          actualizarPedidos[indicePedidoExcistente].cantidadAOrdenar +
          (cantidadRest - 1 < 0 ? 0 : cantidadAOrdenar),
      };
      if(cantidadRest -1  < 0){
       alert("Nooo hay más productos de este tipo disponibles");
       
      }
      setlosPedios(actualizarPedidos);
    } else {
      setverPedidos(true);
        setlosPedios([...losPedios, nuevoPedido]);
      
     
      
    }
  }

  function HandleSubPedido(
    id: string,
    cantidadInicial: number,
    descripcion: string,
    montoTotal: number,
    cantidadRest: number,
    cantidadAOrdenar: number,
    imagen: string
  ) {
   

    let quitarPedido: Pedidos = {
      idproducto: id,
      descripcion: descripcion,
      cantidad: cantidadRest,
      montoTotal: montoTotal,
      imagen: imagen,
      cantidadAOrdenar: cantidadAOrdenar,
    };
    let pedidoDiferente: Pedidos[] = losPedios.filter(
      (pedido) => pedido.idproducto === id
    );

    if (pedidoDiferente.length > 0) {
      
      let indicePedidoExcistente = losPedios.findIndex(
        (pedido) => pedido.idproducto === id
      );

      
      let actualizarPedidos: Pedidos[] = [...losPedios];
      actualizarPedidos[indicePedidoExcistente] = {
        ...actualizarPedidos[indicePedidoExcistente],
        montoTotal:
        losPedios[indicePedidoExcistente].montoTotal -
          (cantidadRest + 1 <= cantidadInicial
            ? quitarPedido.montoTotal
            : 0),
        cantidadAOrdenar:
          actualizarPedidos[indicePedidoExcistente].cantidadAOrdenar -
          (cantidadRest + 1 > cantidadInicial ? 0 : cantidadAOrdenar),
      };
        if(cantidadRest + 1 > cantidadInicial){
           alert("Ya a  reintegrado todos los productos de este tipo");
        }
      setlosPedios(actualizarPedidos);
    } 
  }

  function handleVerOcultarContenido(status: boolean){
      setverOcultarRestoDeSeccion(status);
  }

  function handleChangeSelecionBarraLateral(seccionEscogidaAVisualizar: string){

    const newSelectElementosBarraLateral = selectElementBarraLateral;
    newSelectElementosBarraLateral.forEach((seccionActual, index) => {
      if (seccionActual.nombre === seccionEscogidaAVisualizar) {
        newSelectElementosBarraLateral[index] = {...seccionActual, seleccionado: true };
      } else {
        newSelectElementosBarraLateral[index] = {...seccionActual, seleccionado: false };
      }
    });
    setSelectElementBarraLateral(newSelectElementosBarraLateral);
  }

  function handleAcceso(acceso: boolean, usuario: UsuarioLogin){
    if (acceso) {
      setAcceso(true);
      if (usuario.token) {
        localStorage.setItem('token', usuario.token);
      } else {
        console.warn('No se recibió el token del backend');
      }
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      setAcceso(false);
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
}

  return (
    <Contexto.Provider
      value={{
        barraVistaMovil: barraVistaMovil,
        barraLateralVisivilidad: barraLateralVisivilidad,
        mostrarVistaSecundaria: mostrarVistaSecundaria,
        HandlevisibilidadBarraLateral: HandlevisibilidadBarraLateral,
        HandleHacerVisibleSecundaria: HandleHacerVisibleSecundaria,
        losPedidos: losPedios,
        HandleAddPedido: HandleAddPedido,
        handleAddArticulo: handleAddArticulo,
        handleSubArticulo: handleSubArticulo,
        HandleSubPedido: HandleSubPedido,
        verPedidos: verPedidos,
        direcciones:direcciones,
        handleVerOcultarContenido: handleVerOcultarContenido,
        verOcultarRestoDeSeccion: verOcultarRestoDeSeccion,
        selectElementBarraLateral: selectElementBarraLateral,
        handleChangeSelecionBarraLateral: handleChangeSelecionBarraLateral,
        acceso:acceso,
        handleAcceso: handleAcceso,
      }}
    >
      {children}
    </Contexto.Provider>
  );
}
