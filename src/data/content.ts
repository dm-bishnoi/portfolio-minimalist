// Single source of truth for all portfolio copy.
// Every fact here is verified — from the candidate directly, or from the
// referenced repository/codebase. Nothing here is invented. Edit this file
// to correct or extend facts; layout/components should not hardcode copy.

export const profile = {
  name: "Dharmender Bishnoi",
  role: "Angular Developer · Frontend Engineer",
  experience: "6 years",
  stack: ["Angular", "TypeScript", "RxJS"],
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
      points: [
        "Built configurable Angular components for enterprise CRM modules",
        "Built reusable directives, pipes, and services to keep a single way of doing things across the codebase",
      ],
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
      points: [
        "Set up lazy-loaded routes and managed subscription lifecycle",
        "Used NgRx for state management once application complexity called for it",
      ],
    },
    {
      label: "Quality & performance",
      points: [
        "Wrote and maintained unit tests with Jasmine and Karma",
        "Debugged cross-browser UI issues and performance bottlenecks with Chrome DevTools and Angular Augury",
        "Kept the codebase consistent through code review, ESLint, and Prettier",
      ],
    },
  ],
  tech: ["Angular", "TypeScript", "RxJS", "NgRx", "Angular Material", "REST APIs", "Jasmine", "Karma"],
};

export const projects = [
  {
    id: "flexschema",
    name: "Flexschema",
    kind: "Enterprise CRM — built at Pizone Infotech",
    year: "2020 — Present",
    tech: ["Angular", ".NET", "SQL Server", "REST APIs"],
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
  },
  {
    id: "webbugpilot",
    name: "WebBugPilot",
    kind: "Personal project — local-first AI web testing tool",
    year: "In development",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express", "Playwright", "Ollama"],
    context:
      "A developer tool that autonomously tests a web app running on your machine: describe what to check in plain English, and a Playwright-driven agent — reasoning via a local Ollama model or an optional cloud provider — drives a real browser, watches for broken behavior, and reports bugs with screenshots and evidence. The pipeline is built and wired end-to-end: run creation, the agent loop, live streaming, and bug detection all run.",
    problem:
      "Manual click-through QA is repetitive and easy to under-test. I built an agent that drives a real browser against a real running app, reasons about what it observes at each step, and reports genuine defects — like a failed network request the UI never surfaces to the user — without inventing findings.",
    contribution:
      "Built the full pipeline end-to-end: a Playwright-controlled browser with a live in-page status overlay and a human-interaction lock during automated runs; an agent loop that turns page state (interactive elements, recent network/console activity) into commands — click, type, scroll, report a bug, and so on; progress streamed to the frontend in real time over Server-Sent Events and rendered as a live screenshot feed with an animated cursor; bug fingerprinting to dedupe repeated findings; and support for multiple AI backends, a local Ollama model by default with OpenRouter, Gemini, and others available as cloud options.",
    honestScope:
      "This is a personal project, not a deployed public product. The autonomous pipeline — browser automation, the reasoning loop, live streaming, and bug detection — is fully built and wired end-to-end. Two real limits: persistence is a simple per-user JSON file store rather than a database, and there's no standalone report-file export yet — findings are viewed in the app, not exported as a document.",
    links: {
      github: "https://github.com/dm-bishnoi/WebBugPilot",
    },
  },
  {
    id: "ignytis",
    name: "Ignytis",
    kind: "Personal project — interactive coding learning platform",
    year: "In development",
    tech: ["Angular", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Docker"],
    context:
      "A coding education platform — watch lessons, write and run code, work through practice challenges, and track progress — built as a monorepo with an Angular frontend, a NestJS API, and a separate sandboxed code-execution service.",
    problem:
      "Letting learners run arbitrary code needs real isolation, not an editor with a fake 'run' button. I wanted genuine sandboxed execution — with test harnesses for practice challenges — plus the course and progress data model to back a real learning flow, not a static content site.",
    contribution:
      "Designed and built the monorepo: the Angular frontend (courses, lessons, practice challenges, dashboard, progress tracking), the NestJS API with Prisma-backed course, enrollment, and lesson-progress logic, and a separate Docker-based code-execution service with a language registry and challenge test harnesses, streamed back to the API over a server-sent-event pipeline (queued, started, stdout/stderr, complete or error).",
    honestScope:
      "This is an in-progress personal project, not a live public product. The course, lesson, and execution modules have real, tested backend logic and a working sandboxed execution service; some frontend areas — workspace, settings, profile — are comparatively early and thinner than the core course/lesson/practice flow.",
    links: {
      github: "https://github.com/dm-bishnoi/Ignytis",
    },
  },
];

export const ignytisSpecs = [
  { label: "Frontend", value: "Angular 20 · Standalone · Signals · Zoneless" },
  { label: "Backend", value: "NestJS · PostgreSQL · Prisma" },
  { label: "Execution", value: "Docker sandbox" },
  { label: "Product", value: "Courses · Lessons · Challenges · Progress" },
];

export const webBugPilotStatement =
  "Describe what to test — it drives a real browser and finds real bugs.";

export const webBugPilotSpecs = [
  { label: "Browser automation", value: "Real Chromium via Playwright" },
  { label: "AI reasoning", value: "Plan → act → observe → report" },
  { label: "Providers", value: "Local Ollama, plus optional cloud providers" },
  { label: "Evidence", value: "Screenshots · console · network · findings" },
];

export const evidenceNodes = [
  { id: "flexschema", label: "Flexschema", href: "#flexschema" },
  { id: "webbugpilot", label: "WebBugPilot", href: "#webbugpilot" },
  { id: "ignytis", label: "Ignytis", href: "#ignytis" },
  { id: "hero", label: "This site", href: "#hero" },
] as const;

export type EvidenceNodeId = (typeof evidenceNodes)[number]["id"];

export const capabilities = {
  eyebrow: "Capabilities",
  items: [
    {
      title: "Product & Systems Thinking",
      evidence: "Shaping the permission model at Flexschema, and the monorepo and service boundaries at Ignytis.",
      sources: ["flexschema", "ignytis"] as EvidenceNodeId[],
    },
    {
      title: "Frontend Engineering",
      evidence: "Five years of production Angular, plus a React/TypeScript frontend built for WebBugPilot — component architecture, state, routing, tests.",
      sources: ["flexschema", "webbugpilot"] as EvidenceNodeId[],
    },
    {
      title: "Design Systems & UI Architecture",
      evidence: "Configurable, reusable component modules built for real enterprise CRM workflows.",
      sources: ["flexschema"] as EvidenceNodeId[],
    },
    {
      title: "Systems & Platform Architecture",
      evidence: "A monorepo with a separate, isolated sandboxed code-execution service, kept out of the main API by design.",
      sources: ["ignytis"] as EvidenceNodeId[],
    },
    {
      title: "Real-Time Engineering",
      evidence: "Server-sent event streams for live progress on code execution — queued, started, output, complete or error.",
      sources: ["ignytis"] as EvidenceNodeId[],
    },
    {
      title: "Motion & Creative Development",
      evidence: "Structure, animation, and interaction built end-to-end with React, TypeScript, and Framer Motion.",
      sources: ["hero"] as EvidenceNodeId[],
    },
  ],
};

export const about = {
  eyebrow: "About",
  body: [
    "I work across the line that usually separates design from engineering — deciding how something should look and behave, and then building it myself.",
    "That comes from five years of shipping Angular applications inside a real production environment, and from building my own systems — like Ignytis's sandboxed code-execution service and WebBugPilot's local-first developer tooling — the rest of the time.",
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
