

interface Props extends React.LiHTMLAttributes<HTMLLIElement> { 
    selected:boolean;
}


export function LI({ children,selected, ...props }: Props) {
    return (
        <li className={`p-4 rounded-tl-xl rounded-bl-xl group transition-colors ${selected ? "bg-[#262837]" : "hover:bg-[#262837]"}`}
            {...props}
        >
            {children}
            {selected}
        </li>
    )
}
