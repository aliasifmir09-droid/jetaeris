import { DesignedSky } from "@/components/jesko/DesignedSky";

/** Corner radius with flat sides — tall bizjet window, not a pill or circle. */
export const CABIN_WINDOW_RADIUS = "96px";

/**
 * Private-jet cabin window: tall rounded rectangle with light acrylic
 * interior trim, dark gasket, shade rail, and recessed designed sky.
 */
export function CabinWindow() {
  return (
    <div
      data-window-frame
      className="cabin-window relative will-change-transform"
      style={{ borderRadius: CABIN_WINDOW_RADIUS }}
    >
      <div className="cabin-window-pocket absolute inset-0" aria-hidden />
      <div className="cabin-window-gasket absolute inset-[2.8%]" aria-hidden />
      <div className="cabin-window-trim absolute inset-[5%]" aria-hidden />
      <div className="cabin-window-lip absolute inset-[11%]" aria-hidden />

      <div className="cabin-window-aperture absolute inset-[13%] overflow-hidden">
        <div
          data-window-sky
          className="absolute inset-0 will-change-transform"
          role="img"
          aria-label="Designed dusk sky through a private jet cabin window"
        >
          <DesignedSky />
        </div>

        <div className="cabin-window-glass pointer-events-none absolute inset-0" aria-hidden />
        <div className="cabin-window-specular pointer-events-none absolute inset-0" aria-hidden />

        {/* Dual-pane shade assembly at the top of the glass */}
        <div className="cabin-window-shade-assembly pointer-events-none absolute inset-x-0 top-0" aria-hidden>
          <div className="cabin-window-shade-track" />
          <div className="cabin-window-shade-bar" />
        </div>
      </div>
    </div>
  );
}
