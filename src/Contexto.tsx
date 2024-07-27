import { ReactNode, createContext, useState } from "react";
import {
  PedidoActualizar,
  Pedidos,
  PlatoCaliente,
  PlatoCalienteActualizar,
  SeleccionSeccion,
  Usuario,
} from "./Interfaces";
import { seleccionSeccion } from ".";
import { updatePedido } from "./VistaPrincipal/PaginasVistaPrincipal/PaginaSecundaria/Secundaria-Servicios";

// estoy trabajando en el backend en ver como establecer las relaciones del  usuario
// si es usuario o administrador
// luego de eso arreglar el crear usuario  y asociarle sus respectivas relaciones
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
  HandleActualizarPlatosCalientes: (e: PlatoCaliente[]) => void;
  losPedidos: Pedidos[];
  HandleChargePedidos: (e: Pedidos[]) => void;
  HandleActualizarPlatoCalienteEspeficico: (e: string, f:number)=> void;
  escuchaPedidos: boolean;
  setEscuchaPedidos: (e: boolean) => void;
  HandleAddPedido: (
    id: string,
    descripcion: string,
    cantidad: number,
    cantidadRestante: number,
    cantidadAOrdenar: number,
    imagen: string
  ) => void;
  handleAddArticulo: (e: number) => void;
  direcciones: string[];
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
  HandleActualizarPlatosCalientes: () => {},
  losPedidos: [],
  HandleChargePedidos: () => {},
  HandleActualizarPlatoCalienteEspeficico: ()=> {},
  escuchaPedidos: true,
  setEscuchaPedidos: () => {},
  HandleAddPedido: () => {},
  handleAddArticulo: () => {},
  direcciones: [],
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
  const [cantidadArticulosIguales, setcantidadArticulosIguales] = useState(0);
  const direcciones: string[] = ["/AcercaDe"];
  const [verOcultarRestoDeSeccion, setverOcultarRestoDeSeccion] =
    useState(false);
  const [selectElementBarraLateral, setSelectElementBarraLateral] =
    useState(seleccionSeccion);
  const [escuchaPedidos, setEscuchaPedidos] = useState(true);
  const [escuchaPlatosCalientes, setEscuchaPlatosCalientes] = useState(true);


  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [acceso, setAcceso] = useState(() => {
    const exist = localStorage.getItem('usuario');
    return exist ? true : false;
  });
  const [loading, setLoading] = useState(false);
  

  // function login(usuario: Usuario) {
  //     if (usuario) {
  //       localStorage.setItem("usuario", JSON.stringify(usuario));
  //       setAcceso(true);
  //         let user = localStorage.getItem("usuario");
  //           setUsuario(JSON.parse(user));
  //     } else {
  //       console.warn("No se recibió el token del backend");
  //       setAcceso(false);
  //       localStorage.removeItem("usuario");
  //     }
    
  // }

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

  function HandleActualizarPlatosCalientes(platos: PlatoCaliente[]) {
    setPlatosCalientes(platos);
  }

  function HandleActualizarPlatoCalienteEspeficico(platoId: string, nuevaCantidadRestante: number) {
    const indice = platosCalientes.findIndex(plato => plato.id === platoId);
    if (indice !== -1) {
      const nuevosPlatosCalientes = [...platosCalientes];
      nuevosPlatosCalientes[indice].cantRestante = nuevaCantidadRestante;
      setPlatosCalientes(nuevosPlatosCalientes);
    }
  }
  
  

  function handleAddArticulo(cantidadRestante: number) {
    if (cantidadRestante - 1 < 0) {
      setcantidadArticulosIguales(cantidadArticulosIguales);
    } else {
      setcantidadArticulosIguales(cantidadArticulosIguales + 1);
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

  function HandleChargePedidos(data: Pedidos[]) {
    setlosPedidos(data);
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
      tipoProducto:"revisar handle add pedido",
      idProducto: id,
      descripcion: descripcion,
      cantidad: cantidadRest,
      montoTotal: montoTotal,
      imagen: imagen,
      cantidadAOrdenar: cantidadAOrdenar,
    };

    const findProductoExistente = losPedidos.filter(
      (pedido) => pedido.idProducto === nuevoPedido.idProducto
    );

    const buscarPlatoCaliente = platosCalientes.filter(
      (plato) => plato.id == nuevoPedido.idProducto
    );

    let montoBase: number = 1;
    let cantRes:number = 0;

    if (buscarPlatoCaliente) {
      montoBase = buscarPlatoCaliente[0].precio;
      cantRes = buscarPlatoCaliente[0].cantRestante;
    }

    if(cantRes-1 < 0 ){
      console.log("it is not posibble");
      
    } else {
      if (findProductoExistente.length > 0) {
        let elementoAActualizar: Pedidos = findProductoExistente[0];
  
        let actualizar: PedidoActualizar = {
          descripcion: elementoAActualizar.descripcion,
          montoTotal: elementoAActualizar.montoTotal + montoBase,
          cantidadAOrdenar: elementoAActualizar.cantidadAOrdenar + 1,
        };
  
        //permite establecer elrecargo del componente
        setEscuchaPedidos(true);
        
  
        updatePedido(elementoAActualizar.idProducto, actualizar)
          .then((data) => {
          })
          .catch((error) => {
            console.error("Error al actualizar el pedido:");
            console.log(error);
          });
      }
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
        HandleChargePedidos: HandleChargePedidos,
        platosCalientes: platosCalientes,
        HandleActualizarPlatosCalientes: HandleActualizarPlatosCalientes,
        losPedidos: losPedidos,
        HandleActualizarPlatoCalienteEspeficico:HandleActualizarPlatoCalienteEspeficico,
        escuchaPedidos: escuchaPedidos,
        setEscuchaPedidos: setEscuchaPedidos,
        HandleAddPedido: HandleAddPedido,
        handleAddArticulo: handleAddArticulo,
        direcciones: direcciones,
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
