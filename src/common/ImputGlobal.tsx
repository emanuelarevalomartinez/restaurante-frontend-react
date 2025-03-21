interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
}

export function ImputGlobal({children,...props}:Props){
    return(
      <input 
      className="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 outline-none placeholder-white transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900"
      {...props}
      >
        {children}
        </input>
    )
}