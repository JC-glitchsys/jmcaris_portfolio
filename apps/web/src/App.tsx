import { useState } from "react";

import GridBackground from "@/components/layout/GridBackground";
import Header from "@/components/layout/Header";
import AboutMe from "@/components/sections/AboutMe";
import Contact from "@/components/sections/Contact";
import Creative from "@/components/sections/Creative";
import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import ThingsImBuilding from "@/components/sections/ThingsImBuilding";
import Tools from "@/components/sections/Tools";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      id="home"
      className={`portfolio-root relative min-h-screen font-sans transition-colors duration-300 selection:bg-sky-200 selection:text-[#343a40] ${
        isDarkMode ? "portfolio-dark bg-slate-950 text-slate-100" : "bg-white text-slate-800"
      }`}
    >
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Header isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode((dark) => !dark)} />

        <main>
          <Hero />
          <Tools />
          <ThingsImBuilding />
          <AboutMe />
          <Testimonials />
          <Creative />
        </main>

        <Contact />
      </div>
    </div>
  );
}