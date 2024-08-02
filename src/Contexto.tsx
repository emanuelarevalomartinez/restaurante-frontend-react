import { ReactNode, createContext, useState } from "react";
import {
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
import { getBebidas, updateBebida } from "./VistaPrincipal/PaginasVistaPrincipal";

// estoy trabajando en el backend en ver como establecer las relaciones del  usuario
// si es usuario o administrador
// documentar la api
// añadir limite de los datos que se devuelvan por pagina
// añadir paginacion en el frontend
// crear modal del frontend y las notificaciones emergentes

interface ContextoProps {
  barraVistaMovil: boolean;
  barraLateralVisivilidad: boolean;
  mostrarVistaSecundaria: boolean;
  HandlevisibilidadBarraLateral: () => void;
  HandleHacerVisibleSecundaria: () => void;
  platosCalientes: PlatoCaliente[];
  setPlatosCalientes: (e: PlatoCaliente[]) => void;
  losPedidos: Pedidos[];
  setlosPedidos:(e: Pedidos[])=> void;
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
  login: (e: Usuario) => void;
  logout: () => void;
  usuario: Usuario | null;
  setUsuario: (e: Usuario | null )=> void;
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
  platosCalientes: [],
  setPlatosCalientes: ()=> {},
  losPedidos: [],
  setlosPedidos: ()=> {},
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
  login: () => {},
  logout: () => {},
  usuario: null,
  setUsuario: ()=> {},
};

export const Contexto = createContext<ContextoProps>(defaultContext);

export function ContextoGlobal({ children }: ContextoGlobalProps) {
  const [barraVistaMovil] = useState<boolean>(true);
  const [barraLateralVisivilidad, setbarraLateralVisivilidad] =
    useState<boolean>(false);
  const [mostrarVistaSecundaria, setmostrarVistaSecundaria] =
    useState<boolean>(false);
  const [platosCalientes, setPlatosCalientes] = useState<PlatoCaliente[]>([]);
  const [losPedidos, setlosPedidos] = useState<Pedidos[]>([]);
  const [lasBebidas, setLasBebidas] = useState<Bebida[]>([]);
  const [losPlatosFrios, setLosPlatosFrios] = useState<PlatoFrio[]>([]);
  const [losPostres, setLosPostres] = useState<Postre[]>([]);
  const [verOcultarRestoDeSeccion, setverOcultarRestoDeSeccion] =
    useState(false);
  const [selectElementBarraLateral, setSelectElementBarraLateral] =
    useState(seleccionSeccion);
  const [escuchaPedidos, setEscuchaPedidos] = useState(true);
  const [escuchaPlatosCalientes, setEscuchaPlatosCalientes] = useState(true);
  const [escuchaBebidas, setEscuchaBebidas] = useState(true);
  const [escuchaPlatoCaliente, setEscuchaPlatoCaliente] = useState(true);


  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [acceso, setAcceso] = useState(() => {
    const exist = localStorage.getItem('usuario');
    return exist ? true : false;
  });

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
      localStorage.removeItem("usuario");
    }
  }

  function logout(){
    localStorage.removeItem('usuario');
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

      const buscarBebida = lasBebidas.filter(
        (bebida) => bebida.idBebida == añadirPedido.idProducto
      );

      let montoBase: number = 1;
      let cantRes:number = 0;

         if (buscarPlatoCaliente.length !== 0) {
            montoBase = buscarPlatoCaliente[0].precio;
            cantRes = buscarPlatoCaliente[0].cantRestante;
            añadirPedido.tipoProducto="Plato Caliente";
    }
     if (buscarBebida.length !== 0) {
            montoBase = buscarBebida[0].precio;
            cantRes = buscarBebida[0].cantRestante;
            añadirPedido.tipoProducto="Bebida";
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
                  setPlatosCalientes(data);
                  setEscuchaPlatosCalientes(true);
                } )
              } )
            } else if(buscarBebida.length !== 0){
              await updateBebida(elementoAActualizar.idProducto,{
                cantRestante: cantRestante - 1,
              })
              .then( async ()=> {
                await getBebidas()
                .then( (data)=> {
                  setLasBebidas(data);
                  setEscuchaPlatosCalientes(true);
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
            //* tengo que resolver lo de crear un nuevo pedido sin que se duplique con copilot
            //* ver por que cuando presiono en bebidas + se qeda cagando
            if(buscarPlatoCaliente.length !== 0){
              await updatePlatoCaliente(id,{
                cantRestante: cantRestante - 1,
              })
              .then( async ()=> {
                await getPlatosCalientes()
                .then( (data)=> {
                  setPlatosCalientes(data);
                  setEscuchaPlatosCalientes(true);
                } )
              } )
            } else {
                await updateBebida(id,{
                  cantRestante: cantRestante - 1,
                })
                .then( async ()=> {
                  await getBebidas()
                  .then( (data)=> {
                    setLasBebidas(data);
                    setEscuchaPlatosCalientes(true);
                  } )
                } )
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

    const buscarBebida = lasBebidas.filter(
      (bebida) => bebida.idBebida == quitarPedido.idProducto
    );

    let montoBase: number = 1;
    let cantRes:number = 0;


    if (buscarPlatoCaliente.length !== 0) {
      montoBase = buscarPlatoCaliente[0].precio;
      cantRes = buscarPlatoCaliente[0].cantRestante;
      quitarPedido.tipoProducto="Plato Caliente";
}
if (buscarBebida.length !== 0) {
      montoBase = buscarBebida[0].precio;
      cantRes = buscarBebida[0].cantRestante;
      quitarPedido.tipoProducto="Bebida";
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
              //* 
              if(buscarPlatoCaliente.length !== 0){
                console.log("perro");
                
                await updatePlatoCaliente(id,{
                  cantRestante: cantRestante + 1,
                })
                .then( async ()=> {
                  await getPlatosCalientes()
                  .then( (data)=> {
                    setPlatosCalientes(data);
                    setEscuchaPedidos(true);
                    setEscuchaPlatosCalientes(true);
                  } )
                } )
              } else if(buscarBebida.length !== 0){
                 console.log("hoolaaaaaa");
                 //*
                 await updateBebida(id,{
                  cantRestante: cantRestante + 1,
                })
                .then( async ()=> {
                  await getBebidas()
                  .then( (data)=> {
                    setLasBebidas(data);
                    setEscuchaPedidos(true);
                    setEscuchaPlatosCalientes(true);
                  } )
                } )
                 //*
              }
            } )
          //*

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
            setPlatosCalientes(data);
            setEscuchaPlatosCalientes(true);
          } )
        } )
      } else if(buscarBebida.length !== 0){
        console.log("nuevo");
        //*
        await updateBebida(elementoAActualizar.idProducto,{
          cantRestante: cantRestante + 1,
        })
        .then( async ()=> {
          await getBebidas()
          .then( (data)=> {
            setLasBebidas(data);
            setEscuchaPlatosCalientes(true);
          } )
        } )
        //*

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

  function handleChangeSelecionBarraLateral(
    seccionEscogidaAVisualizar: string
  ) {
    const newSelectElementosBarraLateral = selectElementBarraLateral;
    newSelectElementosBarraLateral.forEach((seccionActual, index) => {
      if (seccionActual.nombre === seccionEscogidaAVisualizar) {
        newSelectElementosBarraLateral[index] = {
          ...seccionActual,
          seleccionado: true,
        };
      } else {
        newSelectElementosBarraLateral[index] = {
          ...seccionActual,
          seleccionado: false,
        };
      }
    });
    setSelectElementBarraLateral(newSelectElementosBarraLateral);
  }


  return (
    <Contexto.Provider
      value={{
        barraVistaMovil: barraVistaMovil,
        barraLateralVisivilidad: barraLateralVisivilidad,
        mostrarVistaSecundaria: mostrarVistaSecundaria,
        HandlevisibilidadBarraLateral: HandlevisibilidadBarraLateral,
        HandleHacerVisibleSecundaria: HandleHacerVisibleSecundaria,
        platosCalientes: platosCalientes,
        setPlatosCalientes:setPlatosCalientes,
        losPedidos: losPedidos,
        setlosPedidos:setlosPedidos,
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
