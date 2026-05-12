"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: string; // e.g. "0.2s"
  className?: string;
}

export default function FadeIn({ children, delay, className = "" }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-up ${visible ? "visible" : ""} ${className}`}
      style={delay ? { transitionDelay: delay } : undefined}
    >
      {children}
    </div>
  );
}