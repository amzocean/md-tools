"use client";

import { useState } from "react";
import type { SiteConfig } from "@/types";
import Hero from "./Hero";
import MarkdownTool from "./MarkdownTool";

interface HomeContentProps {
  config: SiteConfig;
}

export default function HomeContent({ config }: HomeContentProps) {
  const [heroVisible, setHeroVisible] = useState(true);

  return (
    <>
      {heroVisible && <Hero config={config} />}
      <MarkdownTool onContentLoaded={() => setHeroVisible(false)} />
    </>
  );
}
