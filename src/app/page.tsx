import CoffeeScroll from "@/components/CoffeeScroll";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <main className="min-h-screen bg-homie-green relative selection:bg-white/30">
      <Navbar />
      <CoffeeScroll />
      <AboutSection />
      <Marquee />
      <div id="shop" className="relative z-10 bg-white">
        <ProductGrid />
      </div>
      <Footer />
    </main>
  );
}
