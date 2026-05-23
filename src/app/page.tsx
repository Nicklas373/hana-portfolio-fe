import Sidebar from "./components/layout/Sidebar";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Project from "./components/sections/Project";
import "./globals.css";

export default function Home() {
  return (
    <main className="text-slate-300 bg-black bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.30),transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(220,38,38,0.20),transparent_50%)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-16">
          <Sidebar />

          <div className="py-12 lg:py-8">
            <About />
            <Experience />
            <Project />
          </div>
        </div>
      </div>
    </main>
  );
}
