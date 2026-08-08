import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import darklogo from "../assets/dark-square.jpg";
import lightlogo from "../assets/light-square.png";
import "../index.css";
import Nav from "../components/Nav";

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

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
        <Nav />

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
      <Nav />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/#projects" className="font-semibold text-accent text-sm">
            ← Back to projects
          </Link>
          <div
            className="flex mt-4"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <h1 className="text-4xl font-bold text-white">{project.name}</h1>
            <p className="flex-end font-semibold text-accent">{project.year}</p>
          </div>

          {project.details.map((detail, index) => (
            <p key={index} className="text-slate-200 mt-4">
              {detail}
            </p>
          ))}

          <p
            className="text-xl font-semibold text-accent mt-8"
            style={{ wordSpacing: "4px", fontVariant: "all-petite-caps" }}
          >
            {project.tech}
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">My Role</h2>
          <p className="text-slate-200">{project.mainrole}</p>
          {project.detailedrole.map((detail, index) => (
            <p key={index} className="text-slate-200 ml-10 mr-6 mt-2">
              {detail}
            </p>
          ))}

          <h2 className="text-xl font-semibold text-white mt-8">
            Main Challenge
          </h2>
          <p className="text-slate-200">{project.challenge}</p>

          <div className="flex gap-3 mt-8">
            {project.isDemo ? (
              project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  aria-label="Live Demo"
                  className="font-semibold text-accent"
                  style={{
                    width: "130px",
                    height: "34px",
                    borderRadius: "10px",
                    background: "var(--color-slate-800)",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
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
                className="font-semibold text-accent"
                style={{
                  width: "160px",
                  height: "34px",
                  borderRadius: "10px",
                  background: "var(--color-slate-800)",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
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
