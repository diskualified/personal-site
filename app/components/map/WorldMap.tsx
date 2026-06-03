"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

export type ZoneId = "journey" | "projects" | "resume" | "contact";

type MapNode = {
  id: ZoneId;
  label: string;
  chapter: string;
  x: number; // % of container width
  y: number; // % of container height
  description: string;
  color: string;
};

export const ZONE_META: Record<ZoneId, { color: string; label: string; chapter: string }> = {
  journey:  { color: "#f59e0b", label: "The Who",   chapter: "01" },
  projects: { color: "#38bdf8", label: "The What",      chapter: "02" },
  contact:   { color: "#a78bfa", label: "The Where",   chapter: "03" },
  resume:  { color: "#4ade80", label: "The Why",   chapter: "04" },
};

const NODES: MapNode[] = [
  { id: "journey",  label: "The Who",  chapter: "01", x: 25, y: 34, description: "origin story · skill tree · boss fights", color: "#f59e0b" },
  { id: "projects", label: "The What",    chapter: "02", x: 67, y: 27, description: "shipped things · experiments · open source", color: "#38bdf8" },
  { id: "contact",  label: "The Where", chapter: "03", x: 30, y: 67, description: "say hello · open to quests", color: "#4ade80" },
  { id: "resume",   label: "The Why", chapter: "04", x: 70, y: 64, description: "skills · experience · lore", color: "#a78bfa" },
];

const PATHS: [ZoneId, ZoneId][] = [
  ["journey", "projects"],
  ["projects", "resume"],
  ["resume", "contact"],
  ["contact", "journey"],
  ["journey", "resume"],
];

// ─── Atmospheric canvas ───────────────────────────────────────────────────────

function MapBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const el = canvas;
    const ctx = el.getContext("2d")!;
    let W = 0, H = 0, raf = 0, t = 0;

    function resize() {
      W = el.width = el.offsetWidth;
      H = el.height = el.offsetHeight;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.003;

      ctx.strokeStyle = "rgba(255,255,255,0.028)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 48) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 48) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      for (let i = 0; i < 4; i++) {
        const fx = W * 0.1 + W * 0.8 * ((i * 0.618 + t * 0.022) % 1);
        const fy = H * 0.1 + H * 0.8 * ((i * 0.382 + t * 0.016) % 1);
        const r = ctx.createRadialGradient(fx, fy, 0, fx, fy, W * 0.22);
        r.addColorStop(0, `rgba(55,55,110,${0.04 + Math.sin(t + i) * 0.014})`);
        r.addColorStop(1, "transparent");
        ctx.fillStyle = r;
        ctx.beginPath();
        ctx.ellipse(fx, fy, W * 0.24, H * 0.21, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}

// ─── SVG paths between nodes ──────────────────────────────────────────────────

function NodePaths({ size, hovered }: { size: { w: number; h: number }; hovered: ZoneId | null }) {
  const pos = (id: ZoneId) => {
    const n = NODES.find(n => n.id === id)!;
    return { x: (n.x / 100) * size.w, y: (n.y / 100) * size.h };
  };

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      {PATHS.map(([a, b]) => {
        const pa = pos(a), pb = pos(b);
        const mx = (pa.x + pb.x) / 2;
        const my = (pa.y + pb.y) / 2 - 24;
        const active = hovered === a || hovered === b;
        return (
          <motion.path
            key={`${a}-${b}`}
            d={`M${pa.x},${pa.y} Q${mx},${my} ${pb.x},${pb.y}`}
            fill="none"
            stroke={active ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.06)"}
            strokeWidth={active ? 1.5 : 1}
            strokeDasharray="4 7"
            animate={{ strokeDashoffset: [0, -22] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </svg>
  );
}

// ─── Individual map node ──────────────────────────────────────────────────────

function MapNodeEl({
  node,
  size,
  isHovered,
  onHover,
  onSelect,
  index,
}: {
  node: MapNode;
  size: { w: number; h: number };
  isHovered: boolean;
  onHover: (id: ZoneId | null) => void;
  onSelect: (node: MapNode, e: React.MouseEvent) => void;
  index: number;
}) {
  const cx = (node.x / 100) * size.w;
  const cy = (node.y / 100) * size.h;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35 + index * 0.12, type: "spring", stiffness: 280, damping: 20 }}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ left: cx, top: cy }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => onSelect(node, e)}
      aria-label={`Enter ${node.label}`}
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 36, height: 36, border: `1px solid ${node.color}` }}
        animate={{ scale: [1, 2.4], opacity: [0, 0.55, 0] }}
        transition={{
          duration: 3.0,
          repeat: Infinity,
          ease: "easeOut",
          delay: index * 0.7,
        }}
      />

      {/* Hover glow */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: 60, height: 60, background: `${node.color}18` }}
          />
        )}
      </AnimatePresence>

      {/* Core dot */}
      <motion.div
        animate={{ scale: isHovered ? 1.3 : 1 }}
        transition={{ duration: 0.15 }}
        className="relative h-9 w-9 rounded-full"
        style={{ background: node.color, boxShadow: `0 0 22px ${node.color}55` }}
      />

      {/* Label */}
      <div className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 text-center">
        <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: node.color }}>
          {node.chapter}
        </p>
        <p className="mt-0.5 whitespace-nowrap text-[11px] font-light text-neutral-400">
          {node.label}
        </p>
      </div>
    </motion.button>
  );
}

// ─── World map ────────────────────────────────────────────────────────────────

export default function WorldMap({
  onSelectZone,
}: {
  onSelectZone: (id: ZoneId, coords: { x: number; y: number }) => void;
}) {
  const [hovered, setHovered] = useState<ZoneId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height })
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSelect = useCallback((node: MapNode, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    onSelectZone(node.id, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }, [onSelectZone]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <MapBackground />

      {size.w > 0 && <NodePaths size={size} hovered={hovered} />}

      {/* Header */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 px-8 pt-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-[10px] uppercase tracking-[0.45em] text-neutral-700"
        >
          world map
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-1 text-lg font-light text-neutral-500"
        >
          select a zone to explore
        </motion.p>
      </div>

      {/* Nodes */}
      {size.w > 0 && NODES.map((node, i) => (
        <MapNodeEl
          key={node.id}
          node={node}
          size={size}
          isHovered={hovered === node.id}
          onHover={setHovered}
          onSelect={handleSelect}
          index={i}
        />
      ))}

      {/* Player "you are here" marker */}
      {size.w > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-500"
            style={{ width: 20, height: 20 }}
            animate={{ scale: [1, 1.9], opacity: [0, 0.55, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <div className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
          <p className="absolute left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-widest text-neutral-700">
            you
          </p>
        </motion.div>
      )}

      {/* Hover tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">
              {NODES.find(n => n.id === hovered)?.description}
            </p>
            <p className="mt-1 font-mono text-[9px] text-neutral-700">click to enter</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
