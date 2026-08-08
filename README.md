# Yasmine Bagane — Portfolio Website

Personal portfolio website showcasing my experience as a Software Engineer, built with React, TypeScript, and Tailwind CSS.

🔗 **Live site:** [YasmineBagane.github.io]

## Features

- **Responsive design** with light/dark mode toggle (persisted via `localStorage`)
- **Dynamic project pages** — each project has its own route with a detail view
- **Screenshot & video carousel** on project pages, with a toggle between screenshots and video demo
- **Contact form** powered by EmailJS — sends messages directly without a backend
- **Resume download** as a PDF, available from the site
- **Filterable projects section** on the homepage (All / Frontend / Backend / Full Stack / Other)

## Tech Stack

- **Framework:** React + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Icons:** Lucide React
- **Contact form:** EmailJS

## Project Structure

```
src/
├── assets/            # Images, logos, resume PDF, and per-project media
│   ├── project1/      # Screenshots + video demo for Project 1
│   ├── project2/
│   └── ...
├── components/
│   ├── Nav.tsx         # Header navigation + theme toggle
│   └── ProjectMedia.tsx # Screenshot/video carousel
├── data/
│   └── projects.ts     # Project content (title, description, tags, media, links)
├── pages/
│   ├── Home.tsx         # Landing page (About, Expertise, Experience, Projects, Education)
│   └── ProjectDetail.tsx # Individual project detail page
├── App.tsx              # Route definitions
└── main.tsx              # App entry point
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
git clone https://github.com/YasmineBagane/YasmineBagane.github.io.git
cd YasmineBagane.github.io
npm install
```

### Environment Variables

Create a `.env` file in the project root with your EmailJS credentials:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Development

```bash
npm run dev
```

Runs the app locally, typically at `http://localhost:5173`.

### Build

```bash
npm run build
```

Builds the app for production into the `dist/` folder.

### Preview production build

```bash
npm run preview
```

## Deployment

Deployed on Github Pages.

## Contact

- **Email:** yasmine.bagane@ensi-uma.tn
- **LinkedIn:** [linkedin.com/in/yasmine-bagane](https://www.linkedin.com/in/yasmine-bagane/)
- **GitHub:** [github.com/YasmineBagane](https://github.com/YasmineBagane)

## License

© 2026 YBC All Rights Reserved.
