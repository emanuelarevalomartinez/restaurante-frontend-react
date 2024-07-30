import {  Route, Routes } from 'react-router-dom'
import { Cabecera } from '../Cabecera'
import { Parrilla, PlatosCalientes, PlatosFrios, Sopa } from './PaginasVistaPrincipal/'
import { BarraDeNavegacion } from '../BaarraDeNavegacion'
import { AcercaDe } from '../AcercaDe/AceraDe'
import { useContext } from 'react'
import { Contexto } from '../Contexto'
import { Notificaciones } from '../Notificaciones/Notificaciones'
import { EditarProductos, RechasoEditarProductos } from '../EditarProductos'
import { Configuracion } from '../Configuracion'
import { Ordenes } from '../Ordenes'
import { Cargando } from '../common'

export function VistaPrincipal() {

const { verOcultarRestoDeSeccion } = useContext(Contexto);

    return (
        <main className={`${verOcultarRestoDeSeccion? "col-span-8" : "col-span-6"}`}>
            <div className={`lg:w-${verOcultarRestoDeSeccion? "full" : "2/3"} fixed bg-[#1F1D3B] w-full left-auto lg:left-28 lg:w-2/3 xl:w-[70vw]`}>

                <div className={`bg-[#1F1D3B] w-${verOcultarRestoDeSeccion? "screen" : "auto"}`}>
                    <Cabecera />
                </div>
                    <BarraDeNavegacion/>
            </div>
                <nav className={`lg:pl-28 mx-0 ${verOcultarRestoDeSeccion? "md:mt-20 mt-36" : "md:mt-48 mb-20 mt-60"}`}>
                    <Routes>
                        <Route path='/' element={<PlatosCalientes />} />
                        <Route path='/PlatosFrios' element={<PlatosFrios />} />
                        <Route path='/Sopas' element={<Sopa />} />
                        <Route path='/Parrilladas' element={<Parrilla />} />
                        <Route path='/AcercaDe' element={<AcercaDe />} />
                        <Route path='/Notificaciones' element={<Notificaciones />} />
                        <Route path='/EditarProductos' element={<EditarProductos />} />
                        <Route path='/RechasoEditarProductos' element={<RechasoEditarProductos />} />
                        <Route path='/Ordenes' element={<Ordenes />} />
                        <Route path='/Configuracion' element={<Configuracion />} />
                        <Route path='/Cargando' element={<Cargando />} />
                    </Routes>
                </nav>
            <div className='lg:pl-28'>
            </div>

        </main>
    )
}