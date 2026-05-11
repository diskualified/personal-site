import { profile } from "./content-data";

export default function Hero() {
  const [first, ...rest] = profile.name.split(" ");
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
        new game · press scroll to begin
      </p>
      <h1 className="mt-10 text-6xl font-light tracking-tight sm:text-7xl md:text-8xl">
        {first}
        <span className="text-neutral-400 dark:text-neutral-600">
          {rest.length ? rest.join(" ") : ""}
        </span>
      </h1>
      <p className="mt-8 max-w-md text-neutral-500 dark:text-neutral-400">
        {profile.tagline}
      </p>
      <nav className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
        <a className="hover:text-neutral-900 dark:hover:text-neutral-100" href="#journey">
          journey
        </a>
        <span aria-hidden>·</span>
        <a className="hover:text-neutral-900 dark:hover:text-neutral-100" href="#projects">
          projects
        </a>
        <span aria-hidden>·</span>
        <a className="hover:text-neutral-900 dark:hover:text-neutral-100" href="#resume">
          resume
        </a>
      </nav>
      <div className="absolute bottom-12 flex flex-col items-center gap-3 text-neutral-400">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <span className="block h-10 w-px animate-pulse bg-neutral-300 dark:bg-neutral-700" />
      </div>
    </section>
  );
}
