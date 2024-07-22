import { useState } from "react";


interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    color:string;
}

export function LabelGlobal({children,color}: Props){

    const [asignacionColor] = useState(color);

    let colorAEstablecer:string = "";

     if( asignacionColor == "primary" ){
         colorAEstablecer= "white"
     } else if( asignacionColor == "asercaDe" ) {
        colorAEstablecer = "text-indigo-500"
     }


    return(
        <label className={`left-3 -top-6 bg-transparent text-sm leading-7 ${colorAEstablecer} transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500`}>
                  {children}
                </label>
    )
}