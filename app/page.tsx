import Banner from "@/components/banner";
import Contact from "@/components/contact";
import Faturamento from "@/components/faturamento";
import Fibonacci from "@/components/fibonacci";
import Inversao from "@/components/inversao";
import Nav from "@/components/nav";
import Soma from "@/components/soma";
import Valor from "@/components/valor";

export default function Home() {
  return (
    <div className="w-full h-full overflow-x-primary">
      <Nav />
      <Banner />
      <Soma />
      <Fibonacci />
      <Faturamento />
      <Valor />
      <Inversao />
      <Contact />
    </div>
  );
}
