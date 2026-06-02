import { motion } from "motion/react";
import { profile } from "@/app/constants/content-data";

export function ContactContent() {
  return (
    <div className="mx-auto max-w-2xl px-8 pb-32 pt-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-emerald-700">
        chapter 03
      </p>
      <h2 className="mt-3 text-4xl font-light tracking-tight text-neutral-100">
        contact me
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-14"
      >
        <p className="leading-relaxed text-neutral-500">
          Open to interesting problems, collaborations, and good causes. Whether
          you want to build something or just say hello — send a message.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/40 px-6 py-4 text-sm text-neutral-400 transition-colors hover:border-emerald-900 hover:text-neutral-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {profile.email}
            <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-neutral-700 transition-colors group-hover:text-emerald-600">
              open email ↗
            </span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}