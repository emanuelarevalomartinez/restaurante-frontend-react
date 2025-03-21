import { ReactNode, createContext, useEffect, useState } from "react";
import {
  Notificacion,
  PedidoActualizar,
  Pedidos,
  PlatoCaliente,
  PlatoFrio,
  Postre,
  SeleccionSeccion,
  Usuario,
} from "./Interfaces";
import { seleccionSeccion } from ".";
import { crearPedido, deletePedidoMedianteUsuario, getUnPedidoPorUsuario, updatePedido } from "./VistaPrincipal/PaginasVistaPrincipal/PaginaSecundaria/Secundaria-Servicios";
import { Auth } from "./Autentificacion/Auth";
import { Bebida } from "./Interfaces/Bebida";
import { getPlatosCalientes, updatePlatoCaliente } from "./VistaPrincipal/PaginasVistaPrincipal/UI";
import { getBebidas, getPlatosFrios, getPostres, updateBebida, updatePlatoFrio, updatePostre } from "./VistaPrincipal/PaginasVistaPrincipal";

//TODO  hacer en la  pagina de autentificacion que la contraseña se muestre o no a peticion del usuario
//TODO: si es usuario o administrador se tiene que  mostrar la seccion editar o no
// TODO: documentar la api del backend

interface ContextoProps {
  lenguajeEs:boolean;
  setLenguajeEs: (e: boolean)=> void;
  barraVistaMovil: boolean;
  barraLateralVisivilidad: boolean;
  mostrarVistaSecundaria: boolean;
  HandlevisibilidadBarraLateral: () => void;
  HandleHacerVisibleSecundaria: () => void;
  platosCalientes: PlatoCaliente[];
  setPlatosCalientes: (e: PlatoCaliente[]) => void;
  losPedidos: Pedidos[];
  setlosPedidos:(e: Pedidos[])=> void;
  lasNotificaciones: Notificacion[];
  setLasNotificaciones:(e: Notificacion[])=> void;
  lasBebidas: Bebida[];
  setLasBebidas:(e: Bebida[])=> void;
  losPlatosFrios: PlatoFrio[];
  setLosPlatosFrios:(e: PlatoFrio[])=> void;
  losPostres: Postre[];
  setLosPostres:(e: Postre[])=> void;
  HandleActualizarPlatoCalienteEspeficico: (e: string, f:number)=> void;
  HanddleDevolverTodosLosPlatos: (e: string, f:number)=> void;
  escuchaPedidos: boolean;
  setEscuchaPedidos: (e: boolean) => void;
  escuchaPlatosCalientes: boolean;
  setEscuchaPlatosCalientes: (e: boolean) => void;
  escuchaBebidas: boolean;
  setEscuchaBebidas: (e: boolean) => void;
  escuchaPlatosFrios: boolean;
  setEscuchaPlatosFrios: (e: boolean) => void;
  escuchaPostres: boolean;
  setEscuchaPostres: (e: boolean) => void;
  escuchaNotificaciones: boolean;
  setEscuchaNotificaciones: (e: boolean) => void;
  escuchaPlatoCaliente: boolean;
  setEscuchaPlatoCaliente: (e: boolean) => void;
  HandleAddPedido: (
    id: string,
    descripcion: string,
    cantidad: number,
    cantidadAOrdenar: number,
    imagen: string,
    cantRestante:number,
  ) => void;
  HandleSubPedido: (
    id: string,
    descripcion: string,
    cantidad: number,
    cantidadAOrdenar: number,
    imagen: string,
    cantRestante:number,
  ) => void;
  handleVerOcultarContenido: (e: boolean) => void;
  verOcultarRestoDeSeccion: boolean;
  selectElementBarraLateral: SeleccionSeccion[];
  handleChangeSelecionBarraLateral: (e: string) => void;
  acceso: boolean;
  setAcceso: (e: boolean) => void;
  redireccion: boolean;
  setRedireccion: (e: boolean) => void;
  redireccionAutentificacion: boolean;
  setRedireccionAutentificacion: (e: boolean) => void;
  login: (e: Usuario) => void;
  logout: () => void;
  usuario: Usuario | null;
  setUsuario: (e: Usuario | null )=> void;
}

interface ContextoGlobalProps {
  children: ReactNode;
}

const defaultContext: ContextoProps = {
  lenguajeEs:true,
  setLenguajeEs: ()=> {},
  barraVistaMovil: false,
  barraLateralVisivilidad: false,
  mostrarVistaSecundaria: false,
  HandlevisibilidadBarraLateral: () => {},
  HandleHacerVisibleSecundaria: () => {},
  platosCalientes: [],
  setPlatosCalientes: ()=> {},
  losPedidos: [],
  setlosPedidos: ()=> {},
  lasNotificaciones: [],
  setLasNotificaciones: ()=> {},
  lasBebidas: [],
  setLasBebidas: ()=> {},
  losPlatosFrios: [],
  setLosPlatosFrios: ()=> {},
  losPostres: [],
  setLosPostres: ()=> {},
  HandleActualizarPlatoCalienteEspeficico: ()=> {},
  HanddleDevolverTodosLosPlatos: ()=> {},
  escuchaPedidos: true,
  setEscuchaPedidos: () => {},
  escuchaPlatosCalientes: true,
  setEscuchaPlatosCalientes: () => {},
  escuchaBebidas: true,
  setEscuchaBebidas: () => {},
  escuchaPlatosFrios: true,
  setEscuchaPlatosFrios: () => {},
  escuchaPostres: true,
  setEscuchaPostres: () => {},
  escuchaNotificaciones: true,
  setEscuchaNotificaciones: () => {},
  escuchaPlatoCaliente: true,
  setEscuchaPlatoCaliente: ()=> {},
  HandleAddPedido: () => {},
  HandleSubPedido: () => {},
  handleVerOcultarContenido: () => {},
  verOcultarRestoDeSeccion: false,
  selectElementBarraLateral: [
    {
      nombre: "/",
      seleccionado: true,
    },
  ],
  handleChangeSelecionBarraLateral: () => {},
  acceso: false,
  setAcceso: ()=> {},
  redireccion: false,
  setRedireccion: ()=> {},
  redireccionAutentificacion: false,
  setRedireccionAutentificacion: ()=> {},
  login: () => {},
  logout: () => {},
  usuario: null,
  setUsuario: ()=> {},
};

export const Contexto = createContext<ContextoProps>(defaultContext);

export function ContextoGlobal({ children }: ContextoGlobalProps) {
  const [lenguajeEs, setLenguajeEs] = useState( ()=> {
    const es = localStorage.getItem('es');
    if(es){
      return JSON.parse(es);
    } else {
      return true;
    }
  } );
  
  const [barraVistaMovil] = useState<boolean>(true);
  const [barraLateralVisivilidad, setbarraLateralVisivilidad] =
    useState<boolean>(false);
  const [mostrarVistaSecundaria, setmostrarVistaSecundaria] =
    useState<boolean>(false);
  const [platosCalientes, setPlatosCalientes] = useState<PlatoCaliente[]>([]);
  const [losPedidos, setlosPedidos] = useState<Pedidos[]>([]);
  const [lasNotificaciones, setLasNotificaciones] = useState<Notificacion[]>([]);
  const [losPlatosFrios, setLosPlatosFrios] = useState<PlatoFrio[]>([]);
  const [lasBebidas, setLasBebidas] = useState<Bebida[]>([]);
  const [losPostres, setLosPostres] = useState<Postre[]>([]);
  const [escuchaPedidos, setEscuchaPedidos] = useState(true);
  const [escuchaPlatosCalientes, setEscuchaPlatosCalientes] = useState(true);
  const [escuchaBebidas, setEscuchaBebidas] = useState(true);
  const [escuchaPlatosFrios, setEscuchaPlatosFrios] = useState(true);
  const [escuchaPostres, setEscuchaPostres] = useState(true);
  const [escuchaNotificaciones, setEscuchaNotificaciones] = useState(true);
  const [escuchaPlatoCaliente, setEscuchaPlatoCaliente] = useState(true);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [selectElementBarraLateral, setSelectElementBarraLateral] =
    useState(seleccionSeccion);
  const [verOcultarRestoDeSeccion, setverOcultarRestoDeSeccion] =
    useState(()=>{
      const ver = localStorage.getItem("verSeccionesAmpliadas");
      if(ver){
        const status = JSON.parse(ver);
        return status;
      } else {
        return false;
      }
    });
  const [acceso, setAcceso] = useState(() => {
    const exist = localStorage.getItem('usuario');
    return exist ? true : false;
  });

  const [redireccion, setRedireccion] = useState(false);
  const [redireccionAutentificacion, setRedireccionAutentificacion] = useState(false);

  function login(usuario: Usuario | null) {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
      setAcceso(true);
  
      const user = localStorage.getItem("usuario");
      if (user) {
        try {
          const parsedUser: Usuario = JSON.parse(user);
          setUsuario(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUsuario(null);
        }
      } else {
        console.error('No user data found in localStorage');
        setUsuario(null);
      }
    } else {
      console.warn("No se recibió el token del backend");
      setAcceso(false);
      localStorage.removeItem('posicionBarraNavegacion');
      localStorage.removeItem('ver');
      localStorage.removeItem('barra');
      localStorage.removeItem("usuario");
    }
  }

  function logout(){
    localStorage.removeItem('posicionBarraNavegacion');
      localStorage.removeItem('verSeccionesAmpliadas');
      localStorage.removeItem('barra');
    localStorage.removeItem('usuario');

    localStorage.removeItem('paginaActual-platosCalientes');
    localStorage.removeItem('paginaActual-platosFrios');
    localStorage.removeItem('paginaActual-bebidas');
    localStorage.removeItem('paginaActual-postres');
    localStorage.removeItem('seccionBarraLateralAVisualizar');
    setSelectElementBarraLateral(seleccionSeccion);
    setverOcultarRestoDeSeccion(false);
                  setAcceso(false);
                  setUsuario(null);
  }

  function HandleActualizarPlatoCalienteEspeficico(platoId: string, nuevaCantidadRestante: number) {
    
    const indice = platosCalientes.findIndex(plato => plato.id === platoId);
    if (indice !== -1) {
      const nuevosPlatosCalientes = [...platosCalientes];
      nuevosPlatosCalientes[indice].cantRestante = nuevaCantidadRestante;
      setPlatosCalientes(nuevosPlatosCalientes);
    } else if(indice !== -1)  {
      const nuevosPlatosCalientes = [...platosCalientes];
      nuevosPlatosCalientes[indice].cantRestante = 0;
    }
  }

  function HanddleDevolverTodosLosPlatos(platoId: string, cantidad:number){
    const indice = platosCalientes.findIndex(plato => plato.id === platoId);
    if (indice !== -1) {
      const nuevosPlatosCalientes = [...platosCalientes];
      nuevosPlatosCalientes[indice].cantRestante = nuevosPlatosCalientes[indice].cantRestante + cantidad;
      setPlatosCalientes(nuevosPlatosCalientes);
    } else if(indice !== -1)  {
      const nuevosPlatosCalientes = [...platosCalientes];
      nuevosPlatosCalientes[indice].cantRestante = 1;
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
    cantidadAOrdenar: number,
    imagen: string,
    cantRestante:number,
  ) {

    let añadirPedido: Pedidos = {
      idCarrito:"",
      tipoProducto:"",
      idProducto: id,
      descripcion: descripcion,
      montoTotal: montoTotal,
      imagen: imagen,
      cantidadAOrdenar: cantidadAOrdenar,
      cantRestante:cantRestante,
    };

      const findProductoExistente = losPedidos.filter(
        (pedido) => pedido.idProducto === añadirPedido.idProducto
      );
      
      const buscarPlatoCaliente = platosCalientes.filter(
        (plato) => plato.id == añadirPedido.idProducto
      );

      const buscarPlatoFrio = losPlatosFrios.filter(
        (platoFrio) => platoFrio.idPlatoFrio == añadirPedido.idProducto
      );
      const buscarBebida = lasBebidas.filter(
        (bebida) => bebida.idBebida == añadirPedido.idProducto
      );
      const buscarPostre = losPostres.filter(
        (postre) => postre.idPostre == añadirPedido.idProducto
      );

      let montoBase: number = 1;
      let cantRes:number = 0;

         if (buscarPlatoCaliente.length !== 0) {
            montoBase = buscarPlatoCaliente[0].precio;
            cantRes = buscarPlatoCaliente[0].cantRestante;
            añadirPedido.tipoProducto="Plato Caliente";
    }
     if (buscarPlatoFrio.length !== 0) {
            montoBase = buscarPlatoFrio[0].precio;
            cantRes = buscarPlatoFrio[0].cantRestante;
            añadirPedido.tipoProducto="Plato Frio";
    }
     if (buscarBebida.length !== 0) {
            montoBase = buscarBebida[0].precio;
            cantRes = buscarBebida[0].cantRestante;
            añadirPedido.tipoProducto="Bebida";
    }
     if (buscarPostre.length !== 0) {
            montoBase = buscarPostre[0].precio;
            cantRes = buscarPostre[0].cantRestante;
            añadirPedido.tipoProducto="Postre";
    }

    const auth = Auth();

    if (findProductoExistente.length !== 0) {
        let elementoAActualizar: Pedidos = findProductoExistente[0];
        
  
        let actualizar: PedidoActualizar = {
          
          descripcion: elementoAActualizar.descripcion,
          montoTotal: elementoAActualizar.montoTotal + montoBase,
          cantidadAOrdenar: elementoAActualizar.cantidadAOrdenar + 1,
        };

        if(auth){
          updatePedido(auth.idUsuario,elementoAActualizar.idProducto, actualizar)
          .then( async () => {
            if(buscarPlatoCaliente.length !== 0){

              await updatePlatoCaliente(elementoAActualizar.idProducto,{
                cantRestante: cantRestante - 1,
              })
              .then( async ()=> {
                await getPlatosCalientes()
                .then( (data)=> {
                  setPlatosCalientes(data.platos);
                  setEscuchaPlatosCalientes(true);
                } )
              } )
            } else if(buscarPlatoFrio.length !== 0){
              await updatePlatoFrio(elementoAActualizar.idProducto,{
                cantRestante: cantRestante - 1,
              })
              .then( async ()=> {
                await getPlatosFrios()
                .then( (data)=> {
                  setLosPlatosFrios(data.platosFrios);
                  setEscuchaPlatosFrios(true);
                } )
              } )
            } else if(buscarBebida.length !== 0){
              await updateBebida(elementoAActualizar.idProducto,{
                cantRestante: cantRestante - 1,
              })
              .then( async ()=> {
                await getBebidas()
                .then( (data)=> {
                  setLasBebidas(data.bebidas);
                  setEscuchaBebidas(true);
                } )
              } )
            } else if(buscarPostre.length !== 0){
               await updatePostre(elementoAActualizar.idProducto,{
                cantRestante: cantRestante - 1,
              })
              .then( async ()=> {
                await getPostres()
                .then( (data)=> {
                  setLosPostres(data.postres);
                  setEscuchaPostres(true);
                } )
              } )
            }
          })
          .catch((error) => {
            console.error("Error al tratar de aumentar pedido");
            console.log(error);
          });
        }
      } else {
        
        if(auth){
          crearPedido(auth.idUsuario,id,{
            cantidadAOrdenar:1,
            descripcion:añadirPedido.descripcion,
            imagen:añadirPedido.imagen,
            montoTotal:añadirPedido.montoTotal,
          })
          .then( async ()=> {
            setEscuchaPedidos(true);
            if(buscarPlatoCaliente.length !== 0){
              await updatePlatoCaliente(id,{
                cantRestante: cantRestante - 1,
              })
              .then( async ()=> {
                await getPlatosCalientes()
                .then( (data)=> {
                  setPlatosCalientes(data.platos);
                } )
              } )
              setEscuchaPlatosCalientes(true);
            } else if( buscarPlatoFrio.length !==0 ) {
               await updatePlatoFrio(id,{
                cantRestante: cantRestante - 1,
              })
              .then( async ()=> {
                await getPlatosFrios()
                .then( (data)=> {
                  setLosPlatosFrios(data.platosFrios);
                } )
              } )
              setEscuchaPlatosFrios(true);
            } else if( buscarBebida.length !==0 ) {
                await updateBebida(id,{
                  cantRestante: cantRestante - 1,
                })
                .then( async ()=> {
                  await getBebidas()
                  .then( (data)=> {
                    setLasBebidas(data.bebidas);
                  } )
                } )
                setEscuchaBebidas(true);
            } else if( buscarPostre.length !==0 ) {
                await updatePostre(id,{
                  cantRestante: cantRestante - 1,
                })
                .then( async ()=> {
                  await getPostres()
                  .then( (data)=> {
                    setLosPostres(data.postres);
                  } )
                } )
                setEscuchaPostres(true);
            }
          } )
        }
      }
      setEscuchaPedidos(true);
  }

  function HandleSubPedido(
    id: string,
    descripcion: string,
    montoTotal: number,
    cantidadAOrdenar: number,
    imagen: string,
    cantRestante:number,
  ){
    
    let quitarPedido: Pedidos = {
      idCarrito:"",
      tipoProducto:"",
      idProducto: id,
      descripcion: descripcion,
      montoTotal: montoTotal,
      imagen: imagen,
      cantidadAOrdenar: cantidadAOrdenar,
      cantRestante:cantRestante,
    };

    const findProductoExistente = losPedidos.filter(
      (pedido) => pedido.idProducto === quitarPedido.idProducto
    );

    const buscarPlatoCaliente = platosCalientes.filter(
      (plato) => plato.id == quitarPedido.idProducto
    );

    const buscarPlatoFrio = losPlatosFrios.filter(
      (platoFrio) => platoFrio.idPlatoFrio == quitarPedido.idProducto
    );
    const buscarBebida = lasBebidas.filter(
      (bebida) => bebida.idBebida == quitarPedido.idProducto
    );
    const buscarPostre = losPostres.filter(
      (postre) => postre.idPostre == quitarPedido.idProducto
    );

    let montoBase: number = 1;
    let cantRes:number = 0;


    if (buscarPlatoCaliente.length !== 0) {
      montoBase = buscarPlatoCaliente[0].precio;
      cantRes = buscarPlatoCaliente[0].cantRestante;
      quitarPedido.tipoProducto="Plato Caliente";
}
if (buscarPlatoFrio.length !== 0) {
      montoBase = buscarPlatoFrio[0].precio;
      cantRes = buscarPlatoFrio[0].cantRestante;
      quitarPedido.tipoProducto="Plato Frio";
}
if (buscarBebida.length !== 0) {
      montoBase = buscarBebida[0].precio;
      cantRes = buscarBebida[0].cantRestante;
      quitarPedido.tipoProducto="Bebida";
}
if (buscarPostre.length !== 0) {
      montoBase = buscarPostre[0].precio;
      cantRes = buscarPostre[0].cantRestante;
      quitarPedido.tipoProducto="Postre";
}

const auth = Auth();

if (findProductoExistente.length !== 0) {
        
  let elementoAActualizar: Pedidos = findProductoExistente[0];
  
  let actualizar: PedidoActualizar = {
    descripcion: elementoAActualizar.descripcion,
    montoTotal: elementoAActualizar.montoTotal + montoBase,
    cantidadAOrdenar: elementoAActualizar.cantidadAOrdenar - 1,
  };

  if(auth){

    getUnPedidoPorUsuario(auth.idUsuario,elementoAActualizar.idProducto)
    .then( (data)=> {
         const datos = data.cantidadAOrdenar;
         
         if(datos - 1 < 1 ){

          
            deletePedidoMedianteUsuario(auth.idUsuario,id)
            .then( async ()=> {
              if(buscarPlatoCaliente.length !== 0){
                await updatePlatoCaliente(id,{
                  cantRestante: cantRestante + 1,
                })
                .then( async ()=> {
                  await getPlatosCalientes()
                  .then( (data)=> {
                    setPlatosCalientes(data.platos);
                    setEscuchaPedidos(true);
                    setEscuchaPlatosCalientes(true);
                  } )
                } )
              } else if(buscarPlatoFrio.length !== 0){
                 await updatePlatoFrio(id,{
                  cantRestante: cantRestante + 1,
                })
                .then( async ()=> {
                  await getPlatosFrios()
                  .then( (data)=> {
                    setLosPlatosFrios(data.platosFrios);
                    setEscuchaPedidos(true);
                    setEscuchaPlatosFrios(true);
                  } )
                } )
              } else if(buscarBebida.length !== 0){
                await updateBebida(id,{
                  cantRestante: cantRestante + 1,
                })
                .then( async ()=> {
                  await getBebidas()
                  .then( (data)=> {
                    setLasBebidas(data.bebidas);
                    setEscuchaPedidos(true);
                    setEscuchaBebidas(true);
                  } )
                } )
              } else if(buscarPostre.length !== 0){
                await updatePostre(id,{
                  cantRestante: cantRestante + 1,
                })
                .then( async ()=> {
                  await getPostres()
                  .then( (data)=> {
                    setLosPostres(data.postres);
                    setEscuchaPedidos(true);
                    setEscuchaPostres(true);
                  } )
                } )
              }
            } )

         } else {
          
             updatePedido(auth.idUsuario,elementoAActualizar.idProducto, actualizar)
    .then( async () => {
      if(buscarPlatoCaliente.length !== 0){
        await updatePlatoCaliente(elementoAActualizar.idProducto,{
          cantRestante: cantRestante + 1,
        })
        .then( async ()=> {
          await getPlatosCalientes()
          .then( (data)=> {
            setPlatosCalientes(data.platos);
            setEscuchaPlatosCalientes(true);
          } )
        } )
      } else if(buscarPlatoFrio.length !== 0){
        await updatePlatoFrio(elementoAActualizar.idProducto,{
          cantRestante: cantRestante + 1,
        })
        .then( async ()=> {
          await getPlatosFrios()
          .then( (data)=> {
            setLosPlatosFrios(data.platosFrios);
            setEscuchaPlatosFrios(true);
          } )
        } )
      } else if(buscarBebida.length !== 0){
        await updateBebida(elementoAActualizar.idProducto,{
          cantRestante: cantRestante + 1,
        })
        .then( async ()=> {
          await getBebidas()
          .then( (data)=> {
            setLasBebidas(data.bebidas);
            setEscuchaBebidas(true);
          } )
        } )
      } else if(buscarPostre.length !== 0){
        await updatePostre(elementoAActualizar.idProducto,{
          cantRestante: cantRestante + 1,
        })
        .then( async ()=> {
          await getPostres()
          .then( (data)=> {
            setLosPostres(data.postres);
            setEscuchaPostres(true);
          } )
        } )
      }
    })
    .catch((error) => {
      console.error("Error al tratar de disminuir el pedido");
      console.log(error);
    });

    setEscuchaPedidos(true);

  }
    } )

  }
  } else {
}
  }

  function handleVerOcultarContenido(status: boolean) {
    setverOcultarRestoDeSeccion(status);
  }


  function handleChangeSelecionBarraLateral(seccionEscogidaAVisualizar: string) {
    const newSelectElementosBarraLateral = selectElementBarraLateral.map(seccion => ({
        ...seccion,
        seleccionado: seccion.nombre === seccionEscogidaAVisualizar,
    }));
    setSelectElementBarraLateral(newSelectElementosBarraLateral);
    localStorage.setItem("seccionBarraLateralAVisualizar", seccionEscogidaAVisualizar);
}

useEffect(() => {
  const cargarUltimaSeccionBarraLateral = localStorage.getItem("seccionBarraLateralAVisualizar") || "/";
  handleChangeSelecionBarraLateral(cargarUltimaSeccionBarraLateral);
}, []);



  return (
    <Contexto.Provider
      value={{
        lenguajeEs:lenguajeEs,
        setLenguajeEs: setLenguajeEs,
        barraVistaMovil: barraVistaMovil,
        barraLateralVisivilidad: barraLateralVisivilidad,
        mostrarVistaSecundaria: mostrarVistaSecundaria,
        HandlevisibilidadBarraLateral: HandlevisibilidadBarraLateral,
        HandleHacerVisibleSecundaria: HandleHacerVisibleSecundaria,
        platosCalientes: platosCalientes,
        setPlatosCalientes:setPlatosCalientes,
        losPedidos: losPedidos,
        setlosPedidos:setlosPedidos,
        lasNotificaciones: lasNotificaciones,
        setLasNotificaciones:setLasNotificaciones,
        lasBebidas: lasBebidas,
        setLasBebidas:setLasBebidas,
        losPlatosFrios: losPlatosFrios,
        setLosPlatosFrios:setLosPlatosFrios,
        losPostres: losPostres,
        setLosPostres:setLosPostres,
        HandleActualizarPlatoCalienteEspeficico:HandleActualizarPlatoCalienteEspeficico,
        HanddleDevolverTodosLosPlatos:HanddleDevolverTodosLosPlatos,
        escuchaPedidos: escuchaPedidos,
        setEscuchaPedidos: setEscuchaPedidos,
        escuchaPlatosCalientes: escuchaPlatosCalientes,
        setEscuchaPlatosCalientes: setEscuchaPlatosCalientes,
        escuchaBebidas: escuchaBebidas,
        setEscuchaBebidas: setEscuchaBebidas,
        escuchaPlatosFrios: escuchaPlatosFrios,
        setEscuchaPlatosFrios: setEscuchaPlatosFrios,
        escuchaPostres: escuchaPostres,
        setEscuchaPostres: setEscuchaPostres,
        escuchaNotificaciones: escuchaNotificaciones,
        setEscuchaNotificaciones: setEscuchaNotificaciones,
        escuchaPlatoCaliente: escuchaPlatoCaliente,
        setEscuchaPlatoCaliente: setEscuchaPlatoCaliente,
        HandleAddPedido: HandleAddPedido,
        HandleSubPedido:HandleSubPedido,
        handleVerOcultarContenido: handleVerOcultarContenido,
        verOcultarRestoDeSeccion: verOcultarRestoDeSeccion,
        selectElementBarraLateral: selectElementBarraLateral,
        handleChangeSelecionBarraLateral: handleChangeSelecionBarraLateral,
        acceso: acceso,
        setAcceso:setAcceso,
        redireccion: redireccion,
        setRedireccion:setRedireccion,
        redireccionAutentificacion: redireccionAutentificacion,
        setRedireccionAutentificacion:setRedireccionAutentificacion,
        login: login,
        logout:logout,
        usuario:usuario,
        setUsuario:setUsuario,
      }}
    >
      {children}
    </Contexto.Provider>
  );
}
