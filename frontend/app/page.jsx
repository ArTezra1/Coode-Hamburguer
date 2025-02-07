import Main from "../components/Main";
import Header from "../components/Header";
import Aside from "../components/Aside";

export default function Home() {
  return (
    <section className="flex w-screen h-screen bg-zinc-950 text-zinc-100 gap-2">
      <div className="xs:hidden lg:block">
        <Aside></Aside>
      </div>
        <Main></Main>
    </section>
  );
}
