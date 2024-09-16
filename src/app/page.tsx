import  CallToAction  from "@/sections/CallToAction";
import  Footer  from "@/sections/Footer";
import  Header  from "@/sections/Header";
import  Hero  from "@/sections/Hero";
import ProductShowcase  from "@/sections/ProductShowcase";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
   
      <ProductShowcase />
     
      <CallToAction />
      <Footer />
    </div>
  );
}