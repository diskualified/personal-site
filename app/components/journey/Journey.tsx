import { chapters } from "@/app/constants/journey-data";
import JourneyChapter from "./JourneyChapter";
import JourneyHeader from "./JourneyHeader";

export default function Journey() {
  return (
    <section
      id="journey"
      className="relative mx-auto w-full max-w-3xl px-6 py-24 md:py-32"
    >
      <JourneyHeader />
      <div className="relative">
        <div
          className="pointer-events-none absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-transparent via-neutral-200 to-transparent dark:via-neutral-800 md:left-1/2 md:-translate-x-1/2"
          aria-hidden
        />
        {chapters.map((c, i) => (
          <JourneyChapter key={c.id} chapter={c} index={i} />
        ))}
      </div>
    </section>
  );
}
