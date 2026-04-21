import type { SiteConfig } from "@/types";
import HeroCTA from "./HeroCTA";

interface HeroProps {
  config: SiteConfig;
}

export default function Hero({ config }: HeroProps) {
  return (
    <section
      className={`bg-gradient-to-br ${config.theme.gradient} text-white py-16 sm:py-20`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          {config.hero.headline}
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
          {config.hero.subheadline}
        </p>
        <HeroCTA label={config.hero.cta} />
      </div>
    </section>
  );
}
