import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import "../index.css";
import Nav from "../components/Nav";
import ProjectMedia from "../components/ProjectMedia";

function ProjectDetail() {
  const [darkMode, setDarkMode] = useState<boolean>(
    () => localStorage.getItem("mode") !== "light",
  );
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  // --- Dark/Light Mode ---
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("mode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("mode", "light");
    }
  }, [darkMode]);

  if (!project)
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans">
        {/* Dynamic Accent Color Styles injection for exact hex values */}
        <style>{`
        .text-accent { color: var(--brand-accent); }
        .bg-accent { background-color: var(--brand-accent); }
        .border-accent { border-color: var(--brand-accent); }
        .focus-accent:focus { outline-color: var(--brand-accent); }
      `}</style>

        {/* --- Header / Navigation --- */}
        <Nav darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
          <div>Project not found.</div>
        </main>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Dynamic Accent Color Styles injection for exact hex values */}
      <style>{`
        .text-accent { color: var(--brand-accent); }
        .bg-accent { background-color: var(--brand-accent); }
        .border-accent { border-color: var(--brand-accent); }
        .focus-accent:focus { outline-color: var(--brand-accent); }
      `}</style>

      {/* --- Header / Navigation --- */}
      <Nav darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/#" className="font-semibold text-accent text-sm">
            ← Back to main page
          </Link>
          <div
            className="flex mt-4"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <h1 className="text-4xl font-bold dark:text-white text-accent">
              {project.name}
            </h1>
            <p className="flex-end font-semibold text-accent">{project.year}</p>
          </div>

          {project.details.map((detail, index) => (
            <p key={index} className="dark:text-slate-200 text-slate-700 mt-4">
              {detail}
            </p>
          ))}

          {project.details.map((detail, index) => (
            <p key={index} className="dark:text-slate-200 text-slate-700 mt-4">
              {detail}
            </p>
          ))}

          <p
            className="text-xl font-semibold text-accent mt-8"
            style={{ wordSpacing: "4px", fontVariant: "all-petite-caps" }}
          >
            {project.tech}
          </p>

          <ProjectMedia
            screenshots={project.screenshots}
            videoUrl={project.videoUrl}
          />

          <h2 className="text-xl font-semibold dark:text-white text-slate-800 mt-8">
            My Role
          </h2>
          <p className="dark:text-slate-200 text-slate-700">
            {project.mainrole}
          </p>
          {project.detailedrole.map((detail, index) => (
            <p
              key={index}
              className="dark:text-slate-200 text-slate-700 ml-10 mr-6 mt-2"
            >
              {detail}
            </p>
          ))}

          <h2 className="text-xl font-semibold dark:text-white text-slate-800 mt-8">
            Main Challenge
          </h2>
          <p className="dark:text-slate-200 text-slate-700">
            {project.challenge}
          </p>

          <div className="flex gap-3 mt-8">
            {project.isDemo ? (
              project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  aria-label="Live Demo"
                  className="flex items-center justify-center font-semibold text-accent dark:bg-slate-800 hover:dark:bg-slate-700 bg-slate-200 hover:bg-slate-300"
                  style={{
                    width: "130px",
                    height: "34px",
                    borderRadius: "10px",
                  }}
                >
                  Live Demo →
                </a>
              )
            ) : (
              <></>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                aria-label="GitHub Repository"
                className="flex items-center justify-center font-semibold text-accent dark:bg-slate-800 hover:dark:bg-slate-700 bg-slate-200 hover:bg-slate-300"
                style={{
                  width: "160px",
                  height: "34px",
                  borderRadius: "10px",
                }}
              >
                View on Github →
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectDetail;
