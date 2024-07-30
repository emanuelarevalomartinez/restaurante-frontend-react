import { ReactNode, createContext, useState } from "react";
import {
  PedidoActualizar,
  Pedidos,
  PlatoCaliente,
  SeleccionSeccion,
  Usuario,
} from "./Interfaces";
import { seleccionSeccion } from ".";
import { crearPedido, deletePedidoMedianteUsuario, updatePedido } from "./VistaPrincipal/PaginasVistaPrincipal/PaginaSecundaria/Secundaria-Servicios";
import { Auth } from "./Autentificacion/Auth";

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
  HandleActualizarPlatoCalienteEspeficico: (e: string, f:number)=> void;
  HanddleDevolverTodosLosPlatos: (e: string, f:number)=> void;
  escuchaPedidos: boolean;
  setEscuchaPedidos: (e: boolean) => void;
  escuchaPlatosCalientes: boolean;
  setEscuchaPlatosCalientes: (e: boolean) => void;
  escuchaPlatoCaliente: boolean;
  setEscuchaPlatoCaliente: (e: boolean) => void;
  HandleAddPedido: (
    id: string,
    descripcion: string,
    cantidad: number,
    cantidadAOrdenar: number,
    imagen: string
  ) => void;
  HandleSubPedido: (
    id: string,
    descripcion: string,
    cantidad: number,
    cantidadAOrdenar: number,
    imagen: string
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
  HandleActualizarPlatoCalienteEspeficico: ()=> {},
  HanddleDevolverTodosLosPlatos: ()=> {},
  escuchaPedidos: true,
  setEscuchaPedidos: () => {},
  escuchaPlatosCalientes: true,
  setEscuchaPlatosCalientes: () => {},
  escuchaPlatoCaliente: true,
  setEscuchaPlatoCaliente: ()=> {},
  HandleAddPedido: () => {},
  HandleSubPedido: () => {},
  handleVerOcultarContenido: () => {},
  verOcultarRestoDeSeccion: false,
  selectElementBarraLateral: [
    {
      nombre: "home",
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
  const [verOcultarRestoDeSeccion, setverOcultarRestoDeSeccion] =
    useState(false);
  const [selectElementBarraLateral, setSelectElementBarraLateral] =
    useState(seleccionSeccion);
  const [escuchaPedidos, setEscuchaPedidos] = useState(true);
  const [escuchaPlatosCalientes, setEscuchaPlatosCalientes] = useState(true);
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
    imagen: string
  ) {

    let añadirPedido: Pedidos = {
      idCarrito:"",
      tipoProducto:"",
      idProducto: id,
      descripcion: descripcion,
      montoTotal: montoTotal,
      imagen: imagen,
      cantidadAOrdenar: cantidadAOrdenar,
    };

      const findProductoExistente = losPedidos.filter(
        (pedido) => pedido.idProducto === añadirPedido.idProducto
      );
      
      const buscarPlatoCaliente = platosCalientes.filter(
        (plato) => plato.id == añadirPedido.idProducto
      );

      let montoBase: number = 1;
      let cantRes:number = 0;

         if (buscarPlatoCaliente) {
            montoBase = buscarPlatoCaliente[0].precio;
            cantRes = buscarPlatoCaliente[0].cantRestante;
            añadirPedido.tipoProducto="Plato Caliente";
    }

    const auth = Auth();

      if (findProductoExistente.length > 0) {
        
        let elementoAActualizar: Pedidos = findProductoExistente[0];
  
        let actualizar: PedidoActualizar = {
          descripcion: elementoAActualizar.descripcion,
          montoTotal: elementoAActualizar.montoTotal + montoBase,
          cantidadAOrdenar: elementoAActualizar.cantidadAOrdenar + 1,
        };

        if(auth){
          updatePedido(auth.idUsuario,elementoAActualizar.idProducto, actualizar)
          .then((data) => {
            
          })
          .catch((error) => {
            console.error("Error al actualizar el pedido:");
            console.log(error);
          });
        }
      } else {
        if(auth){
          crearPedido(auth.idUsuario,añadirPedido.idProducto,{
            cantidadAOrdenar:añadirPedido.cantidadAOrdenar,
            descripcion:añadirPedido.descripcion,
            imagen:añadirPedido.imagen,
            montoTotal:añadirPedido.montoTotal,
            cantidad:2
          });
        }
      }
      setEscuchaPedidos(true);
  }

  function HandleSubPedido(
    id: string,
    descripcion: string,
    montoTotal: number,
    cantidadAOrdenar: number,
    imagen: string
  ){
    
    let quitarPedido: Pedidos = {
      idCarrito:"",
      tipoProducto:"",
      idProducto: id,
      descripcion: descripcion,
      montoTotal: montoTotal,
      imagen: imagen,
      cantidadAOrdenar: cantidadAOrdenar,
    };

    const findProductoExistente = losPedidos.filter(
      (pedido) => pedido.idProducto === quitarPedido.idProducto
    );

    const buscarPlatoCaliente = platosCalientes.filter(
      (plato) => plato.id == quitarPedido.idProducto
    );

    let montoBase: number = 1;
    let cantRes:number = 0;


    if (buscarPlatoCaliente) {
      montoBase = buscarPlatoCaliente[0].precio;
      cantRes = buscarPlatoCaliente[0].cantRestante;
      quitarPedido.tipoProducto="Plato Caliente";

      
}

const auth = Auth();

if (findProductoExistente.length > 0) {
        
  let elementoAActualizar: Pedidos = findProductoExistente[0];
  
  if(elementoAActualizar.cantidadAOrdenar -1 < 1){




    console.log("it is imposibble");
    if(auth){

      deletePedidoMedianteUsuario(auth.idUsuario,elementoAActualizar.idProducto)
      .then((data) => {
        
      })
      .catch((error) => {
        console.error("Error al actualizar el pedido:");
        console.log(error);
      });

    }  




    
  } else {

    let actualizar: PedidoActualizar = {
      descripcion: elementoAActualizar.descripcion,
      montoTotal: elementoAActualizar.montoTotal + montoBase,
      cantidadAOrdenar: elementoAActualizar.cantidadAOrdenar - 1,
    };

 if(auth){
    updatePedido(auth.idUsuario,elementoAActualizar.idProducto, actualizar)
    .then((data) => {
      
    })
    .catch((error) => {
      console.error("Error al actualizar el pedido:");
      console.log(error);
    });
  }

  }
  

  setEscuchaPedidos(true);
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
        HandleActualizarPlatoCalienteEspeficico:HandleActualizarPlatoCalienteEspeficico,
        HanddleDevolverTodosLosPlatos:HanddleDevolverTodosLosPlatos,
        escuchaPedidos: escuchaPedidos,
        setEscuchaPedidos: setEscuchaPedidos,
        escuchaPlatosCalientes: escuchaPlatosCalientes,
        setEscuchaPlatosCalientes: setEscuchaPlatosCalientes,
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
