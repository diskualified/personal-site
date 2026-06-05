export type NodeKind = "quest" | "loot" | "npc" | "boss";

export type JourneyNode = {
  id: string;
  kind: NodeKind;
  label: string;
  title: string;
  body: string;
};

export type Chapter = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  body: string;
  nodes?: JourneyNode[];
};

export const chapters: Chapter[] = [
  {
    id: "origin",
    number: "01",
    title: "origin",
    subtitle: "before the journey began",
    body: "From Boston, MA, my first hello world happens in 2019. At the time, Asian-American representation in media is a big inspiration. I'm determined to find an intersection between technology and entertainment",
    nodes: [
      {
        id: "first-website",
        kind: "loot",
        label: "item acquired",
        title: "shipped my first website",
        body: "Sticky keys, glowing letters, infinite possibility. The original tool.",
      },
    ],
  },
  {
    id: "the call",
    number: "02",
    title: "the call",
    subtitle: "discovering the craft",
    body: "I get a taste at Nickelodeon. I realize I want to continue to create real impact for communities in need through software engineering.",
    nodes: [
      {
        id: "college",
        kind: "quest",
        label: "side quest complete",
        title: "college years",
        body: "It was ugly. It was online. It was mine. +10 XP.",
      },
    ],
  },
  {
    id: "gauntlet",
    number: "03",
    title: "the gauntlet",
    subtitle: "making things people use",
    body: "After squashing bugs, late nights, and some luck, I join ShareWell, focused on reshaping mental health beyond traditional therapy and growing accessibility to peer support group communities.",
    nodes: [
      {
        id: "first-job",
        kind: "boss",
        label: "boss defeated",
        title: "first full-time role",
        body: "Walked in nervous, walked out with a teammate badge and a much bigger skill tree.",
      },
      {
        id: "mentor",
        kind: "npc",
        label: "ally joined",
        title: "met a mentor",
        body: "Taught me to read code like a story, not a textbook.",
      },
    ],
  },
  {
    id: "build",
    number: "04",
    title: "new worlds",
    subtitle: "first real challenges",
    body: "I collaborated directly with the CPO and Head of Engineering daily to drive the development of new features on ShareWell. My biggest impacts include reworking the landing page flows, redesigning online group call UI/UX, data analytics for business model optimization, and end-to-end registration waitlist flows. From frontend to fullstack, shipped features led to +50% reduced user acquisition costs, increased user conversion rates, and led to live positive feedback from our users.",
    nodes: [
      {
        id: "project-alpha",
        kind: "loot",
        label: "artifact crafted",
        title: "rag project",
        body: "A little tool that helped a lot of people.",
      },
      {
        id: "project-beta",
        kind: "loot",
        label: "artifact crafted",
        title: "agentic workflows",
        body: "An experiment that turned into a community.",
      },
    ],
  },
  {
    id: "now",
    number: "05",
    title: "the present",
    subtitle: "where i am today",
    body: "Now in the world of AI, I am navigating the unknowns and evolving my skills with the new technologies. Currently experimenting with how AI can build a better world.",
    nodes: [
      {
        id: "collab",
        kind: "npc",
        label: "party slot open",
        title: "want to collaborate?",
        body: "Find me below — or send a raven to hello@example.com.",
      },
    ],
  },
];
