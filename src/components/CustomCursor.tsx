"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let ringX = -100, ringY = -100, mouseX = -100, mouseY = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPosition({ x: mouseX, y: mouseY });
      const target = e.target as HTMLElement;
      setHovering(target.closest("a, button, [role='button'], .video-card, .social-icon, input, textarea") !== null);
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      setRingPosition({ x: ringX, y: ringY });
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div className="cursor-dot" style={{ left: position.x, top: position.y }} />
      <div className={`cursor-ring ${hovering ? "hovering" : ""}`} style={{ left: ringPosition.x, top: ringPosition.y }} />
    </>
  );
}
