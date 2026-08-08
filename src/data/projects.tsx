// Eagerly import every image/video under assets/project*/
const mediaModules = import.meta.glob(
  "../assets/project*/*.{png,jpg,jpeg,webp,mp4}",
  {
    eager: true,
    import: "default",
  },
);

// Helper to grab all screenshots for a given project folder, sorted by filename
function getScreenshots(folder: string): string[] {
  return Object.entries(mediaModules)
    .filter(
      ([path]) => path.includes(`/assets/${folder}/`) && !path.endsWith(".mp4"),
    )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod as string);
}

function getVideo(folder: string): string | undefined {
  const entry = Object.entries(mediaModules).find(
    ([path]) => path.includes(`/assets/${folder}/`) && path.endsWith(".mp4"),
  );
  return entry ? (entry[1] as string) : undefined;
}

export const projects = [
  {
    id: "project1",
    name: "TapArena",
    title: "TapArena – One-Touch Minigame Arcade",
    year: "2026",
    summary:
      "A modular one-touch minigame arcade built with Unity and C#, featuring a shared architecture for integrating and running multiple games independently from a central hub.",
    details: [
      "TapArena is a personal Unity project exploring game development and modular game architecture. The arcade currently includes playable prototypes of Snake Solo and Memory Match, both integrated into a shared hub through a common IMinigame / RunResult contract. Each game runs in its own scene and can be added independently without modifying the core hub architecture.",
      "Built with Unity 6, C#, and UI Toolkit (UXML/USS), with Android and iOS planned as future target platforms.",
    ],
    tags: ["Unity 6", "C#", "Game Development", "UI Toolkit"],
    tech: ["Unity ", "• C# ", "• Game Development ", "• UI Toolkit "],
    mainrole: [
      "Designed and developed the project independently as a solo developer, from game design and architecture to implementation and debugging.",
    ],
    detailedrole: [
      "• Built the shared arcade hub and navigation system using Unity 6 and UI Toolkit.",
      "• Designed a common IMinigame / RunResult contract to provide a consistent interface between the hub and individual games.",
      "• Implemented the Snake Solo and Memory Match gameplay prototypes, including their game logic, UI, input handling, and state management.",
      "• Structured each minigame as an independent scene so new games can be integrated without modifying the core hub logic.",
      "• Used Git for source control and iterative development.",
    ],
    challenge: [
      "Designing a reusable architecture for multiple independent minigames.",
      "With six games planned for the arcade, the main challenge was avoiding a Hub that became tightly coupled to each individual game. I addressed this by defining a shared interface for minigames and isolating each game in its own scene. The Hub handles navigation, while each game manages its own gameplay and run results.",
    ],
    category: "Other",
    githubUrl: "https://github.com/YasmineBagane/TapArena",
    isDemo: false,
    demoUrl: "https://example.com",
    screenshots: getScreenshots("project1"),
    videoUrl: getVideo("project1"),
  },
  // ...more projects
];
