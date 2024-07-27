import { Contexto } from './Contexto'
import { BarraLateral } from './BarraLateral'
import { MenuVistaMovil } from './BarraInferior'
import { useContext } from 'react'
import { Secundaria, VistaPrincipal } from './VistaPrincipal'
import { Autentificacion } from './Autentificacion/Autentificacion'

function App() {

const { barraLateralVisivilidad,HandlevisibilidadBarraLateral,mostrarVistaSecundaria,HandleHacerVisibleSecundaria } = useContext(Contexto);

const { acceso } = useContext(Contexto);

   if(!acceso){
   return(
    <>
     <Autentificacion/>
    </>
   );
   }

  return (
   <>
   <div className='bg-[#262837] w-full min-h-screen grid grid-cols-2 lg:grid lg:grid-cols-8 '>
         
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
      </div> 
   </>
  )
}

export default App
