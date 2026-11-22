/**
 * Central XOENSOFT catalog. Product cards, product pages, download pages and
 * platform availability are all generated from this file.
 * A build only shows a download button when `downloadUrl` is set and
 * availability is "available". Web app URLs come from VITE_XS_*_URL env vars.
 */
export type Platform = "windows" | "macos" | "linux" | "android" | "web";
export type Availability = "available" | "coming-soon";
export type ProductStatus = "available" | "beta" | "in-development";

export interface PlatformBuild {
  platform: Platform;
  packageType: string;
  downloadUrl?: string | undefined;
  fileSize?: string | undefined;
  minimumRequirements: string;
  availability: Availability;
}
export interface Release {
  version: string;
  releaseDate?: string | undefined;
  releaseNotes: string[];
  status: "stable" | "preview" | "planned";
  builds: PlatformBuild[];
}
export interface Feature {
  title: string;
  body: string;
}
export interface Product {
  slug: string;
  name: string;
  short: string;
  domain: string;
  category: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  webAppUrl?: string | undefined;
  openLabel: string;
  preview: "code" | "ai" | "meet" | "sheets" | "writer" | "slides" | "one";
  sections: Feature[];
  useCases: string[];
  release: Release;
}

const env = import.meta.env as Record<string, string | undefined>;

const WIN = "Windows 10 (64-bit) or later";
const MAC = "macOS 12 Monterey or later · Apple silicon & Intel";
const LNX = "Ubuntu 22.04+, Fedora 38+, Debian 12+";
const AND = "Android 9.0 (API 28) or later";

function planned(platforms: Platform[]): PlatformBuild[] {
  const map: Record<Platform, PlatformBuild> = {
    windows: {
      platform: "windows",
      packageType: ".exe installer",
      minimumRequirements: WIN,
      availability: "coming-soon",
    },
    macos: {
      platform: "macos",
      packageType: ".dmg",
      minimumRequirements: MAC,
      availability: "coming-soon",
    },
    linux: {
      platform: "linux",
      packageType: ".deb · .rpm · AppImage",
      minimumRequirements: LNX,
      availability: "coming-soon",
    },
    android: {
      platform: "android",
      packageType: ".apk",
      minimumRequirements: AND,
      availability: "coming-soon",
    },
    web: {
      platform: "web",
      packageType: "Web application",
      minimumRequirements: "Latest Chrome, Edge, Firefox or Safari",
      availability: "coming-soon",
    },
  };
  return platforms.map((p) => map[p]);
}

function withWeb(builds: PlatformBuild[], url?: string): PlatformBuild[] {
  return builds.map((b) =>
    b.platform === "web" && url ? { ...b, availability: "available", downloadUrl: url } : b,
  );
}

const oneUrl = env["VITE_XS_ONE_URL"] || "/one";

export const products: Product[] = [
  {
    slug: "xs-codedesk",
    name: "XS CodeDesk",
    short: "CodeDesk",
    domain: "Development",
    category: "Developer workspace",
    tagline: "The workspace where serious code gets written.",
    description:
      "A modern development environment with a fast editor, integrated terminal, source control and project tooling in one calm workspace.",
    status: "in-development",
    webAppUrl: env["VITE_XS_CODEDESK_URL"],
    openLabel: "Open CodeDesk",
    preview: "code",
    sections: [
      {
        title: "Development workspace",
        body: "Split editors, a file explorer and an integrated terminal arranged around how you actually work.",
      },
      {
        title: "Developer productivity",
        body: "Command palette, multi-cursor editing and keyboard-first navigation keep your hands on the keys.",
      },
      {
        title: "Code management",
        body: "Built-in source control with diffs, branches and staged changes visible at a glance.",
      },
      {
        title: "Development tools",
        body: "Language-aware syntax highlighting, search across projects and task runners.",
      },
    ],
    useCases: ["Full-stack web projects", "Scripting and automation", "Teaching and code review"],
    release: {
      version: "0.9.0",
      status: "planned",
      releaseNotes: [
        "Editor core and file explorer",
        "Integrated terminal",
        "Source control panel",
      ],
      builds: planned(["windows", "macos", "linux", "web"]),
    },
  },
  {
    slug: "xs-overmind",
    name: "XS OverMind AI",
    short: "OverMind",
    domain: "Intelligence",
    category: "AI assistant",
    tagline: "The intelligence layer of the ecosystem.",
    description:
      "An AI assistant for conversations, knowledge and documents — built to help you think, write and decide faster.",
    status: "in-development",
    webAppUrl: env["VITE_XS_OVERMIND_URL"],
    openLabel: "Open OverMind",
    preview: "ai",
    sections: [
      {
        title: "Intelligent conversations",
        body: "Ask, refine and follow up in natural language with context that carries through.",
      },
      {
        title: "Knowledge assistance",
        body: "Get clear explanations, summaries and structured answers to complex questions.",
      },
      {
        title: "Document understanding",
        body: "Bring in reports and notes, and ask questions directly about their content.",
      },
      {
        title: "Productivity workflows",
        body: "Draft emails, outline plans and turn rough notes into finished work.",
      },
    ],
    useCases: ["Research and summaries", "Drafting and editing", "Planning and brainstorming"],
    release: {
      version: "0.5.0",
      status: "planned",
      releaseNotes: ["Conversation workspace", "Document Q&A", "Saved threads"],
      builds: planned(["windows", "macos", "android", "web"]),
    },
  },
  {
    slug: "xs-meet",
    name: "XS Meet",
    short: "Meet",
    domain: "Communication",
    category: "Video conferencing",
    tagline: "Meetings that simply work.",
    description:
      "Video and audio meetings with screen sharing and meeting rooms — reliable, clear and professional.",
    status: "in-development",
    webAppUrl: env["VITE_XS_MEET_URL"],
    openLabel: "Open Meet",
    preview: "meet",
    sections: [
      {
        title: "Video conferencing",
        body: "Crisp video with an interface that stays out of the conversation.",
      },
      { title: "Audio meetings", body: "Join by voice alone when you're on the move." },
      { title: "Meeting rooms", body: "Persistent rooms for teams, with links that never change." },
      { title: "Screen sharing", body: "Share a window, a tab or your whole screen in one click." },
    ],
    useCases: ["Team stand-ups", "Client calls", "Remote workshops"],
    release: {
      version: "0.4.0",
      status: "planned",
      releaseNotes: ["Video and audio calls", "Screen sharing", "Meeting rooms"],
      builds: planned(["windows", "macos", "linux", "android", "web"]),
    },
  },
  {
    slug: "xs-sheets",
    name: "XS Sheets",
    short: "Sheets",
    domain: "Data",
    category: "Spreadsheets",
    tagline: "Numbers, organised beautifully.",
    description:
      "A professional spreadsheet for organising data, running calculations and turning tables into clear charts.",
    status: "in-development",
    webAppUrl: env["VITE_XS_SHEETS_URL"],
    openLabel: "Open Sheets",
    preview: "sheets",
    sections: [
      {
        title: "Spreadsheet workspace",
        body: "A fast grid with frozen rows, multiple sheets and precise formatting.",
      },
      {
        title: "Formulas and calculations",
        body: "Familiar functions for maths, text, dates and lookups.",
      },
      {
        title: "Charts and visualisations",
        body: "Turn any range into a clean chart that updates with your data.",
      },
      { title: "Collaboration", body: "Share workbooks and comment on cells with your team." },
    ],
    useCases: ["Budgets and forecasts", "Inventory tracking", "Reporting"],
    release: {
      version: "0.6.0",
      status: "planned",
      releaseNotes: ["Grid and formulas", "Charts", "CSV and XLSX import"],
      builds: planned(["windows", "macos", "linux", "web"]),
    },
  },
  {
    slug: "xs-writer",
    name: "XS Writer",
    short: "Writer",
    domain: "Documents",
    category: "Documents",
    tagline: "Write with clarity. Publish with confidence.",
    description:
      "A minimalist document editor with professional typography, page formatting and export to the formats you need.",
    status: "in-development",
    webAppUrl: env["VITE_XS_WRITER_URL"],
    openLabel: "Open Writer",
    preview: "writer",
    sections: [
      {
        title: "Document editor",
        body: "A focused writing surface with styles, lists, tables and images.",
      },
      {
        title: "Professional typography",
        body: "Carefully tuned type scales and spacing for documents that read well.",
      },
      {
        title: "Page formatting",
        body: "Margins, headers, footers and page breaks for print-ready output.",
      },
      { title: "Export options", body: "Export to PDF and DOCX without losing your layout." },
    ],
    useCases: ["Reports and proposals", "Letters and contracts", "Long-form writing"],
    release: {
      version: "0.6.0",
      status: "planned",
      releaseNotes: ["Rich text editor", "Page layout", "PDF and DOCX export"],
      builds: planned(["windows", "macos", "linux", "web"]),
    },
  },
  {
    slug: "xs-presentation",
    name: "XS Presentation",
    short: "Presentation",
    domain: "Creativity",
    category: "Presentations",
    tagline: "Ideas, presented with presence.",
    description:
      "Create refined slides with professional layouts, typography, transitions and a distraction-free presenter mode.",
    status: "in-development",
    webAppUrl: env["VITE_XS_PRESENTATION_URL"],
    openLabel: "Open Presentation",
    preview: "slides",
    sections: [
      { title: "Slide creation", body: "Compose slides quickly with smart guides and alignment." },
      {
        title: "Professional layouts",
        body: "A library of balanced layouts and templates to start from.",
      },
      {
        title: "Animations and transitions",
        body: "Restrained motion that guides attention instead of stealing it.",
      },
      {
        title: "Presentation mode",
        body: "Presenter view with notes, timer and next-slide preview.",
      },
    ],
    useCases: ["Pitch decks", "Lectures", "Quarterly reviews"],
    release: {
      version: "0.5.0",
      status: "planned",
      releaseNotes: ["Slide editor", "Templates", "Presenter mode"],
      builds: planned(["windows", "macos", "web"]),
    },
  },
  {
    slug: "xs-one",
    name: "XS One",
    short: "XS One",
    domain: "Productivity",
    category: "Task management",
    tagline: "Every task. One place.",
    description:
      "Personal and team task management with projects, to-do lists, scheduling, reminders and a progress dashboard — the evolution of WorkOS.",
    status: "beta",
    webAppUrl: oneUrl,
    openLabel: "Open XS One",
    preview: "one",
    sections: [
      {
        title: "Personal & team tasks",
        body: "Capture tasks for yourself or assign them across your team.",
      },
      { title: "Projects and lists", body: "Group work into projects and focused to-do lists." },
      {
        title: "Scheduling and reminders",
        body: "Due dates and priorities keep the important things in view.",
      },
      { title: "Productivity dashboard", body: "See progress across projects at a glance." },
    ],
    useCases: ["Daily planning", "Team sprints", "Personal goals"],
    release: {
      version: "1.0.0-beta",
      releaseDate: "2026-11-18",
      status: "preview",
      releaseNotes: [
        "Web app beta with projects, tasks, priorities and due dates",
        "Progress dashboard",
        "Android and desktop apps in development",
      ],
      builds: withWeb(planned(["web", "android", "windows", "macos", "linux"]), oneUrl),
    },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const platformLabel: Record<Platform, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
  android: "Android",
  web: "Web",
};

export const statusLabel: Record<ProductStatus, string> = {
  available: "Available",
  beta: "Public beta",
  "in-development": "In development",
};

export const isDownloadable = (b: PlatformBuild) =>
  b.availability === "available" && !!b.downloadUrl;
