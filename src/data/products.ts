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
  icon?: FeatureIcon | undefined;
}
export type FeatureIcon =
  | "video"
  | "zap"
  | "shield"
  | "screen"
  | "pen"
  | "chat"
  | "users"
  | "crown"
  | "penline"
  | "folder"
  | "file"
  | "download"
  | "building"
  | "save"
  | "lock";
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
  /** Optional richer product-page content (used by launched products). */
  heroHeadline?: string | undefined;
  heroDescription?: string | undefined;
  launchLabel?: string | undefined;
  howItWorks?: Feature[] | undefined;
  screenshot?: "room" | "landing" | "editor" | undefined;
  logo?: "mark" | "wordmark" | undefined;
  finalCta?: { heading: string; body: string } | undefined;
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
// Official production deployment of the XS Meet web application.
const meetUrl = env["VITE_XS_MEET_URL"] || "https://xsmeet-xoensoft-official.pages.dev";
// Official production deployment of the XS Writer web application.
const writerUrl = env["VITE_XS_WRITER_URL"] || "https://xs-writer-xoensoft-official.pages.dev";

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
    category: "Online meetings & collaboration",
    tagline: "Meet. Connect. Collaborate.",
    description:
      "XS Meet is a modern online meeting and real-time collaboration platform designed to make virtual communication simple, seamless, and reliable.",
    status: "available",
    webAppUrl: meetUrl,
    openLabel: "Launch XS Meet",
    launchLabel: "Launch XS Meet",
    preview: "meet",
    heroHeadline: "Meet. Connect. Collaborate.",
    heroDescription:
      "Experience seamless online meetings with real-time video, audio, screen sharing, and interactive collaboration — all in one platform.",
    screenshot: "room",
    logo: "wordmark",
    finalCta: {
      heading: "Ready to connect with XS Meet?",
      body: "Start your next meeting with XOENSOFT's online meeting platform.",
    },
    sections: [
      {
        title: "HD Audio & Video Meetings",
        body: "Crystal-clear video and audio so every call feels like you're in the same room.",
        icon: "video",
      },
      {
        title: "Instant Meeting Creation",
        body: "Start a meeting in seconds or join instantly with a shared link — no scheduling required.",
        icon: "zap",
      },
      {
        title: "Secure Waiting Room",
        body: "Control who enters your meeting with an admission lobby and host-approved entry.",
        icon: "shield",
      },
      {
        title: "Screen Sharing",
        body: "Share your screen, window or tab to walk everyone through exactly what matters.",
        icon: "screen",
      },
      {
        title: "Interactive Whiteboard",
        body: "Sketch, annotate and brainstorm together on a shared canvas during live sessions.",
        icon: "pen",
      },
      {
        title: "Real-Time Meeting Chat",
        body: "Keep the conversation going with in-meeting chat — questions, links and quick replies.",
        icon: "chat",
      },
      {
        title: "Participant Management",
        body: "See who is in the room, mute or remove participants, and keep sessions organised.",
        icon: "users",
      },
      {
        title: "Host & Co-host Controls",
        body: "Full control over admission, sharing and moderation — with co-hosts for larger teams.",
        icon: "crown",
      },
    ],
    useCases: [
      "Team stand-ups and daily syncs",
      "Client calls and demos",
      "Remote workshops and training",
      "Interviews and all-hands meetings",
    ],
    howItWorks: [
      {
        title: "Create or Join",
        body: "Start an instant meeting or join using a meeting link.",
      },
      {
        title: "Connect",
        body: "Communicate through live audio and video with every participant.",
      },
      {
        title: "Collaborate",
        body: "Share your screen, use the whiteboard, and interact through chat.",
      },
    ],
    release: {
      version: "1.0.0",
      releaseDate: "November 2026",
      status: "stable",
      releaseNotes: [
        "HD audio and video meetings",
        "Screen sharing and interactive whiteboard",
        "Meeting chat and participant management",
        "Secure waiting room with host controls",
        "Meeting history",
      ],
      builds: withWeb(planned(["web", "windows", "macos", "linux", "android"]), meetUrl),
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
    domain: "Productivity & Document Creation",
    category: "Document creation & editing",
    tagline: "Create. Edit. Organize. Collaborate.",
    description:
      "XS Writer is a professional document creation and editing platform by XOENSOFT, featuring rich-text editing, document organization, collaboration, DOCX compatibility and multiple export formats.",
    status: "available",
    webAppUrl: writerUrl,
    openLabel: "Launch XS Writer",
    launchLabel: "Launch XS Writer",
    preview: "writer",
    heroHeadline: "Create. Edit. Organize. Collaborate.",
    heroDescription:
      "XS Writer is a professional document creation and editing platform designed to simplify document workflows. Create and format documents, organize files, collaborate with authorized users and export your work into multiple formats.",
    screenshot: "editor",
    finalCta: {
      heading: "Ready to write with XS Writer?",
      body: "Start creating professional documents with XOENSOFT's document platform.",
    },
    sections: [
      {
        title: "Professional Rich-Text Editor",
        body: "Format text, headings, lists and more in a clean, focused writing surface.",
        icon: "penline",
      },
      {
        title: "Document Organization and Folders",
        body: "Keep every document structured with folders and an organised workspace.",
        icon: "folder",
      },
      {
        title: "DOCX Import and Export",
        body: "Open and save industry-standard DOCX files without losing your work.",
        icon: "file",
      },
      {
        title: "PDF, HTML, Markdown and TXT Export",
        body: "Export your documents into the formats you need — PDF, HTML, Markdown and plain text.",
        icon: "download",
      },
      {
        title: "Personal and Organization Workspaces",
        body: "Work in a personal space or collaborate inside a shared organization workspace.",
        icon: "building",
      },
      {
        title: "Autosave and Document Recovery",
        body: "Your work saves automatically, with recovery to protect against lost changes.",
        icon: "save",
      },
      {
        title: "Secure Document Access",
        body: "Documents stay protected behind XOENSOFT authentication and access controls.",
        icon: "lock",
      },
      {
        title: "Collaboration Features",
        body: "Share and work on documents with authorized users in real time.",
        icon: "users",
      },
    ],
    useCases: [
      "Reports and proposals",
      "Contracts and letters",
      "Team documentation",
      "Long-form writing",
    ],
    release: {
      version: "1.0.0",
      releaseDate: "November 2026",
      status: "stable",
      releaseNotes: [
        "Rich-text document editor",
        "Document organization with folders",
        "DOCX, PDF, HTML, Markdown and TXT export",
        "Personal and organization workspaces",
        "Autosave with document recovery",
      ],
      builds: withWeb(planned(["windows", "macos", "linux", "android"]), writerUrl),
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
        "Android beta available now — desktop apps in development",
      ],
      builds: withWeb(
        planned(["web", "android", "windows", "macos", "linux"]).map((b) =>
          b.platform === "android"
            ? {
                ...b,
                availability: "available" as const,
                downloadUrl:
                  "https://github.com/workingosofficial-org/xoensoft/releases/download/v1.0.0-beta/xs-one-1.0.0-beta.apk",
                fileSize: "27 MB",
              }
            : b,
        ),
        oneUrl,
      ),
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
