import type { Product } from "@/data/products";

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-2xl">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="ml-3 font-mono text-[11px] text-muted-foreground">{title}</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Interface preview
        </span>
      </div>
      <div className="aspect-[16/9] text-[11px] md:text-xs">{children}</div>
    </div>
  );
}
const Bar = ({ w, dim }: { w: string; dim?: boolean }) => (
  <div className={`h-2 rounded-sm ${dim ? "bg-elevated" : "bg-accent"}`} style={{ width: w }} />
);

function Code() {
  const lines = [
    ["import", " { createServer } ", "from", ' "xs/http";'],
    ["", "", "", ""],
    ["export async function", " handle", "(req) {", ""],
    ["  const", " user = ", "await", " db.users.find(req.id);"],
    ["  if", " (!user) ", "return", " notFound();"],
    ["  return", " json({ user });", "", ""],
    ["}", "", "", ""],
  ];
  return (
    <div className="grid h-full grid-cols-[150px_1fr] font-mono">
      <div className="space-y-2 border-r border-border p-4 text-muted-foreground">
        <p className="eyebrow !text-[9px]">Explorer</p>
        {["src/", "  server.ts", "  routes/", "  db.ts", "package.json"].map((f, i) => (
          <p key={f} className={i === 1 ? "text-foreground" : ""}>
            {f}
          </p>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="flex-1 space-y-1.5 p-4">
          {lines.map((l, i) => (
            <p key={i}>
              <span className="mr-4 inline-block w-4 text-right text-muted-foreground/50">
                {i + 1}
              </span>
              <span className="text-muted-foreground">{l[0]}</span>
              <span>{l[1]}</span>
              <span className="text-muted-foreground">{l[2]}</span>
              <span>{l[3]}</span>
            </p>
          ))}
        </div>
        <div className="border-t border-border bg-background p-3 text-muted-foreground">
          <p>$ xs run dev</p>
          <p className="text-foreground">✓ ready on :3000 in 182ms</p>
        </div>
      </div>
    </div>
  );
}
function AI() {
  return (
    <div className="grid h-full grid-cols-[160px_1fr]">
      <div className="space-y-3 border-r border-border p-4 text-muted-foreground">
        <p className="eyebrow !text-[9px]">Threads</p>
        {["Q3 report summary", "Launch plan", "Contract review"].map((t, i) => (
          <p key={t} className={i === 0 ? "text-foreground" : ""}>
            {t}
          </p>
        ))}
      </div>
      <div className="flex flex-col justify-end gap-4 p-6">
        <div className="ml-auto max-w-[70%] rounded-md bg-elevated px-4 py-2.5">
          Summarise the attached Q3 report in three points.
        </div>
        <div className="max-w-[80%] space-y-2 border-l border-foreground/40 pl-4 text-muted-foreground">
          <p className="text-foreground">Here are the key points:</p>
          <p>1. Revenue grew 18% quarter over quarter.</p>
          <p>2. Operating costs held flat.</p>
          <p>3. Two new regions launched ahead of plan.</p>
        </div>
        <div className="rounded-md border border-border px-4 py-3 text-muted-foreground">
          Ask OverMind anything…
        </div>
      </div>
    </div>
  );
}
function Meet() {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-2">
        {["Aiko", "Daniel", "Priya", "Marco", "Lena", "You"].map((n, i) => (
          <div
            key={n}
            className={`relative flex items-center justify-center rounded-md bg-elevated ${i === 0 ? "ring-1 ring-foreground/60" : ""}`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm">
              {n[0]}
            </span>
            <span className="absolute bottom-2 left-2 text-[10px] text-muted-foreground">{n}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {["Mic", "Camera", "Share", "Leave"].map((c) => (
          <span
            key={c}
            className={`rounded-full px-4 py-1.5 ${c === "Leave" ? "bg-foreground text-background" : "border border-border"}`}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
function Sheets() {
  const rows = [
    ["Region", "Q1", "Q2", "Q3", "Total"],
    ["North", "42,100", "45,800", "51,200", "139,100"],
    ["South", "38,400", "36,900", "40,750", "116,050"],
    ["East", "29,900", "33,400", "35,100", "98,400"],
    ["West", "47,250", "49,600", "55,300", "152,150"],
    ["Total", "157,650", "165,700", "182,350", "505,700"],
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-3 border-b border-border px-4 py-2 font-mono text-muted-foreground">
        <span className="text-foreground">E6</span>
        <span>=SUM(E2:E5)</span>
      </div>
      <div className="grid flex-1 grid-cols-[1fr_200px]">
        <table className="w-full font-mono">
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border">
                {r.map((c, j) => (
                  <td
                    key={j}
                    className={`border-r border-border px-3 py-2 ${i === 0 || i === 5 ? "text-foreground" : "text-muted-foreground"} ${j ? "text-right" : ""} ${i === 5 && j === 4 ? "outline outline-1 outline-foreground" : ""}`}
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-end gap-3 border-l border-border p-4">
          {[62, 54, 44, 72].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-foreground/80"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function Writer() {
  return (
    <div className="flex h-full justify-center bg-background p-6">
      <div className="w-[62%] space-y-3 rounded-sm bg-elevated p-8">
        <p className="text-base font-medium tracking-tight">Annual Strategy 2027</p>
        <p className="text-muted-foreground">Prepared for the leadership team</p>
        <div className="space-y-2 pt-2">
          <Bar w="100%" />
          <Bar w="94%" />
          <Bar w="97%" />
          <Bar w="60%" />
        </div>
        <p className="pt-2 font-medium">1. Our position</p>
        <div className="space-y-2">
          <Bar w="98%" dim />
          <Bar w="91%" dim />
          <Bar w="72%" dim />
        </div>
      </div>
    </div>
  );
}
function Slides() {
  return (
    <div className="grid h-full grid-cols-[110px_1fr]">
      <div className="space-y-2 border-r border-border p-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`aspect-video rounded-sm bg-elevated ${i === 1 ? "ring-1 ring-foreground" : ""}`}
          />
        ))}
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="flex aspect-video w-full max-w-[90%] flex-col justify-between rounded-sm bg-foreground p-8 text-background">
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            02 — Vision
          </span>
          <span className="text-2xl font-medium leading-none tracking-tight md:text-4xl">
            Simplicity
            <br />
            at scale.
          </span>
          <span className="opacity-60">Keynote · 2026</span>
        </div>
      </div>
    </div>
  );
}
function One() {
  const cols = [
    ["To do", ["Draft Q4 roadmap", "Book venue"]],
    ["In progress", ["Design review", "Android build"]],
    ["Done", ["Kickoff call", "Brief signed"]],
  ] as const;
  return (
    <div className="grid h-full grid-cols-[140px_1fr]">
      <div className="space-y-3 border-r border-border p-4 text-muted-foreground">
        <p className="eyebrow !text-[9px]">Projects</p>
        {["Today", "Launch", "Personal", "Team"].map((t, i) => (
          <p key={t} className={i === 1 ? "text-foreground" : ""}>
            {t}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 p-4">
        {cols.map(([c, items]) => (
          <div key={c} className="space-y-2">
            <p className="text-muted-foreground">{c}</p>
            {items.map((t) => (
              <div
                key={t}
                className={`rounded-md border border-border bg-elevated p-3 ${c === "Done" ? "text-muted-foreground line-through" : ""}`}
              >
                {t}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const map = {
  code: Code,
  ai: AI,
  meet: Meet,
  sheets: Sheets,
  writer: Writer,
  slides: Slides,
  one: One,
};
export function ProductPreview({ product }: { product: Product }) {
  const C = map[product.preview];
  return (
    <Frame title={`${product.name.toLowerCase().replace(/ /g, "-")}`}>
      <C />
    </Frame>
  );
}
