import { chapters } from "./journey-data";
import JourneyChapter from "./JourneyChapter";

export default function Journey() {
  return (
    <section
      id="journey"
      className="relative mx-auto w-full max-w-3xl px-6 py-24 md:py-32"
    >
      <header className="mb-20 text-center md:mb-28">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
          act one
        </p>
        <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
          the journey so far
        </h2>
        <p className="mt-4 text-sm text-neutral-500">
          each marker is a chapter. tap the runes along the way to open side-quests.
        </p>
      </header>
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
