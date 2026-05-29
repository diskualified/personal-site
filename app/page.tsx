import Cats from "./_components/Cats";
import Hero from "./_components/Hero";
import Journey from "./_components/Journey";
import Projects from "./_components/Projects";
import Resume from "./_components/Resume";
import ScrollProgress from "./_components/ScrollProgress";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <main className="flex w-full flex-col">
        <Hero />
        <Journey />
        <Cats />
        <Projects />
        <Resume />
        <footer className="mx-auto w-full max-w-3xl px-6 py-16 text-center font-mono text-[11px] uppercase tracking-widest text-neutral-500">
          end of demo · press F5 to play again
        </footer>
      </main>
    </>
  );
}
