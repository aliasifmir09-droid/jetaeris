"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import type { CabinSeat } from "@/lib/aircraft-cabin";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  seats: CabinSeat[];
  typicalSeats: number;
  seatMax: number;
  className?: string;
  /** Dark cinematic chrome */
  dark?: boolean;
};

/**
 * Animated top-down cabin seat map — lights seats so first-timers
 * instantly see how many people fit in this class.
 */
export function CabinSeatMap({
  seats,
  typicalSeats,
  seatMax,
  className = "",
  dark = false,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<SVGSVGElement>(null);
  const rows = useMemo(
    () => Math.max(...seats.map((s) => s.row)) + 1,
    [seats],
  );

  const width = 280;
  const height = 56 + rows * 52 + 40;
  const aisleX = width / 2;
  const seatW = 44;
  const seatH = 36;

  useEffect(() => {
    const svg = rootRef.current;
    if (!svg) return;
    const reduce = prefersReducedMotion();
    const nodes = svg.querySelectorAll<SVGElement>("[data-seat]");
    nodes.forEach((node, i) => {
      const active = i < typicalSeats;
      node.style.opacity = active ? "1" : "0.28";
      if (reduce) {
        node.style.transform = "scale(1)";
        return;
      }
      node.style.transform = "scale(0.72)";
      node.style.transition = `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 0.045}s, opacity 0.4s ease ${i * 0.03}s`;
      requestAnimationFrame(() => {
        node.style.transform = "scale(1)";
      });
    });
  }, [seats, typicalSeats]);

  return (
    <div className={`cabin-seat-map ${className}`}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p
            className={`text-[0.68rem] tracking-[0.18em] uppercase ${
              dark ? "text-[var(--accent-soft)]" : "text-accent"
            }`}
          >
            Cabin seating
          </p>
          <p
            className={`mt-1 font-[family-name:var(--font-display)] text-3xl ${
              dark ? "text-white" : "text-ink"
            }`}
          >
            {typicalSeats}
            <span
              className={`ml-2 text-base font-normal ${
                dark ? "text-white/55" : "text-muted"
              }`}
            >
              typical · up to {seatMax}
            </span>
          </p>
        </div>
        <p
          className={`max-w-[11rem] text-right text-xs leading-5 ${
            dark ? "text-white/55" : "text-muted"
          }`}
        >
          Lit seats = typical passenger count for this class
        </p>
      </div>

      <svg
        ref={rootRef}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto h-auto w-full max-w-[320px]"
        role="img"
        aria-label={`Seat map showing about ${typicalSeats} passenger seats, up to ${seatMax}`}
      >
        <defs>
          <linearGradient id={`${uid}-fuselage`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={dark ? "#1a2740" : "#dfe6f2"}
            />
            <stop
              offset="100%"
              stopColor={dark ? "#0b1220" : "#c8d2e4"}
            />
          </linearGradient>
          <linearGradient id={`${uid}-seat`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5b8def" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>

        {/* Fuselage outline */}
        <path
          d={`M ${width / 2} 8
              C ${width - 28} 8, ${width - 18} 36, ${width - 18} 56
              L ${width - 18} ${height - 28}
              C ${width - 18} ${height - 8}, ${width / 2 + 20} ${height - 4}, ${width / 2} ${height - 4}
              C ${width / 2 - 20} ${height - 4}, 18 ${height - 8}, 18 ${height - 28}
              L 18 56
              C 18 36, 28 8, ${width / 2} 8 Z`}
          fill={`url(#${uid}-fuselage)`}
          stroke={dark ? "rgba(255,255,255,0.14)" : "rgba(7,11,20,0.12)"}
          strokeWidth="1.5"
        />

        {/* Cockpit hint */}
        <ellipse
          cx={width / 2}
          cy={28}
          rx={22}
          ry={10}
          fill={dark ? "rgba(91,141,239,0.25)" : "rgba(30,58,138,0.18)"}
        />
        <text
          x={width / 2}
          y={32}
          textAnchor="middle"
          fontSize="8"
          fill={dark ? "rgba(255,255,255,0.45)" : "rgba(7,11,20,0.45)"}
          letterSpacing="1.2"
        >
          NOSE
        </text>

        {/* Aisle */}
        <line
          x1={aisleX}
          y1={48}
          x2={aisleX}
          y2={height - 36}
          stroke={dark ? "rgba(255,255,255,0.12)" : "rgba(7,11,20,0.1)"}
          strokeWidth="2"
          strokeDasharray="4 6"
        />

        {seats.map((seat, i) => {
          const x =
            seat.side === 0
              ? aisleX - 18 - seatW
              : aisleX + 18;
          const y = 56 + seat.row * 52;
          const w = seatW;
          const fill =
            i < typicalSeats
              ? `url(#${uid}-seat)`
              : dark
                ? "rgba(255,255,255,0.08)"
                : "rgba(7,11,20,0.08)";

          return (
            <g
              key={seat.id}
              data-seat
              style={{ transformOrigin: `${x + w / 2}px ${y + seatH / 2}px` }}
            >
              <rect
                x={x}
                y={y}
                width={w}
                height={seatH}
                rx={8}
                fill={fill}
                stroke={
                  i < typicalSeats
                    ? "rgba(255,255,255,0.35)"
                    : dark
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(7,11,20,0.12)"
                }
              />
              {/* Headrest cue */}
              <rect
                x={x + 8}
                y={seat.facing === "aft" ? y + seatH - 8 : y + 4}
                width={w - 16}
                height={5}
                rx={2}
                fill={
                  i < typicalSeats
                    ? "rgba(255,255,255,0.35)"
                    : "rgba(255,255,255,0.08)"
                }
              />
              <text
                x={x + w / 2}
                y={y + seatH / 2 + 4}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill={i < typicalSeats ? "#fff" : dark ? "#8a9bb3" : "#5b6b82"}
              >
                {i + 1}
              </text>
            </g>
          );
        })}

        <text
          x={width / 2}
          y={height - 14}
          textAnchor="middle"
          fontSize="8"
          fill={dark ? "rgba(255,255,255,0.4)" : "rgba(7,11,20,0.4)"}
          letterSpacing="1.4"
        >
          TAIL · LAV AFT
        </text>
      </svg>
    </div>
  );
}
