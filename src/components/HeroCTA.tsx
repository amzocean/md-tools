"use client";

interface HeroCTAProps {
  label: string;
}

export default function HeroCTA({ label }: HeroCTAProps) {
  const scrollToTool = () => {
    document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTool}
      className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-gray-900 font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
    >
      {label}
      <svg
        className="ml-2 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  );
}
