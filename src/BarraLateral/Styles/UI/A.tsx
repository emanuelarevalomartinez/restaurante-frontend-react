
interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
 selected:boolean;  
}

export function A({children,selected,...props}: Props){
    return (
        <a href="#" className={`p-4 flex justify-center rounded-xl transition-colors ${selected ? "bg-[#ec7c6a] text-white" : "text-[#ec7c6a] group-hover:text-white group-hover:bg-[#ec7c6a]"}`}
       
        {...props}
        >
            {children}
        </a>
    )
}
