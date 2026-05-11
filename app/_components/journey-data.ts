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
    body: "Every protagonist starts somewhere quiet. A small town, a curiosity, a first computer humming late at night. The save file was created here.",
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
    id: "awakening",
    number: "02",
    title: "the awakening",
    subtitle: "discovering the craft",
    body: "A line of code returns hello, world. Something clicks. The map opens up and the first real quest begins.",
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
    subtitle: "first real challenges",
    body: "Bugs, deadlines, late nights. Each defeat earns experience; each shipped feature unlocks a new perk in the tree.",
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
    title: "building worlds",
    subtitle: "making things people use",
    body: "Side projects became side businesses. Tools became products. The map widened and the inventory filled up.",
    nodes: [
      {
        id: "project-alpha",
        kind: "loot",
        label: "artifact crafted",
        title: "project alpha",
        body: "A little tool that helped a lot of people.",
      },
      {
        id: "project-beta",
        kind: "loot",
        label: "artifact crafted",
        title: "project beta",
        body: "An experiment that turned into a community.",
      },
    ],
  },
  {
    id: "now",
    number: "05",
    title: "current quest",
    subtitle: "where i am today",
    body: "Still leveling up. Currently exploring (your current focus here). Always looking for the next interesting problem to side-quest into.",
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
