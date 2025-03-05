import Landing from "./pages/Home";

import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export default function Home() {
  return (
    <section className={`${poppins.className}`}>
      <Landing></Landing>
    </section>
  );
}
