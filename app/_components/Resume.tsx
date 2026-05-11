import { resume } from "./content-data";

export default function Resume() {
  return (
    <section
      id="resume"
      className="mx-auto w-full max-w-3xl px-6 py-24 md:py-32"
    >
      <header className="mb-12 text-center md:mb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
          stats screen
        </p>
        <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
          resume
        </h2>
      </header>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
            experience
          </h3>
          <ul className="mt-6 space-y-8">
            {resume.experience.map((e) => (
              <li key={e.role + e.company}>
                <p className="text-lg">{e.role}</p>
                <p className="mt-1 text-sm text-neutral-500">
                  {e.company} · {e.period}
                </p>
                <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {e.summary}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-12">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
              education
            </h3>
            <ul className="mt-6 space-y-4">
              {resume.education.map((e) => (
                <li key={e.school}>
                  <p>{e.degree}</p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {e.school} · {e.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
              skill tree
            </h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {resume.skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-neutral-300 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
