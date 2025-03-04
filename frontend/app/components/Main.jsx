"use client";
import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { ScrollArea } from "./ui/scroll-area";
import RenderItems from "./RenderItems";
import useProdutos from "../hooks/PegarMercadorias.jsx";

const Main = () => {
  return (
    <main className="bg-zinc-950 w-full h-full flex flex-col items-center">
      <ScrollArea className="w-full h-full flex flex-col justify-center items-center pb-4">
      <Header></Header>
      <div className="flex items-center justify-center">
        <NavBar></NavBar>
      </div>

      <div className="flex flex-col items-center justify-center w-[100%]">
        <h3 className="m-4 font-semibold text-2xl">
          Catálogo
        </h3>
        <p className="text-zinc-400 text-sm text-center leading-4 w-[75%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet tempora modi corporis ratione iusto obcaecati laboriosam assumenda dolor aut earum reprehenderit sit nemo exercitationem harum enim voluptates expedita, dolorem aliquam!
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <RenderItems
        titulo={"Lanches"}
        produtos={useProdutos().produtos.lanches}
        id={"lanches"}
        >
        </RenderItems>

        <RenderItems
        titulo={"Combos"}
        produtos={useProdutos().produtos.combos}
        id={"combos"}
        >
        </RenderItems>

        <RenderItems
        titulo={"Bebidas"}
        produtos={useProdutos().produtos.bebidas}
        id={"bebidas"}
        >
        </RenderItems>

        <RenderItems
        titulo={"Bebidas Alcoólicas"}
        produtos={useProdutos().produtos.bebidasAlcool}
        id={"alcool"}
        >
        </RenderItems>
      </div>
      </ScrollArea>


    </main>
  );
};

export default Main;
