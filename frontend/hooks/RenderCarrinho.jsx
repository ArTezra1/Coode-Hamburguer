import { useState } from "react";
import { useCarrinho } from "@/contexts/CarrinhoContext";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ShoppingCartIcon } from "lucide-react";
import { createPortal } from "react-dom";
import Carrinho from "@/components/public/Carrinho";

const RenderItens = () => {
    const { itens } = useCarrinho()

    const [isOpenCart, setOpenCart] = useState(false)

    function openCart() {
        setOpenCart(!isOpenCart)
    }

    return (
        <section className='bg-zinc-800 w-full h-full flex flex-col items-center' onClick={openCart}>
            <h2 className='mt-2 text-center pb-2'>
                Carrinho
            </h2>

                <div className='flex flex-col items-center justify-center w-full h-full'>
            <ScrollArea className="h-80 w-full">
                    {
                        itens.length > 0 ? (
                            itens.map((item, index) => (
                                <div className='mt-4 w-[90%] bg-zinc-900 h-16 rounded-md flex gap-2 pr-2 lg:pl-2 xl:pl-0'
                                    key={index}
                                >
                                    <img src={item.img}
                                        className='xl:w-[25%] lg:hidden xl:block h-full rounded-md '
                                    />

                                    <div className='flex flex-col xl:w-[50%] lg:w-[75%]'>
                                        <h3>
                                            {item.nome}
                                        </h3>
                                        <p className='text-xs text-zinc-400'>
                                            {
                                                item.desc
                                            }
                                        </p>
                                    </div>
                                    <div className='flex flex-col items-center justify-start mt-1'>
                                        <p className='text-sm'>
                                            Preço:
                                        </p>
                                        <p className='text-xs'>
                                            R${item.preco_unitario.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            )
                            )) : (
                            <div className='flex flex-col items-center gap-2'>
                                <p className='text-zinc-400 text-sm'>
                                    Sem itens no carrinho
                                </p>
                                <ShoppingCartIcon className='text-zinc-500 w-10 h-10'></ShoppingCartIcon>
                            </div>
                        )
                    }
            </ScrollArea>
                </div>

            {
                isOpenCart &&
                createPortal(
                    <div className="fixed top-0 left-0 z-50">
                        <Carrinho onClose={() => setOpenCart(false)} />
                    </div>,
                    document.body
                )
            }
        </section>
    )
}

export default RenderItens