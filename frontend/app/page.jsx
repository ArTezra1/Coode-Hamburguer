import Main from "./components/Main";
import Header from "./components/Header";
import Aside from "./components/Aside";

export default function Home() {
  return (
    <section className="flex w-screen h-screen bg-zinc-950 text-zinc-100 gap-2">
      <div className="">
        <Aside></Aside>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <Header></Header>
        <Main></Main>
      </div>
    </section>
  );
}
