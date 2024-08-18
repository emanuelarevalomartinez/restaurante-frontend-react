import { useContext, useEffect, useState } from "react";
import { Modal } from "../../../../common";
import { Contexto } from "../../../../Contexto";
import { calcularMontoTotal } from "../Secundaria-Servicios";
import { Auth } from "../../../../Autentificacion/Auth";

export function Enviar() {
  const [open, setOpen] = useState(false);
  const [totalAPagar, settotalAPagar] = useState(0);

  const { escuchaPedidos, lenguajeEs } = useContext(Contexto);

  function cancelar() {
    setOpen(false);
  }

  function aceptar() {
    console.log("nooooo");

    setOpen(false);
  }

  useEffect(() => {
    const obtenerTotalAPagar = async () => {
      const auth = Auth();
      if (auth) {
        const totalObtenido = await calcularMontoTotal(auth.idUsuario);
        settotalAPagar(totalObtenido);
      }
    };
    obtenerTotalAPagar();
  }, [escuchaPedidos]);

  const formatearNumero = (numero: number) => {
    return new Intl.NumberFormat("en-US").format(numero);
  };

  return (
    <>
      <Modal isOpen={open} cancelar={cancelar} aceptar={aceptar}>
        <div className="w-full h-full justify-center items-center flex">
          {totalAPagar == 0 ? (
            <div>
                <p className="text-center text-3xl">
                   { lenguajeEs? "You do not have any products in your cart yet to perform this action." : "Aún no tiene productos en el carrito para ejecutar esta acción." } 
                </p>
            </div>
          ) : (
            <div>
              <p className="text-center text-3xl">
                { lenguajeEs? "Do you want to purchase the products you added to your cart ?" : "¿Desea comprar los productos que añadio al carrito?" }
              </p>
            </div>
          )}
        </div>
      </Modal>

      <div
        className={`bg-[#262837] w-full fixed bottom-0 left-auto text-center lg:bottom-0 lg:right-0 lg:left-auto lg:w-1/4 p-4 mx-auto`}
      >
        <div className="flex items-center justify-between mb-1 sm:mb-6">
          <span className="text-gray-400"> { lenguajeEs? "Total to pay" : "Total a pagar" } </span>
          <span className="text-gray-400">
            $ {formatearNumero(totalAPagar)}
          </span>
        </div>
        <div
          className="w-full bg-[#ec7c6a] py-0 sm:py-2 rounded-lg hover:text-white hover:bg-[#e02a0e]"
          onClick={() => {
            setOpen(true);
          }}
        >
          <button> { lenguajeEs?  "Pay" : "Pagar" } </button>
        </div>
      </div>
    </>
  );
}
