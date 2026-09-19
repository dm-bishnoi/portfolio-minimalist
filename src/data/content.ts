// Single source of truth for all portfolio copy.
// Every fact here is verified — from the candidate directly, or from the
// referenced repository/codebase. Nothing here is invented. Edit this file
// to correct or extend facts; layout/components should not hardcode copy.

export const profile = {
  name: "Dharmender Bishnoi",
  role: "Senior Product Designer / Frontend Engineer",
  positioning:
    "I bridge product design and frontend engineering — turning complex product ideas into polished, high-quality digital experiences.",
  location: "India",
};

export const contact = {
  email: "bishnoid770@gmail.com",
  github: "https://github.com/dm-bishnoi",
  linkedin: "https://www.linkedin.com/in/dharmender-bishnoi-7ba664176",
};

export const pov = {
  eyebrow: "How I work",
  statement:
    "Most products lose something in the handoff between the person who decided how it should feel and the person who built it. I try to remove that gap — deciding the interaction and shipping the code myself, so the design intent survives contact with the real constraints of a browser.",
  pillars: [
    {
      title: "Design decisions, made in code",
      body: "Interfaces are specified precisely enough to build, then built by the same person who specified them — nothing lost in translation.",
    },
    {
      title: "Systems over screens",
      body: "Reusable components, clear state boundaries, and access rules that hold up as a product grows past its first version.",
    },
    {
      title: "Craft is in the details you don't notice",
      body: "Motion, spacing, and response time matter because their absence is what makes software feel cheap.",
    },
  ],
};

export const experience = {
  eyebrow: "Experience",
  role: "Angular Developer",
  company: "Pizone Infotech Pvt. Ltd.",
  period: "Sep 2020 — Present",
  summary:
    "Developing and maintaining Angular applications that support enterprise business operations — reusable components, integrated APIs, access-controlled interfaces, kept responsive across browsers.",
  areas: [
    {
      label: "Component architecture",
      points: ["Built configurable Angular components for enterprise CRM modules"],
    },
    {
      label: "Access & integration",
      points: [
        "Implemented role-based access control across application features",
        "Integrated RESTful APIs using HttpClient with RxJS patterns",
      ],
    },
    {
      label: "Routing & state",
      points: ["Set up lazy-loaded routes and managed subscription lifecycle"],
    },
    {
      label: "Quality & performance",
      points: [
        "Wrote and maintained unit tests with Jasmine and Karma",
        "Debugged cross-browser UI issues and performance bottlenecks",
      ],
    },
  ],
  tech: ["Angular", "TypeScript", "RxJS", "REST APIs", "Jasmine", "Karma"],
};

export const projects = [
  {
    id: "flexschema",
    name: "Flexschema",
    kind: "Enterprise CRM — built at Pizone Infotech",
    year: "2020 — Present",
    tech: ["Angular", ".NET", "SQL Server"],
    quickFacts: [
      "Angular frontend",
      "Role-based access control",
      "Configurable CRM modules",
      "In production since 2020",
    ],
    context:
      "An enterprise CRM platform used by business teams to manage customers, workflows, and permissions. My role has been the Angular frontend.",
    problem:
      "Business teams needed configurable UI modules and permission boundaries that could adapt per workflow, without every change becoming a one-off frontend rebuild.",
    contribution:
      "Built and maintained the Angular features end to end: reusable, configurable components for CRM modules, role-based access control across features, REST API integration via HttpClient and RxJS, and lazy-loaded routing with managed subscription lifecycles.",
    honestScope:
      "This is ongoing, in-production employer work — presented here as an engineering case study, not a personal project. Business metrics and team composition are not disclosed.",
    diagram: "rbac",
  },
  {
    id: "card-play",
    name: "Card-Play Platform",
    kind: "Personal project — multi-game card platform",
    year: "In development",
    tech: ["NestJS", "Prisma", "PostgreSQL", "Redis", "WebSockets", "React", "Vite", "Turborepo"],
    quickFacts: [
      "Turborepo monorepo",
      "NestJS + WebSocket gateway",
      "Plugin-based game engine",
      "Teen Patti — first plugin shipped",
    ],
    context:
      "A real-time multiplayer card game platform, structured as a monorepo: a NestJS API and WebSocket gateway, a React/Vite client and admin client, and a set of internal packages — a plugin-based game engine, a plugin API, replay, and analytics.",
    problem:
      "Multiplayer card games share most of their infrastructure — matchmaking, real-time state sync, replay, table management — but each game has different rules. I wanted that shared infrastructure built once, with individual games attached as isolated plugins rather than forked codebases.",
    contribution:
      "Designed and built the monorepo architecture: the plugin-based game-engine core and plugin-api contract, the NestJS/WebSocket real-time layer, and Teen Patti as the first game implemented against that plugin interface.",
    honestScope:
      "The platform is architected to support multiple games through its plugin system; Teen Patti is the game currently implemented against it. This is presented as an in-progress personal project, not a shipped, live product.",
    diagram: "plugin",
    links: {
      github: "https://github.com/dm-bishnoi/Card-Play",
    },
  },
];

export const capabilities = {
  eyebrow: "Capabilities",
  items: [
    {
      title: "Product & Systems Thinking",
      evidence: "Shaping the permission model and the plugin architecture, not just implementing a spec.",
      sources: [
        { label: "Flexschema", href: "#flexschema" },
        { label: "Card-Play", href: "#card-play" },
      ],
    },
    {
      title: "Frontend Engineering",
      evidence: "Five years of production Angular — component architecture, RxJS state, routing, tests.",
      sources: [
        { label: "Flexschema", href: "#flexschema" },
        { label: "Pizone Infotech", href: "#experience" },
      ],
    },
    {
      title: "Design Systems & UI Architecture",
      evidence: "Configurable, reusable component modules built for real enterprise CRM workflows.",
      sources: [{ label: "Flexschema", href: "#flexschema" }],
    },
    {
      title: "Systems & Platform Architecture",
      evidence: "A plugin-based game-engine core, designed so new games attach without touching engine logic.",
      sources: [{ label: "Card-Play", href: "#card-play" }],
    },
    {
      title: "Real-Time Engineering",
      evidence: "WebSocket gateway, Redis-backed state, and a replay system for real-time multiplayer.",
      sources: [{ label: "Card-Play", href: "#card-play" }],
    },
    {
      title: "Motion & Creative Development",
      evidence: "Structure, animation, and interaction built end-to-end with React, TypeScript, and Framer Motion.",
      sources: [{ label: "This site", href: "#hero" }],
    },
  ],
};

export const about = {
  eyebrow: "About",
  body: [
    "I work across the line that usually separates design from engineering — deciding how something should look and behave, and then building it myself.",
    "That comes from five years of shipping Angular applications inside a real production environment, and from building my own systems — like Card-Play's plugin architecture — the rest of the time.",
    "I care more about a product being coherent end to end than about any single screen looking impressive in isolation.",
  ],
};

export const nav = [
  { id: "hero", num: "00", label: "Intro" },
  { id: "pov", num: "01", label: "How I work" },
  { id: "work", num: "02", label: "Selected work" },
  { id: "capabilities", num: "03", label: "Capabilities" },
  { id: "experience", num: "04", label: "Experience" },
  { id: "about", num: "05", label: "About" },
  { id: "contact", num: "06", label: "Contact" },
];
