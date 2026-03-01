"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for GSAP animations with proper React cleanup.
 * Uses gsap.context() for automatic cleanup on unmount.
 * ScrollTrigger is registered globally.
 */
export function useGSAP(
  scopeRef: React.RefObject<HTMLElement | null>,
  callback: (gsapInstance: typeof gsap) => void,
  deps: unknown[] = [],
) {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!scopeRef.current) return;

    contextRef.current = gsap.context(() => {
      callback(gsap);
    }, scopeRef);

    return () => {
      contextRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
