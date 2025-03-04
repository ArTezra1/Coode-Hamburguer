"use client"

import { X } from "lucide-react";
import { useState } from "react";

const RenderItems = ({ titulo, produtos, id }) => {
  const [isOpen, setIsOpen] = useState(false)

  function abrirInfo(){
    setIsOpen(!isOpen)
  }

  return (
    <section className="flex flex-col items-center my-8" id={id}>
      <h2 className="text-xl font-semibold mb-4">{titulo}</h2>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <div key={produto._id} className="w-[300px] h-[300px] bg-zinc-900 p-4 rounded-lg text-zinc-100 relative">
              <img src={produto.imagem} alt={produto.nome} className="w-full h-[180px] bg-zinc-800 object-cover rounded-md" />
              <div className="flex items-center justify-center">
                <h3 className="my-2 font-semibold text-center text-xl">{produto.nome}</h3>
                {produto.items && produto.items.length >= 1 && (
                  <div className="p-2 bg-zinc-300 rounded-full w-6 h-6 flex justify-center items-center border border-zinc-950 cursor-pointer right-4 absolute">
                    <p className="text-zinc-950" onClick={abrirInfo}>i</p>
                    {
                      isOpen &&(
                    <div className="p-2 bg-zinc-800 absolute w-[275px] -right-1 top-0 rounded-lg cursor-default">
                      <p className="absolute right-2" onClick={abrirInfo}>
                        <X className="cursor-pointer hover:scale-105 transition-all"></X>  
                      </p>
                      {
                        produto.items.map((item, index)=>(
                          <p
                          key={index}
                          className="bg-zinc-900 px-4 my-1 w-[200px] rounded-sm border-zinc-950 border-b"
                          >
                            {index + 1}° - {item}
                          </p>
                        ))
                      }
                    </div>
                      )
                    }
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <div className="bg-yellow-700 px-2 py-1 rounded-md hover:scale-105 transition-all cursor-default shadow-sm shadow-yellow-900">
                  <p className="text-md font-bold text-white">R$ {produto.preco_unitario.toFixed(2)}</p>
                </div>

                <div className='px-2 py-1 border border-yellow-700 rounded-md shadow-sm shadow-yellow-900 cursor-pointer hover:scale-105 hover:bg-yellow-700 transition-all uppercase'>
                  <p>
                    Add ao carrinho
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum produto disponível.</p>
        )}
      </div>
    </section>
  );
};

export default RenderItems;
