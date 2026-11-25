import { TRIP_STAGES, stageIndex, type TripStageId } from "@/lib/trip-track";

type Props = {
  current: TripStageId;
  compact?: boolean;
};

/** Phase A — customer-visible trip status from request → airborne → landed. */
export function TripStatusTimeline({ current, compact }: Props) {
  const active = stageIndex(current);

  return (
    <ol className={compact ? "space-y-3" : "space-y-4"}>
      {TRIP_STAGES.map((step, i) => {
        const done = i < active;
        const here = i === active;
        return (
          <li key={step.id} className="flex gap-3">
            <div className="flex w-6 flex-col items-center">
              <span
                className={`mt-1 h-2.5 w-2.5 rounded-full ${
                  here
                    ? "bg-accent"
                    : done
                      ? "bg-ink"
                      : "bg-[var(--line-strong)]"
                }`}
                aria-hidden
              />
              {i < TRIP_STAGES.length - 1 ? (
                <span
                  className={`mt-1 w-px flex-1 min-h-[1.25rem] ${
                    done ? "bg-ink/40" : "bg-[var(--line)]"
                  }`}
                  aria-hidden
                />
              ) : null}
            </div>
            <div className={i < TRIP_STAGES.length - 1 ? "pb-2" : ""}>
              <p
                className={`text-sm font-semibold ${
                  here ? "text-ink" : done ? "text-ink-soft" : "text-muted"
                }`}
              >
                {step.label}
                {here ? (
                  <span className="ml-2 text-[0.62rem] tracking-[0.14em] text-accent uppercase">
                    Current
                  </span>
                ) : null}
              </p>
              {!compact || here ? (
                <p className="mt-1 text-sm leading-6 text-muted">{step.detail}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
