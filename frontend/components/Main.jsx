"use client";
import React, { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { ScrollArea } from "./ui/scroll-area";
import RenderItems from "./RenderItems";
import useProdutos from "../app/hooks/PegarMercadorias.jsx";

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
            Está com fome ou com sede? Veja o nosso catálogo e peça algum lanche, bebida ou os <strong className="text-zinc-300">dois</strong> com os nossos combos de sua preferencia. Claro, não apenas isso, veja também o resto do nosso catálogo apenas rolando para baixo!
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-10">

          <RenderItems
            titulo={"Lanches"}
            produtos={useProdutos().produtos.lanches}
            id={"lanches"}
            descricao={"Veja todos os nossos lanches disponíveis para você!"}
          >
          </RenderItems>

          <RenderItems
            titulo={"Combos"}
            produtos={useProdutos().produtos.combos}
            id={"combos"}
            descricao={"Em busca de combos para você e seus amigos? Veja os nossos combos disponíveis!"}
          >
          </RenderItems>

          <RenderItems
            titulo={"Bebidas"}
            produtos={useProdutos().produtos.bebidas}
            id={"bebidas"}
            descricao={"Está com sede? Veja as nossas bebidas disponíveis para você!"}
          >
          </RenderItems>

          <RenderItems
            titulo={"Bebidas Alcoólicas"}
            produtos={useProdutos().produtos.bebidasAlcool}
            id={"alcool"}
            descricao={"Claro que não pode faltar também as doses e cervejas para passar o tempo!"}
          >
          </RenderItems>
        </div>
      </ScrollArea>


    </main>
  );
};

export default Main;
