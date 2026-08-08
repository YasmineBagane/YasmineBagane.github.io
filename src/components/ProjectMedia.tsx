import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Play,
} from "lucide-react";

interface ProjectMediaProps {
  screenshots: string[];
  videoUrl?: string;
}

function ProjectMedia({ screenshots, videoUrl }: ProjectMediaProps) {
  const [activeTab, setActiveTab] = useState<"screenshots" | "video">(
    "screenshots",
  );
  const [index, setIndex] = useState(0);

  if (screenshots.length === 0 && !videoUrl) return null;

  const next = () => setIndex((i) => (i + 1) % screenshots.length);
  const prev = () =>
    setIndex((i) => (i - 1 + screenshots.length) % screenshots.length);

  return (
    <div className="mt-8 space-y-4">
      {/* Tabs — only show if both media types exist */}
      {videoUrl && screenshots.length > 0 && (
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("screenshots")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
              activeTab === "screenshots"
                ? "bg-accent text-white"
                : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Screenshots
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
              activeTab === "video"
                ? "bg-accent text-white"
                : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            <Play className="w-4 h-4" />
            Video Demo
          </button>
        </div>
      )}

      {/* Screenshots carousel */}
      {activeTab === "screenshots" && screenshots.length > 0 && (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
          <img
            src={screenshots[index]}
            alt={`Screenshot ${index + 1}`}
            className="w-full h-auto max-h-[480px] object-contain"
          />

          {screenshots.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950/80 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to screenshot ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === index ? "bg-accent" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Video demo */}
      {activeTab === "video" && videoUrl && (
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-video">
          <video src={videoUrl} controls className="w-full h-full" />
        </div>
      )}
    </div>
  );
}

export default ProjectMedia;
