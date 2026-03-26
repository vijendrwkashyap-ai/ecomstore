"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Hide on mobile to prevent interaction issues
    const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-black/20 rounded-full pointer-events-none z-[9998] transition-transform duration-300 ease-out hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
