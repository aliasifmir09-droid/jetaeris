type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, body, light }: Props) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className={`eyebrow ${light ? "text-[var(--accent-soft)]" : ""}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`serif mt-4 text-[clamp(2.1rem,4vw,3.4rem)] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {body ? (
        <p className={`lede mt-5 ${light ? "text-white/70" : ""}`}>{body}</p>
      ) : null}
    </div>
  );
}
