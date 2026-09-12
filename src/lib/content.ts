import type { CollectionEntry } from "astro:content";

/**
 * Shared content helpers. Keeps the publish/sort timezone logic in one place
 * so indexes, archives, RSS and tag pages all agree.
 */

/** Publishable = not a draft. Scheduling is separate (see isScheduled). */
export function isPublished(entry: CollectionEntry<"blog">): boolean {
  return !entry.data.draft;
}

/**
 * Scheduled posts: also require pubDate <= today. We compare YYYY-MM-DD
 * strings in the server's LOCAL date to avoid timezone off-by-one errors on
 * Date objects; a scheduled post goes live the first build after its date.
 */
export function isScheduled(entry: CollectionEntry<"blog">): boolean {
  if (entry.data.draft) return false;
  const today = new Date();
  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  const d = entry.data.pubDate;
  const dStr = [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
  return dStr <= todayStr;
}

/** Returns published, non-future posts sorted newest-first. */
export function getPublishedPosts(
  entries: CollectionEntry<"blog">[],
): CollectionEntry<"blog">[] {
  return entries
    .filter(isScheduled)
    .sort((a, b) => +b.data.pubDate - +a.data.pubDate);
}

/** Sort projects alphabetically by title (stable order for a portfolio). */
export function sortProjects(
  entries: CollectionEntry<"current">[],
): CollectionEntry<"current">[] {
  return [...entries].sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}