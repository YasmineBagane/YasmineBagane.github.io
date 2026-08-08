import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import {
  Code2,
  Briefcase,
  GraduationCap,
  FolderGit2,
  ExternalLink,
  Mail,
  FileText,
  X,
  ChevronRight,
  Loader2,
} from "lucide-react";
import darklogo from "../assets/dark-square.jpg";
import lightlogo from "../assets/light-square.png";
import resumePdf from "../assets/Resume_Yasmine_Bagane_2025.pdf";
import { projects } from "../data/projects";
import Nav from "../components/Nav";
import "../index.css";

// --- TypeScript Interfaces ---
interface SkillCategory {
  category: string;
  skills: { name: string; level?: string }[];
}

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category:
    | "All"
    | "Frontend"
    | "Full Stack"
    | "Mobile"
    | "Backend"
    | "Game Development";
  githubUrl: string;
  liveUrl?: string;
}

interface Education {
  id: string;
  title: string;
  school: string;
  period: string;
  description?: string[];
  skills?: string[];
}

interface Certifications {
  id: string;
  title: string;
  description: string;
  period: string;
  image: string;
  tags?: string[];
  liveUrl?: string;
}

// Custom GitHub Icon Component
const Github = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

// Custom LinkedIn Icon Component
const Linkedin = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript (ES6+)" },
      { name: "HTML5/CSS3" },
      { name: "SQL (Oracle PL/SQL)" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "NestJS" },
      { name: "Express.js" },
      { name: "ReactNative" },
    ],
  },
  {
    category: "Tools & Infrastructure",
    skills: [
      { name: "Git & GitHub" },
      { name: "Docker" },
      { name: "MongoDB" },
      { name: "REST APIs" },
      { name: "App Store & Google Play Deployment" },
    ],
  },
];

const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Software Engineer",
    company: "AiSoft Tech",
    period: "2025 - Present",
    description: [
      "Developing and maintaining full-stack web applications using Next.js and NestJS. Designing scalable backend services, implementing modern frontend interfaces, and collaborating across teams to deliver production-ready software.",
      // "Architected high-throughput microservices handling over 2M daily API queries using TypeScript and Node.js.",
      // "Led migration of legacy monolith to a Next.js serverless architecture, improving page load speeds by 42%.",
      // "Mentored junior engineers and established team-wide CI/CD pipeline automation practices.",
    ],
    technologies: ["Next.Js", "NestJS", "Typescript", "PostgreSQL", "Drupal"],
  },
  {
    id: "exp-2",
    role: "Assistant Lecturer",
    company: "EPI Sousse",
    period: "2024 - Present",
    description: [
      "Teaching undergraduate software engineering and computer science courses including Algorithms, Operating Systems, Web Development, Software Engineering, and Service-Oriented Architecture. Supervising final-year projects while mentoring students in software design, architecture, and professional development.",
      // "Built scalable e-commerce frontend components delivering pixel-perfect designs.",
      // "Optimized application bundle sizes, reducing initial asset weight by 35%.",
    ],
    technologies: ["Teaching", "Mentoring", "Software Architecture"],
  },
  {
    id: "exp-3",
    role: "Junior Software Engineer",
    company: "Educanet",
    period: "2023 - 2024",
    description: [
      "Developped cross-platform mobile applications from requirements gathering to deployment. Built REST API integrations, optimized application performance, coordinated development efforts, and managed releases for both Google Play and the Apple App Store.",
      // "Engineered interactive real-time dashboard components using React, Redux Toolkit, and WebSockets.",
      // "Designed RESTful and GraphQL APIs integrating modern caching strategies via Redis.",
      // "Collaborated closely with UX designers to craft responsive, accessible interfaces.",
    ],
    technologies: ["ReactNative", "Cordova", "RestAPIs", "Android", "iOS"],
  },
];

const EDUCATION: Education[] = [
  {
    id: "edu-1",
    title: "Master's Degree in Internet of Things & Smart Systems",
    school: "ENSI",
    period: "2021 - 2023",
  },
  {
    id: "edu-2",
    title: "Engineering Degree in Computer Software Engineering",
    school: "ENICarthage",
    period: "2018 - 2021",
  },
  {
    id: "edu-3",
    title: "Engineering Preparatory Studies",
    school: "IPEIM",
    period: "2016 - 2018",
  },
];

const CERTIFICATIONS: Certifications[] = [
  {
    id: "cert-1",
    title: "NVIDIA",
    description: "string",
    period: "string",
    image: "string",
    tags: ["string"],
    liveUrl: "string",
  },
];

export const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const navigate = useNavigate();
  const [projectFilter, setProjectFilter] = useState<string>("All");
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // --- Form & EmailJS States ---
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setStatusMessage({ type: null, text: "" });

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setIsSubmitting(false);
          setStatusMessage({
            type: "success",
            text: "Message sent successfully!",
          });
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setIsContactOpen(false), 2000);
        },
        (error) => {
          setIsSubmitting(false);
          setStatusMessage({
            type: "error",
            text: "Failed to send message. Please try again.",
          });
          console.error("EmailJS Error:", error);
        },
      );
  };

  const filteredProjects =
    projectFilter === "All"
      ? projects
      : projects.filter(
          (p) => p.category === projectFilter || p.tags.includes(projectFilter),
        );

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
        .projectCard:hover { cursor: pointer; background-color: var(--color-slate-800); }
      `}</style>

      {/* --- Header / Navigation --- */}
      <Nav />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
        {/* --- Section: About Me --- */}
        <section id="about" className="pt-8 scroll-mt-24">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                Software Engineer
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                From <span className="text-accent">Backend</span> to your{" "}
                <span className="text-accent">Pocket</span>.
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
                Software Engineer specializing in modern web and backend
                development, with experience designing scalable applications,
                REST APIs, and cross-platform mobile solutions. Passionate about
                clean architecture and building products that solve real
                business problems.
              </p>

              <div className="contactAboutMe max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-6 py-3 rounded-xl bg-accent text-white font-semibold shadow-lg hover:opacity-90 transition-all flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact Me</span>
                  </button>

                  <button
                    onClick={() => setIsResumeOpen(true)}
                    className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold transition-all border border-slate-300 dark:border-slate-700 flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4 text-accent" />
                    <span>Download Resume</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Brand Logo / Brand Picture Placeholder */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-2 shadow-2xl border border-slate-300 dark:border-slate-800 flex items-center justify-center group">
                <div className="w-full h-full rounded-2xl dark:bg-slate-950 flex flex-col items-center justify-center text-accent border border-accent/30 p-4 text-center">
                  <img
                    className="brandImg w-full h-full rounded-2xl"
                    src={darkMode ? darklogo : lightlogo}
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section: Expertise --- */}
        <section id="expertise" className="scroll-mt-24 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center space-x-3">
              <Code2 className="text-accent w-7 h-7" />
              <span>Expertise & Technologies</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Frameworks, languages, and tools I use to turn ideas into
              production-ready software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-accent/50 transition-colors"
              >
                <h3 className="text-xl font-bold mb-4 text-accent">
                  {cat.category}
                </h3>
                <ul className="space-y-3">
                  {cat.skills.map((skill, sj) => (
                    <li
                      key={sj}
                      className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <ChevronRight className="w-4 h-4 text-accent" />
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --- Section: Professional Experience --- */}
        <section id="experience" className="scroll-mt-24 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center space-x-3">
              <Briefcase className="text-accent w-7 h-7" />
              <span>Professional Experience</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              My recent career history and key technical contributions.
            </p>
          </div>

          <div className="space-y-6 relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 pl-6 md:ml-6 md:pl-8">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative group">
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-slate-50 dark:border-slate-950" />

                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {exp.role}
                      </h3>
                      <p className="text-accent font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                    {exp.description.map((item, idx) => (
                      // <li key={idx} className="leading-relaxed">
                      //   {item}
                      // </li>
                      <p key={idx} className="leading-relaxed">
                        {item}
                      </p>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech, tidx) => (
                      <span
                        key={tidx}
                        className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Section: Projects --- */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold flex items-center space-x-3">
                <FolderGit2 className="text-accent w-7 h-7" />
                <span>Featured Projects</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                A selection of recent personal and open-source applications.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {["All", "Frontend", "Backend", "Full Stack", "Other"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    projectFilter === cat
                      ? "bg-accent text-white"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  navigate(`/projects/${project.id}`);
                }}
                className="projectCard flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-accent/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-accent transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={`/projects/${project.id}`}
                        rel="noreferrer"
                        className="hover:text-accent transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-6">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Section: Education --- */}
        <section id="education" className="scroll-mt-24 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center space-x-3">
              <GraduationCap className="text-accent w-7 h-7" />
              <span>Education</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              My educational journey & diplomas.
            </p>
          </div>

          <div className="space-y-6 relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 pl-6 md:ml-6 md:pl-8">
            {EDUCATION.map((edu) => (
              <div key={edu.id} className="relative group">
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-slate-50 dark:border-slate-950" />

                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {edu.title}
                      </h3>
                      <p className="text-accent font-medium">{edu.school}</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 w-fit">
                      {edu.period}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-20 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Built by YBC © {new Date().getFullYear()}.
          </p>

          <div className="flex items-center space-x-6 text-slate-500 dark:text-slate-400">
            <a
              href="https://github.com/YasmineBagane"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/yasmine-bagane/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:yasmine.bagane@ensi-uma.tn"
              className="hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* --- Contact Modal Dialog --- */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => {
                setIsContactOpen(false);
                setStatusMessage({ type: null, text: "" });
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-accent">Get In Touch</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Send me a message and I will get back to you as soon as possible.
            </p>

            {/* Status Alert Message */}
            {statusMessage.type && (
              <div
                className={`p-3 rounded-lg text-sm font-medium ${
                  statusMessage.type === "success"
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <form
              ref={formRef}
              onSubmit={handleSendEmail}
              className="space-y-4 pt-2"
            >
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500">
                  Your Name
                </label>
                <textarea
                  rows={1}
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-accent"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="johndoe@example.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Hello..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-accent"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-accent text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- Resume Modal Dialog --- */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-4 text-center">
            <button
              onClick={() => setIsResumeOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
            <FileText className="w-12 h-12 text-accent mx-auto" />
            <h3 className="text-xl font-bold">Resume Download</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Click below to download the latest PDF copy of my technical
              resume.
            </p>
            <a
              href={resumePdf}
              onClick={() => {
                setIsResumeOpen(false);
                console.log("downloaded");
              }}
              download
              className="inline-block w-full py-2.5 rounded-xl bg-accent text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Download PDF Resume
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
