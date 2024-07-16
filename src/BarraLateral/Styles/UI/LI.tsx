

interface Props extends React.LiHTMLAttributes<HTMLLIElement> { 
    selected:boolean;
}


export function LI({ children,selected, ...props }: Props) {
    return (
        <li className={ `${selected? "p-4 rounded-tl-xl rounded-bl-xl group transition-colors bg-[#262837]": "p-4 rounded-tl-xl rounded-bl-xl group transition-colors hover:bg-[#262837]" }` }
            {...props}
        >
            {children}
            {selected}
        </li>
    )
}