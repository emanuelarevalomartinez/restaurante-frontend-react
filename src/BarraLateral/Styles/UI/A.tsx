
interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
 selected:boolean;  
}

export function A({children,selected,...props}: Props){
    return (
        <a href="#" className={ `${selected? "p-4 flex justify-center rounded-xl bg-[#ec7c6a] text-white transition-colors group-hover:text-white group-hover:bg-[#ec7c6a]": "p-4 flex justify-center rounded-xl text-[#ec7c6a] transition-colors group-hover:text-white group-hover:bg-[#ec7c6a]"}` }
       
        {...props}
        >
            {children}
        </a>
    )
}