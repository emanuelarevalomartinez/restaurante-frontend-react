import { useState, useEffect } from 'react';

interface Props {
    palabra:string;
    tiempoEspera: number;
}

export function PalabraCambiarColor({ palabra,tiempoEspera }: Props) {
    const [color, setColor] = useState('text-red-500');

    useEffect(() => {
        const timer = setInterval(() => {
            setColor(color === 'text-red-500' ? 'text-blue-500' : 'text-red-500');
        }, tiempoEspera);

        return () => clearInterval(timer);
    }, [color, tiempoEspera]);

    return (
        <span className={`${color} transition-all text-blue-500 text-xl sm:text-xl h-full row-span-2  text-start md:text-center`}>
            {palabra}
        </span>
    )
}
