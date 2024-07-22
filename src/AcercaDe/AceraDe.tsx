
import { FacebookIcon, InstagramIcon, TwitterIcon } from ".";
import { ImputGlobal, LabelGlobal } from "../common";


export function AcercaDe() {

  return (
    <section className="bg-[#262837] text-gray-400">
      <div className="mx-auto px-5 py-24">
        <div className="mb-12 flex w-full flex-col text-center">
          <h1 className="title-font mb-4 text-2xl font-medium text-white sm:text-3xl">
            Contactame
          </h1>
          <p className="mx-auto text-base leading-relaxed lg:w-2/3">
            Hola soy un desarrollador en crecimiento por lo que cualquier
            comentario que quieras dejarme sobre esta página sera bien recibido.
          </p>
        </div>

        <div className="mx-auto md:w-2/3 lg:w-1/2">
          <div className="-m-2  w-full">
            <div className=" m-2 px-2">
            <div className="inline-block w-full sm:w-1/2 sm:pr-2">
              <div>
                <LabelGlobal color="asercaDe">
                  Nombre
                </LabelGlobal>
                <ImputGlobal type="text" id="name" name="name"/>
              </div>
            </div>
            <div className="inline-block w-full sm:w-1/2 sm:pl-2">
              <div>
                <LabelGlobal color="asercaDe">
                  Correo
                </LabelGlobal>
                <ImputGlobal type="text" id="email" name="email"/>
              </div>
            </div>
            <div>
              <div>
                <LabelGlobal color="asercaDe">
                  Mensaje
                </LabelGlobal>
                <textarea
                  id="message"
                  name="message"
                  className='peer h-32 w-full resize-none rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-6 text-gray-100  outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 placeholder-transparent'
                  placeholder="Mensaje"
                ></textarea>
              </div>
            </div>
            </div>
           
          
            <div className="w-full p-2">
              <button className="mx-auto flex rounded border-0 bg-indigo-500 py-2 px-8 text-lg text-white hover:bg-indigo-600 focus:outline-none"
              onClick={()=> {
                alert("Gracias por envia su comentario");
              }}
              >
                Enviar
              </button>
            </div>

            <div className="mt-8 w-full border-t border-gray-800 p-2 pt-8 text-center">
              <a className="text-indigo-400">
                emanuelarevalomartinez@gmail.com
              </a>
              <p className="my-5 leading-normal">
                Roberto Reyes Calle #16, Entre 1ra y Manuel del Socorro.
                <br />
                Bayamo, Granma, Cuba.
              </p>
              <span className="inline-flex">
                 <FacebookIcon/>
                 <TwitterIcon/>
                 <InstagramIcon/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
