import Banner from "@/components/banner";
import Contact from "@/components/contact";
import Nav from "@/components/nav";

export default function Home() {
  return (
    <div className="w-full h-full overflow-x-primary">
      <Nav />
      <Banner />

      <Contact />
    </div>
  );
}
