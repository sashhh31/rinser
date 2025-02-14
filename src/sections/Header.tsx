"use client"
import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/logosaas.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import { useRouter } from 'next/navigation'

 const Header = () => {
  const router = useRouter()
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
      <p className="text-white/60 hidden md:block">Fill Your Images With AI&apos;s Magic</p>
      <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          <ArrowRight  onClick={() => router.push("/sign-in")} className="h-4 w-4 inline-flex justify-center items-center" />
        </div>
      </div>

      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Saas logo" height={40} width={40} />
            <MenuIcon className="h-5 w-5 md:hidden" />
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="">About</a>
              <a href="">Features</a>
              <a href="">Coustmers</a>
              <a href="">Updates</a>
              <a href="">Help</a>
              <button onClick={() => router.push("/sign-in")} className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;