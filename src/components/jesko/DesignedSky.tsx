/**
 * Graphic dusk sky for the homepage hero — poster design, not photography.
 * Flat gradient bands + soft geometric cloud shapes.
 */
export function DesignedSky({ className = "" }: { className?: string }) {
  return (
    <div
      className={`designed-sky absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* Poster sky bands */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg,
              #0c1420 0%,
              #152033 18%,
              #243044 36%,
              #3d3a48 52%,
              #8a5a3a 70%,
              #d4a05a 84%,
              #f0c888 100%)
          `,
        }}
      />
      {/* Soft sun disc — true circle (aspect locked), not photographic bloom */}
      <div
        className="absolute left-[14%] top-[9%] w-[42%] max-w-[220px] rounded-full"
        style={{
          aspectRatio: "1 / 1",
          background:
            "radial-gradient(circle at 45% 45%, #ffe2a8 0%, #f0b060 42%, rgba(240,176,96,0) 72%)",
          opacity: 0.95,
        }}
      />
      {/* Geometric cloud terraces */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 1100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="terraceA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f6e0c0" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#b07a48" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="terraceB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ead2b0" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#6e4a36" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="terraceC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d8b896" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#3a2a24" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        {/* Layered silhouette ridges — clearly drawn, not photo texture */}
        <path
          fill="url(#terraceA)"
          d="M-40 620 C80 580, 160 600, 260 590 C380 575, 460 610, 560 595 C680 575, 760 600, 860 585 L860 720 L-40 720 Z"
        />
        <path
          fill="url(#terraceB)"
          d="M-40 700 C100 670, 200 695, 320 680 C450 660, 540 700, 660 685 C760 670, 820 690, 860 680 L860 820 L-40 820 Z"
        />
        <path
          fill="url(#terraceC)"
          d="M-40 790 C120 760, 220 785, 340 770 C480 750, 580 800, 700 780 C780 770, 830 790, 860 785 L860 1120 L-40 1120 Z"
        />
        {/* Fine designed grid / altitude marks */}
        <g stroke="rgba(244,239,230,0.14)" strokeWidth="1.2" fill="none">
          <path d="M48 420 H752" />
          <path d="M72 500 H728" strokeDasharray="3 9" />
          <path d="M96 580 H704" strokeDasharray="2 12" />
        </g>
        <g fill="rgba(244,239,230,0.22)" fontFamily="ui-sans-serif,system-ui" fontSize="14">
          <text x="56" y="412">FL410</text>
        </g>
      </svg>
      {/* Glass vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(8,10,14,0.45) 100%)",
        }}
      />
      <div className="designed-sky-grain absolute inset-0 opacity-[0.18] mix-blend-overlay" />
    </div>
  );
}
