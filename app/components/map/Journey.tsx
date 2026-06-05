import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { chapters } from "@/app/constants/journey-data";

export function JourneyContent() {
  return (
    <div className="mx-auto max-w-2xl px-8 pb-32 pt-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-amber-700">
        chapter 04
      </p>
      <h2 className="mt-3 text-4xl font-light tracking-tight text-neutral-100">
        the journey
      </h2>

      <div className="relative mt-16">
        <div className="absolute bottom-0 left-5 top-0 w-px bg-linear-to-b from-amber-900/60 via-amber-900/30 to-transparent" />
        <div className="flex flex-col">
          {chapters.map((c, i) => (
            <ChapterBlock key={c.id} chapter={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterBlock({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="relative pb-20 pl-16">
      <motion.div
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-amber-900 bg-[#0a0a0a]"
      >
        <span className="font-mono text-[9px] text-amber-600">
          {chapter.number}
        </span>
      </motion.div>

      <motion.div
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <p className="font-mono text-[9px] uppercase tracking-widest text-amber-900">
          chapter {chapter.number} · {chapter.subtitle}
        </p>
        <h3 className="mt-3 text-2xl font-light text-neutral-100">
          {chapter.title}
        </h3>
        <p className="mt-4 leading-relaxed text-neutral-500">{chapter.body}</p>

        {chapter.nodes && chapter.nodes.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {chapter.nodes.map((n) => (
              <>
                <span
                  key={n.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-neutral-600"
                >
                  <span className="h-1 w-1 rounded-full bg-amber-700" />
                  {n.title}
                </span>
                {/* <InteractiveNode key={n.id} node={n} /> */}
              </>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
