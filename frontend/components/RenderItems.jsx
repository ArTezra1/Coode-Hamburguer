import React, { useState, useEffect } from 'react';
import { getLanche } from '@/app/services/routes/LancheRoutes';
import { getCombo } from '@/app/services/routes/CombosRoutes';

const RenderItems = () => {
  const [lanches, setLanches] = useState([])
  const [combos, setCombos] = useState([])

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const respostaLanches = await getLanche()
        const respostaCombos = await getCombo()

        setLanches(respostaLanches)
        setCombos(respostaCombos)

      } catch (erro) {
        console.log(erro)
      }
    };

    buscarDados()
  }, [])

  if (lanches.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <section>
      <div className='flex xs:flex-col md:flex-row md:grid md:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-8' id='lanches'>
        {lanches.map((item) => (
          <div 
          key={item._id}
          className=''
          >
            <div className='w-[300px] h-[300px] bg-zinc-900 p-4 rounded-lg text-zinc-100'>
                <img src="/images/xbacon.jpeg" alt={item.nome} 
                className='w-full h-[180px] bg-zinc-800 text-center rounded-md'
                />
                <h1 className='text-center my-2 font-bold text-xl'>
                    {item.nome}
                </h1>

                <div className='flex justify-between'>
                    <div className='bg-yellow-600 px-2 py-1 flex gap-1 rounded-md font-semibold hover:scale-105 transition-all cursor-default shadow-sm shadow-yellow-600'>
                        <p>
                            R$
                        </p>
                        {item.preco_unitario.toFixed(2)}
                    </div>

                    <div className='px-2 py-1 border border-yellow-600 rounded-md shadow-sm shadow-yellow-600 cursor-pointer hover:scale-105 hover:bg-yellow-600 transition-all uppercase'>
                        <p>
                            Add ao carrinho
                        </p>
                    </div>
                </div>
            </div>
          </div> 
        ))}
      </div>

      <div className='flex xs:flex-col md:flex-row md:grid md:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-8' id='bebidas'>
        {combos.map((item) => (
          <div 
          key={item._id}
          className=''
          >
            <div className='w-[300px] h-[300px] bg-zinc-900 p-4 rounded-lg text-zinc-100'>
                <img src="/images/xbacon.jpeg" alt={item.nome} 
                className='w-full h-[180px] bg-zinc-800 text-center rounded-md'
                />
                <h1 className='text-center my-2 font-bold text-xl'>
                    {item.nome}
                </h1>

                <div className='flex justify-between'>
                    <div className='bg-yellow-600 px-2 py-1 flex gap-1 rounded-md font-semibold hover:scale-105 transition-all cursor-default shadow-sm shadow-yellow-600'>
                        <p>
                            R$
                        </p>
                        {item.preco_unitario.toFixed(2)}
                    </div>

                    <div className='px-2 py-1 border border-yellow-600 rounded-md shadow-sm shadow-yellow-600 cursor-pointer hover:scale-105 hover:bg-yellow-600 transition-all uppercase'>
                        <p>
                            Add ao carrinho
                        </p>
                    </div>
                </div>
            </div>
          </div> 
        ))}
      </div>
    </section>
  );
};

export default RenderItems;
