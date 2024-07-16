import { RiHome6Line, RiPieChartLine, RiMailLine, RiNotificationLine, RiSettings4Line, RiLogoutCircleRLine, RiEditLine } from 'react-icons/ri'
import { LI, A } from './Styles/UI'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Contexto } from '../Contexto';

interface Props{
    visivility:boolean;
}


export function BarraLateral({visivility}:Props) {

const { handleVerOcultarContenido,selectElementBarraLateral, handleChangeSelecionBarraLateral } = useContext(Contexto);

const navigate = useNavigate(); 

    return (
        <div className={`flex flex-col justify-between bg-[#1F1D2B] -left-full fixed top-0 w-28 h-full py-6 rounded-t-xl rounded-b-xl z-50 lg:left-0 ${ visivility? "left-0": "-left-full" }`}>
            <div>
                <ul className='pl-4'>

                    <li>
                        <h1 className="text-2xl text-gray-300 uppercase font-bold text-center my-5">
                            Logo
                        </h1>
                    </li>

                    <LI selected={selectElementBarraLateral[0].seleccionado}
                    >
                        <A selected={ selectElementBarraLateral[0].seleccionado}
                        onClick={()=> {
                            handleVerOcultarContenido(false);
                            navigate("/");
                            handleChangeSelecionBarraLateral("home");
                        }}>
                            <RiHome6Line className="text-2xl"/>
                        </A>
                    </LI>

                    <LI selected={ selectElementBarraLateral[1].seleccionado }
                    >
                        <A selected={ selectElementBarraLateral[1].seleccionado } 
                        onClick={()=> {
                            handleVerOcultarContenido(true);
                            navigate("/RechasoEditarProductos");
                            handleChangeSelecionBarraLateral("editar");
                            // editar
                        }}>
                            <RiEditLine className="text-2xl"/>
                        </A>
                    </LI>

                    <LI selected={ selectElementBarraLateral[2].seleccionado }
                    >
                        <A selected={ selectElementBarraLateral[2].seleccionado }
                        onClick={()=> {
                            handleVerOcultarContenido(true);
                            navigate("/Cargando");
                            handleChangeSelecionBarraLateral("carrito");
                            // carrito
                        }}>
                            <RiPieChartLine className="text-2xl"/>
                        </A>
                    </LI>

                    <LI selected={ selectElementBarraLateral[3].seleccionado }
                    >
                        <A  selected={ selectElementBarraLateral[3].seleccionado }
                        onClick={()=> {
                            handleVerOcultarContenido(true);
                            navigate('/AcercaDe');
                            handleChangeSelecionBarraLateral("acercaDe");
                            // acerca de
                        }}
                        >
                            <RiMailLine className="text-2xl" 
                            />
                        </A>
                    </LI>

                    <LI selected={ selectElementBarraLateral[4].seleccionado }
                    >
                        <A selected={ selectElementBarraLateral[4].seleccionado } 
                        onClick={ ()=> {
                            handleVerOcultarContenido(true);
                            navigate("Notificaciones");
                            handleChangeSelecionBarraLateral("notificaciones");
                            //notificaciones
                          } }>
                            <RiNotificationLine className="text-2xl"/>
                        </A>
                    </LI>

                    <LI selected={ selectElementBarraLateral[5].seleccionado }
                    >
                        <A selected={ selectElementBarraLateral[5].seleccionado } 
                        onClick={()=> {
                            handleVerOcultarContenido(true);
                            navigate("/Cargando");
                            handleChangeSelecionBarraLateral("configuracion");
                            // ajustes
                        }}>
                            <RiSettings4Line className="text-2xl"/>
                        </A>
                    </LI>
                </ul>
            </div>

            <div>
                <ul className='pl-4'>
                    <LI selected={ selectElementBarraLateral[6].seleccionado }
                    >
                        <A selected={ selectElementBarraLateral[6].seleccionado }
                        onClick={ ()=> {
                             alert("¿ Esta seguro de que desea salir ?")
                             handleChangeSelecionBarraLateral("salir");
                        }}>
                            <RiLogoutCircleRLine className="text-2xl"/>
                        </A>
                    </LI>
                </ul>
            </div>
        </div>
    )
}