"use client";
import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";

const Main = () => {
  return (
    <main className="bg-zinc-950 w-full h-full flex flex-col items-center">
      <Header></Header>

      <NavBar></NavBar>

      <div className="flex flex-col items-center w-[75%]">
        <h3 className="m-4 font-semibold text-xl">
          Lanches
        </h3>
        <p className="text-zinc-400 text-sm text-center leading-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet tempora modi corporis ratione iusto obcaecati laboriosam assumenda dolor aut earum reprehenderit sit nemo exercitationem harum enim voluptates expedita, dolorem aliquam!
        </p>
      </div>
      <div className="">

      </div>
    </main>
  );
};

export default Main;
