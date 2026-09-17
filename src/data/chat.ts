// Landing-page copy, isolated from markup so the storytelling can evolve
// without touching animation or layout code.

export type Side = "jasper" | "reader";

export interface ChatMessage {
  /** Who the message belongs to: jasper = left side, reader = right side. */
  side: Side;
  text: string;
}

/** The answer to "What's going on here?" — sits on the page statically. */
export const heroAnswer = "Making space to write";

/**
 * The scroll-revealed dialogue. Right side = the reader's hypothetical
 * thoughts/questions; left side = Jasper's replies.
 */
export const dialogue: ChatMessage[] = [
  {
    side: "reader",
    text: "About what?",
  },
  {
    side: "reader",
    text: "Who cares?",
  },
  {
    side: "jasper",
    text: "Only me, I think. Right where we should be.",
  },
  {
    side: "jasper",
    text: "Stories. Sad machinations? Some pieces on culture or tech, maybe.",
  },
  {
    side: "reader",
    text: "Why?",
  },
  {
    side: "jasper",
    text:
      "I was slapped with new perspective(s) on my professional " +
      "identity after being diagnosed with frequent seizures in my temporal " +
      "lobe for the last four years. Aside from spooky déjà vu, side effects " +
      "include compulsion to write (hypergraphia) and unusual preoccupation " +
      "with moral/religious ideas.",
  },
  {
    side: "jasper",
    text:
      "This site is a way for me to work through my disability (and " +
      "passions) while living with my parents post-grad. Braving the " +
      "medical system for twelve months and counting, I'm grateful to be " +
      "able to focus much-needed attention on the pursuit of health. " +
      "Including the attempt to find solutions to various digital problems.",
  },
];