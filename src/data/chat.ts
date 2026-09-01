// Landing-page copy, isolated from markup so the storytelling can evolve
// without touching animation or layout code.

export type Side = "jasper" | "reader";

export interface ChatMessage {
  /** Who the message belongs to: jasper = left side, reader = right side. */
  side: Side;
  text: string;
}

/** The answer to "What's going on here?" — sits on the page statically. */
export const heroAnswer =
  "Building a space to \u2018express myself\u2019.";

/**
 * The scroll-revealed dialogue. Right side = the reader's hypothetical
 * thoughts/questions; left side = Jasper's replies.
 *
 * Copy continues after the final "..." — drop the rest of the storytelling
 * into this array as more messages.
 */
export const dialogue: ChatMessage[] = [
  {
    side: "reader",
    text: "About what? Who cares?",
  },
  {
    side: "jasper",
    text: "Nothing and no one \u2014 hopefully.",
  },
  {
    side: "jasper",
    text: "Writing is weird. Very self-conscious.",
  },
  {
    side: "reader",
    text: "Why?",
  },
  {
    side: "jasper",
    text:
      "It\u2019s always been my academic strength, and I particularly leaned into the " +
      "\u2018writer\u2019 identity in college through internships and big, nerdy projects. " +
      "But in the past year, my perspective on this passion was prompted to change.",
  },
  {
    side: "reader",
    text: "?",
  },
  {
    side: "jasper",
    text:
      "My passion was revealed to be not just an academic skill for which I could receive " +
      "praise, but the product of an acute and intensely impactful medical circumstance. " +
      "After experiencing spooky d\u00e9j\u00e0 vu and increased emotions throughout college, " +
      "during my final year I was diagnosed with temporal lobe seizures (and have been working " +
      "with the healthcare system to get my meds right ever since)\u2026",
  },
];