

interface Props extends React.HTMLAttributes<HTMLImageElement> {
    src: string;
}

export function ImagenPlato({ children, src }: Props) {
    return (
        <img src={src} alt="It's not posibble to se the picture"
            className="w-40 h-32 object-cover -mt-20 rounded-full"
        >
            {children}
        </img>
    )
}