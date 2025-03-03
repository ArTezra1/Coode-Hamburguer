import Main from "./components/Main";
import Aside from "./components/Aside";

import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export default function Home() {
  return (
    <section className={`flex w-screen h-screen bg-zinc-950 text-zinc-100 gap-2 ${poppins.className}`}>
      <div className="xs:hidden lg:block">
        <Aside></Aside>
      </div>
        <Main></Main>
    </section>
  );
}
