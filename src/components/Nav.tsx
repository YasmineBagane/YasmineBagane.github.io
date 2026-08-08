import { Sun, Moon } from "lucide-react";
import "../index.css";

interface NavProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Nav({ darkMode, setDarkMode }: NavProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-3 group">
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
            onClick={() => setDarkMode((prev) => !prev)}
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
}

export default Nav;
