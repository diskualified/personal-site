"use client";

import { useEffect, useState } from "react";
import type { JourneyNode, NodeKind } from "../../constants/journey-data";

const kindGlyph: Record<NodeKind, string> = {
  quest: "◇",
  loot: "◆",
  npc: "○",
  boss: "★",
};

export default function InteractiveNode({ node }: { node: JourneyNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-neutral-600 transition hover:-translate-y-px hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-100 dark:hover:text-neutral-100"
      >
        <span className="text-base leading-none">{kindGlyph[node.kind]}</span>
        <span>{node.label}</span>
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={node.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-left shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
              <span className="mr-2 text-base leading-none">
                {kindGlyph[node.kind]}
              </span>
              {node.label}
            </p>
            <h4 className="mt-4 text-2xl font-light tracking-tight">
              {node.title}
            </h4>
            <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
              {node.body}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-8 font-mono text-[11px] uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              close ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
