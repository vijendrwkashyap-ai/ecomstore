"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children as any}
    </ReactLenis>
  );
}
