import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import "../index.css";

function Nav() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-3 group">
          {/* <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent flex items-center justify-center font-bold text-accent text-lg">
              <img
                className="brandlogo w-9 h-9 rounded-xl"
                src={darkMode ? darklogo : lightlogo}
              />
            </div> */}
          <span className="font-bold text-lg tracking-tight group-hover:text-accent transition-colors">
            YB<span className="text-accent">Creations</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="/#about" className="hover:text-accent transition-colors">
            About
          </a>
          <a href="/#expertise" className="hover:text-accent transition-colors">
            Expertise
          </a>
          <a
            href="/#experience"
            className="hover:text-accent transition-colors"
          >
            Experience
          </a>
          <a href="/#projects" className="hover:text-accent transition-colors">
            Projects
          </a>
          <a href="/#education" className="hover:text-accent transition-colors">
            Education
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent transition-colors border border-slate-200 dark:border-slate-700"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
