"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { filterLocations, type LocationOption } from "@/lib/locations";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  /** Dark chrome for hero strip */
  variant?: "light" | "dark";
  name?: string;
};

/**
 * Type-to-filter location list: opens suggestions as the customer types
 * city or airport (TEB, Miami, Aspen…). Free text still allowed.
 * Opens upward when there is not enough room below the field.
 */
export function SearchableList({
  id,
  label,
  value,
  onChange,
  placeholder = "Type a city or airport",
  required,
  variant = "light",
  name,
}: Props) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState(value);
  const [dropUp, setDropUp] = useState(false);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const options = useMemo(() => filterLocations(query, 10), [query]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useLayoutEffect(() => {
    if (!open || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const need = 280;
    setDropUp(spaceBelow < need && spaceAbove > spaceBelow);
  }, [open, options.length, query]);

  function pick(opt: LocationOption) {
    onChange(opt.value);
    setQuery(opt.value);
    setOpen(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(options.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && options[active]) {
      e.preventDefault();
      pick(options[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const dark = variant === "dark";
  const panelPos = dropUp
    ? "bottom-[calc(100%+4px)] top-auto"
    : "top-[calc(100%+4px)] bottom-auto";

  return (
    <div ref={rootRef} className={`relative ${dark ? "field-dark" : "field"}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          open && options[active] ? `${listId}-${options[active].id}` : undefined
        }
        autoComplete="off"
        placeholder={placeholder}
        required={required}
        value={query}
        onFocus={() => {
          setOpen(true);
          setActive(0);
        }}
        onChange={(e) => {
          const next = e.target.value;
          setQuery(next);
          onChange(next);
          setOpen(true);
          setActive(0);
        }}
        onKeyDown={onKeyDown}
      />
      {open && options.length > 0 ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          className={`absolute inset-x-0 ${panelPos} z-[60] max-h-64 overflow-auto border shadow-[0_18px_40px_rgba(0,0,0,0.28)] ${
            dark
              ? "border-white/20 bg-[#0a101c] text-white"
              : "border-[var(--line-strong)] bg-white text-ink"
          }`}
        >
          {!query.trim() ? (
            <li
              className={`px-3 py-2 text-[0.65rem] tracking-[0.14em] uppercase ${
                dark ? "text-white/45" : "text-muted"
              }`}
            >
              Popular locations — keep typing to search
            </li>
          ) : null}
          {options.map((opt, i) => {
            const selected = i === active;
            return (
              <li
                key={opt.id}
                id={`${listId}-${opt.id}`}
                role="option"
                aria-selected={selected}
              >
                <button
                  type="button"
                  className={`flex w-full flex-col items-start gap-0.5 px-3 py-2.5 text-left text-sm transition-colors ${
                    selected
                      ? dark
                        ? "bg-[#1e3a8a] text-white"
                        : "bg-[color-mix(in_srgb,var(--accent)_12%,white)]"
                      : dark
                        ? "hover:bg-white/8"
                        : "hover:bg-[color-mix(in_srgb,var(--paper-deep)_55%,white)]"
                  }`}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(opt)}
                >
                  <span className="font-semibold">{opt.label}</span>
                  <span
                    className={`text-xs ${
                      dark ? "text-white/55" : "text-muted"
                    }`}
                  >
                    {opt.kind === "airport"
                      ? `Airport · ${opt.city}`
                      : `City · ${opt.state}`}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
      {open && query.trim() && options.length === 0 ? (
        <div
          className={`absolute inset-x-0 ${panelPos} z-[60] border px-3 py-3 text-sm ${
            dark
              ? "border-white/20 bg-[#0a101c] text-white/70"
              : "border-[var(--line-strong)] bg-white text-muted"
          }`}
        >
          No matches — keep your custom city or airport name.
        </div>
      ) : null}
    </div>
  );
}
