import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { Sun, Moon } from "lucide-react";
import darklogo from "../assets/dark-square.jpg";
import lightlogo from "../assets/light-square.png";
import "../index.css";
import Nav from "../components/Nav";

function ProjectDetail() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  // Sync dark class on <html> root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  if (!project) return <div>Project not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Dynamic Accent Color Styles injection for exact hex values */}
      <style>{`
        :root {
          --brand-accent: ${darkMode ? "#FF014F" : "#FF014F"};
        }
        .text-accent { color: var(--brand-accent); }
        .bg-accent { background-color: var(--brand-accent); }
        .border-accent { border-color: var(--brand-accent); }
        .focus-accent:focus { outline-color: var(--brand-accent); }
      `}</style>

      {/* --- Header / Navigation --- */}
      <Nav />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <Link to="/#projects" className="text-pink-500 text-sm">
            ← Back to projects
          </Link>
          <h1 className="text-4xl font-bold text-white mt-4">{project.name}</h1>
          <p className="text-slate-400 mt-4">{project.summary}</p>

          <h2 className="text-xl font-semibold text-white mt-8">Your Role</h2>
          <p className="text-slate-400">{project.role}</p>

          <h2 className="text-xl font-semibold text-white mt-8">
            Main Challenge
          </h2>
          <p className="text-slate-400">{project.challenge}</p>

          <div className="flex gap-3 mt-8">
            {project.demoUrl && (
              <a href={project.demoUrl} className="text-pink-500">
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} className="text-pink-500">
                GitHub
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectDetail;
