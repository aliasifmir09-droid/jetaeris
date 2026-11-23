import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = [
  "/",
  "/quote",
  "/how-it-works",
  "/empty-legs",
  "/safety",
  "/about",
  "/routes",
  "/routes/new-york-miami",
  "/routes/los-angeles-las-vegas",
  "/charter/new-york",
  "/charter/miami",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" || path.includes("empty") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.includes("quote") || path.includes("routes") ? 0.9 : 0.7,
  }));
}
