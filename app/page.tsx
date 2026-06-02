"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import CursorGlow from "./_components/effects/CursorGlow";
import Hero from "./_components/Hero";
import WorldMap from "./_components/map/WorldMap";
import ZoneOverlay from "./_components/map/ZoneOverlay";
import type { ZoneId } from "./_components/map/WorldMap";

const VALID_ZONES: ZoneId[] = ["journey", "projects", "resume", "contact"];

function readZoneFromUrl(): ZoneId | null {
  const z = new URLSearchParams(window.location.search).get("zone") as ZoneId | null;
  return z && VALID_ZONES.includes(z) ? z : null;
}

// useSyncExternalStore is the React-idiomatic way to handle server/client
// divergence without calling setState inside an effect.
const noop = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}

export default function Page() {
  const mounted = useIsMounted(); // false on server, true after hydration
  const [selectedZone, setSelectedZone] = useState<ZoneId | null>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [transitioning, setTransitioning] = useState(false);

  const mapSectionRef = useRef<HTMLElement>(null);
  const [mapScope, animateMap] = useAnimate();

  // Read URL zone after hydration and scroll past the hero if needed
  useEffect(() => {
    const zone = readZoneFromUrl();
    if (!zone) return;
    const el = mapSectionRef.current;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY });
    setOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setSelectedZone(zone);
  }, []);

  // Keep URL in sync as zones open / close (skip on server)
  useEffect(() => {
    if (!mounted) return;
    if (selectedZone) {
      history.replaceState(null, "", `?zone=${selectedZone}`);
    } else {
      history.replaceState(null, "", location.pathname);
    }
  }, [selectedZone, mounted]);

  // Lock outer scroll while a zone is open
  useEffect(() => {
    document.body.style.overflow = selectedZone ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedZone]);

  const handleStart = () => {
    setTransitioning(true);
    setTimeout(() => {
      if (mapSectionRef.current) {
        window.scrollTo({ top: mapSectionRef.current.offsetTop });
      }
      if (mapScope.current) {
        animateMap(mapScope.current, { scale: 1.35, y: 60, opacity: 0.4 }, { duration: 0 });
        animateMap(mapScope.current, { scale: 1, y: 0, opacity: 1 }, {
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        });
      }
      setTransitioning(false);
    }, 900);
  };

  const handleSelectZone = (id: ZoneId, coords: { x: number; y: number }) => {
    setOrigin(coords);
    setSelectedZone(id);
  };

  return (
    <div className="bg-[#0a0a0a] text-neutral-100">
      <CursorGlow />

      <Hero onStart={handleStart} />

      <section ref={mapSectionRef} className="h-screen">
        <div ref={mapScope} className="h-full">
          <WorldMap onSelectZone={handleSelectZone} />
        </div>
      </section>

      {/* Cinematic flash overlay for start transition */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#0a0a0a]"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.7, 0] }}
              transition={{ duration: 1.1, times: [0, 0.1, 0.7, 1] }}
              className="font-mono text-[9px] uppercase tracking-[0.5em] text-white"
            >
              entering world
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zone overlay — gated by mounted so first client render matches server */}
      <AnimatePresence>
        {mounted && selectedZone && (
          <ZoneOverlay
            key={selectedZone}
            zone={selectedZone}
            origin={origin}
            onClose={() => setSelectedZone(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
