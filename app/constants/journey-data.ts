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
    body: "Everyone starts somewhere. I'm an Asian-American kid from Boston, MA.",
    nodes: [
      {
        id: "first-keyboard",
        kind: "loot",
        label: "item acquired",
        title: "first keyboard",
        body: "Sticky keys, glowing letters, infinite possibility. The original tool.",
      },
    ],
  },
  {
    id: "the call",
    number: "02",
    title: "the call",
    subtitle: "discovering the craft",
    body: "The first hello world in 2019. At the same time, Asian-American representation in media is a big inspiration. I'm determined to find an intersection between technology and entertainment.",
    nodes: [
      {
        id: "first-site",
        kind: "quest",
        label: "side quest complete",
        title: "shipped my first website",
        body: "It was ugly. It was online. It was mine. +10 XP.",
      },
    ],
  },
  {
    id: "gauntlet",
    number: "03",
    title: "the gauntlet",
    subtitle: "making things people use",
    body: "After Nickelodeon, I realize I want to continue to create real impact for communities in need. By squashing bugs, late nights, and some luck, I join ShareWell, focused on reshaping mental health beyond traditional therapy and growing accessibility to peer support group communities.",
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
    body: "From frontend to fullstack, each shipped feature unlocks a new skill in the tree. Now in the world of AI, I am navigating the unknowns and evolving my skills with the new technologies.",
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
    body: "Still leveling up, as fast as ever. Currently exploring how AI can build a better world.",
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
