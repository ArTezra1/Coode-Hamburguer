import Main from "./components/Main";
import Header from "./components/Header";
import Aside from "./components/Aside";

export default function Home() {
  return (
    <section className="flex w-screen h-screen">
      <Aside></Aside>
      <div className="flex flex-col">
        <Header></Header>
        <Main></Main>
      </div>
    </section>
  );
}
