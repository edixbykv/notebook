"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Notebook page-turn transition.
 *
 * Lives in `app/template.tsx`, so it re-mounts on every client navigation.
 * On mount it plays a "turning page" overlay: a paper sheet hinged on the
 * left spine flips away to the left, revealing the freshly-mounted page
 * underneath — exactly like turning a real notebook page. The content also
 * gently settles into place.
 *
 * - SSR/SEO safe: it only enhances the already-rendered RSC output; the real
 *   page HTML is present underneath at all times.
 * - First (hard) load is skipped so it never delays LCP.
 * - Desktop gets the 3D fold; mobile gets a lightweight slide; reduced-motion
 *   users get no animation at all.
 */

// Module-scoped so it survives template re-mounts but resets on full reload.
let isFirstLoad = true;

export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [play, setPlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const firstRef = useRef(isFirstLoad);

  useEffect(() => {
    setIsMobile(
      typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches
    );

    if (firstRef.current) {
      // skip animation on the very first page load
      isFirstLoad = false;
      return;
    }
    setPlay(true);

    // bring the viewport to the top as the new page turns in
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const showOverlay = play && !reduce;

  return (
    <div style={{ perspective: isMobile ? "none" : "2200px" }}>
      {/* settle the content itself */}
      <motion.div
        initial={
          reduce || firstRef.current
            ? false
            : { opacity: 0, y: isMobile ? 0 : 10, scale: isMobile ? 1 : 0.992 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          delay: showOverlay ? (isMobile ? 0.08 : 0.18) : 0,
        }}
        style={{ transformOrigin: "center top" }}
      >
        {children}
      </motion.div>

      {/* the turning sheet */}
      {showOverlay && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[90]"
          style={{ perspective: isMobile ? "none" : "2200px" }}
        >
          <motion.div
            className="absolute inset-0 ruled-paper"
            initial={
              isMobile
                ? { x: "0%", opacity: 1 }
                : { rotateY: 0, opacity: 1 }
            }
            animate={
              isMobile
                ? { x: "-100%", opacity: 0 }
                : { rotateY: -118, opacity: 0 }
            }
            transition={
              isMobile
                ? { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                : {
                    duration: 0.7,
                    ease: [0.4, 0, 0.2, 1],
                    opacity: { delay: 0.42, duration: 0.28 },
                  }
            }
            onAnimationComplete={() => setPlay(false)}
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              boxShadow: "0 0 80px rgba(17,17,17,0.18)",
            }}
          >
            {/* red margin line, like a real ruled page */}
            <div
              className="absolute inset-y-0 left-10 w-[2px]"
              style={{ background: "rgba(229,57,53,0.22)" }}
            />
            {/* soft bending shadow that travels along the spine as it folds */}
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{
                background:
                  "linear-gradient(to right, rgba(17,17,17,0.22), rgba(17,17,17,0) 70%)",
              }}
            />
            {/* faint highlight on the leading (right) edge */}
            <div
              className="absolute inset-y-0 right-0 w-24"
              style={{
                background:
                  "linear-gradient(to left, rgba(255,255,255,0.5), rgba(255,255,255,0))",
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
