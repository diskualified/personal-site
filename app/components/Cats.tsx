"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const CATS = [
  {
    src: "/images/Moon.png",
    name: "Moon",
    caption: "easter fit",
    width: 300,
    height: 240,
    rotate: -8,
    dy: 0,
    delay: 0.12,
  },
  {
    src: "/images/MoonAndBash.png",
    name: "The Boys",
    caption: "the dynamic duo",
    width: 370,
    height: 296,
    rotate: 1,
    dy: -28,
    delay: 0,
  },
  {
    src: "/images/Bash.png",
    name: "Bash",
    caption: "professional sleeper",
    width: 290,
    height: 232,
    rotate: 9,
    dy: 18,
    delay: 0.18,
  },
];

const SPRING = { type: "spring" as const, stiffness: 190, damping: 14 };

export default function Cats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-24">
      {/* Hidden SVG filter — rough sketchy outline */}
      <svg
        aria-hidden
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter
            id="sketch-edge"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            {/* Expand the alpha silhouette */}
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="7"
              result="expanded"
            />
            {/* Generate organic noise */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.025 0.030"
              numOctaves="4"
              seed="17"
              result="noise"
            />
            {/* Warp the expanded silhouette with the noise */}
            <feDisplacementMap
              in="expanded"
              in2="noise"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
              result="wobbly"
            />
            {/* Fill the warped silhouette with white */}
            <feFlood floodColor="white" floodOpacity="1" result="fill" />
            <feComposite in="fill" in2="wobbly" operator="in" result="outline" />
            {/* Layer: outline behind original */}
            <feMerge>
              <feMergeNode in="outline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Dot-grid notebook background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23d1d5db'/%3E%3C/svg%3E\")",
          opacity: 0.45,
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.header
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
            special appearance
          </p>
          <h2
            className="mt-4 font-light italic tracking-tight text-neutral-900 dark:text-neutral-100"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            meet the crew
          </h2>
          <p className="mt-3 font-mono text-[11px] text-neutral-400">
            ( the real reason this site exists )
          </p>
        </motion.header>

        {/* Scattered cat stickers */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:flex-nowrap md:gap-2">
          {CATS.map((cat) => (
            <motion.div
              key={cat.name}
              initial={{
                opacity: 0,
                scale: 0.25,
                rotate: cat.rotate * 3,
                y: -64,
              }}
              animate={
                inView
                  ? { opacity: 1, scale: 1, rotate: cat.rotate, y: cat.dy }
                  : {}
              }
              transition={{ ...SPRING, delay: cat.delay }}
              whileHover={{
                scale: 1.09,
                rotate: cat.rotate * 0.25,
                y: cat.dy - 10,
                transition: { type: "spring", stiffness: 380, damping: 11 },
              }}
              whileTap={{ scale: 0.94 }}
              className="relative flex-shrink-0 cursor-grab active:cursor-grabbing select-none"
              style={{ zIndex: cat.name === "Moon & Bash" ? 10 : 5 }}
            >
              {/* Tape strip */}
              <div
                aria-hidden
                className="absolute left-1/2 z-20"
                style={{
                  top: "-10px",
                  transform: "translateX(-50%) rotate(-2deg)",
                  width: "52px",
                  height: "18px",
                  background: "rgba(255, 224, 80, 0.72)",
                  borderRadius: "2px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                  mixBlendMode: "multiply",
                }}
              />

              {/* Image with sketchy outline filter */}
              <div
                style={{
                  filter:
                    "url(#sketch-edge) drop-shadow(3px 5px 16px rgba(0,0,0,0.16))",
                }}
              >
                <Image
                  src={cat.src}
                  alt={cat.name}
                  width={cat.width}
                  height={cat.height}
                  draggable={false}
                  priority
                />
              </div>

              {/* Handwritten label */}
              <motion.div
                className="mt-1 text-center"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: cat.delay + 0.35, duration: 0.4 }}
              >
                <p
                  className="text-neutral-700 dark:text-neutral-300"
                  style={{ fontFamily: "cursive", fontSize: "1.05rem" }}
                >
                  {cat.name}
                </p>
                <p
                  className="text-neutral-400 dark:text-neutral-500"
                  style={{ fontFamily: "cursive", fontSize: "0.78rem" }}
                >
                  {cat.caption}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
