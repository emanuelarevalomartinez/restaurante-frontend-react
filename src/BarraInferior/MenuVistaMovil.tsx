
import { RiMenu3Fill, RiUser3Line, RiAddLine, RiPieChartLine, RiCloseLine } from 'react-icons/ri'

interface Props{
  visivilityLateralBar: boolean;
  changeVisivilityLateralBar: ()=> void;
  changeVisilitySecundaria: ()=> void;
}

export function MenuVistaMovil({ visivilityLateralBar,changeVisivilityLateralBar,changeVisilitySecundaria}:Props){


    return (
        <nav className={`flex justify-between items-center px-4 py-4 bg-[#1F1D2B] fixed w-full bottom-0 lg:hidden rounded-tl-xl rounded-tr-xl text-gray-400 `}>
        <button className='p-2'>
          <RiUser3Line/>
         </button>
        <button className='p-2'>
          <RiAddLine/>
         </button>
        <button className='p-2'
        onClick={ ()=> { changeVisilitySecundaria();
         } }
        >
          <RiPieChartLine/>
         </button>
        <button className='text-white p-2'
          onClick={ ()=> { changeVisivilityLateralBar();
          
           } }
        >
          { visivilityLateralBar? <RiCloseLine/> : <RiMenu3Fill/> }
         </button>
      </nav>
    )
}