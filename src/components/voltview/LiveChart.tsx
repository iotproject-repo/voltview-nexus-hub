import { useEffect, useState } from "react";

export function LiveChart({ height = 120 }: { height?: number }) {
  const [points, setPoints] = useState<number[]>(() =>
    Array.from({ length: 40 }, (_, i) => 50 + Math.sin(i / 3) * 20 + Math.random() * 8)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setPoints(p => {
        const next = [...p.slice(1), 50 + Math.sin(Date.now() / 600) * 22 + Math.random() * 10];
        return next;
      });
    }, 700);
    return () => clearInterval(id);
  }, []);

  const w = 600;
  const h = height;
  const max = 100;
  const step = w / (points.length - 1);
  const path = points.map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (v / max) * h}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[120px] w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lvg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lvg)" />
      <path d={path} fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
