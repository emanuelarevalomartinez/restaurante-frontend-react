import { Contexto } from './Contexto'
import { BarraLateral } from './BarraLateral'
import { MenuVistaMovil } from './BarraInferior'
import { useContext } from 'react'
import { Secundaria, VistaPrincipal } from './VistaPrincipal'
import { Autentificacion } from './Autentificacion/Autentificacion'

function App() {

const { barraLateralVisivilidad } = useContext(Contexto);
const { HandlevisibilidadBarraLateral } = useContext(Contexto);
const { mostrarVistaSecundaria } = useContext(Contexto);
const { HandleHacerVisibleSecundaria } = useContext(Contexto);

const { acceso } = useContext(Contexto);

  return (
   <>
   {acceso?  <div className='bg-[#262837] w-full min-h-screen grid grid-cols-2 lg:grid lg:grid-cols-8 '>
         
         <VistaPrincipal/>
  
        <BarraLateral visivility={barraLateralVisivilidad}/>
  
         <MenuVistaMovil 
         visivilityLateralBar={barraLateralVisivilidad} 
         changeVisivilityLateralBar={HandlevisibilidadBarraLateral}
         changeVisilitySecundaria={HandleHacerVisibleSecundaria}
         />
  
         <Secundaria visivility={mostrarVistaSecundaria} 
         changeVisilitySecundaria={HandleHacerVisibleSecundaria}
         />
      </div> : <div>
        <Autentificacion/>
      </div>  }
   </>
  )
}

export default App
