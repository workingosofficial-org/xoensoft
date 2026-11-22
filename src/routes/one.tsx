import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Check,
  Users,
  User,
  CalendarDays,
  LayoutGrid,
  Pencil,
  X,
} from "lucide-react";
import { XMark } from "@/components/site/brand";
import {
  KEY,
  seedState,
  uid,
  todayISO,
  progress,
  isOverdue,
  type OneState,
  type Priority,
} from "@/lib/xs-one";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/one")({
  head: () => ({
    meta: seo(
      "XS One — Tasks & Projects",
      "XS One web app: personal and team tasks, projects, due dates and progress.",
    ),
  }),
  component: OneApp,
});

type View = { kind: "dashboard" } | { kind: "today" } | { kind: "project"; id: string };

function OneApp() {
  const [state, setState] = useState<OneState | null>(null);
  const [view, setView] = useState<View>({ kind: "dashboard" });
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [newProject, setNewProject] = useState("");
  const [editing, setEditing] = useState<{
    id: string;
    title: string;
    due: string;
    priority: Priority;
    projectId: string;
  } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      setState(raw ? JSON.parse(raw) : seedState());
    } catch {
      setState(seedState());
    }
  }, []);
  useEffect(() => {
    if (state) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const today = todayISO();
  const visible = useMemo(() => {
    if (!state) return [];
    const list =
      view.kind === "today"
        ? state.tasks.filter((t) => t.due && t.due <= today && !t.done)
        : view.kind === "project"
          ? state.tasks.filter((t) => t.projectId === view.id)
          : state.tasks;
    const rank = { high: 0, medium: 1, low: 2 };
    return [...list].sort(
      (a, b) =>
        Number(a.done) - Number(b.done) ||
        rank[a.priority] - rank[b.priority] ||
        (a.due ?? "9").localeCompare(b.due ?? "9"),
    );
  }, [state, view, today]);

  if (!state)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <XMark className="h-8 animate-pulse" />
      </div>
    );

  const update = (fn: (s: OneState) => OneState) => setState((s) => (s ? fn(s) : s));
  const projectFor = view.kind === "project" ? view.id : state.projects[0]?.id;
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !projectFor) return;
    update((s) => ({
      ...s,
      tasks: [
        ...s.tasks,
        {
          id: uid(),
          title: title.trim(),
          projectId: projectFor,
          due: due || undefined,
          priority,
          done: false,
          createdAt: Date.now(),
        },
      ],
    }));
    setTitle("");
    setDue("");
  };
  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.trim()) return;
    const id = uid();
    update((s) => ({
      ...s,
      projects: [...s.projects, { id, name: newProject.trim(), team: false }],
    }));
    setNewProject("");
    setView({ kind: "project", id });
  };
  const all = progress(state.tasks);
  const heading =
    view.kind === "dashboard"
      ? "Dashboard"
      : view.kind === "today"
        ? "Today"
        : state.projects.find((p) => p.id === view.id)?.name;

  const navBtn = (active: boolean) =>
    cn(
      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
      active ? "bg-elevated text-foreground" : "text-muted-foreground hover:text-foreground",
    );

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b border-border bg-surface p-4 md:w-64 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-2 py-2">
          <span className="flex items-center gap-2">
            <XMark className="h-4" />
            <span className="text-sm font-medium">XS One</span>
          </span>
          <Link
            to="/products/$slug"
            params={{ slug: "xs-one" }}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            About
          </Link>
        </div>
        <nav className="mt-6 space-y-1">
          <button
            className={navBtn(view.kind === "dashboard")}
            onClick={() => setView({ kind: "dashboard" })}
          >
            <LayoutGrid className="h-4 w-4" />
            Dashboard
          </button>
          <button
            className={navBtn(view.kind === "today")}
            onClick={() => setView({ kind: "today" })}
          >
            <CalendarDays className="h-4 w-4" />
            Today
          </button>
        </nav>
        <p className="eyebrow mt-8 px-3">Projects</p>
        <div className="mt-2 space-y-1">
          {state.projects.map((p) => {
            const pr = progress(state.tasks.filter((t) => t.projectId === p.id));
            return (
              <button
                key={p.id}
                className={navBtn(view.kind === "project" && view.id === p.id)}
                onClick={() => setView({ kind: "project", id: p.id })}
              >
                {p.team ? <Users className="h-4 w-4" /> : <User className="h-4 w-4" />}
                <span className="flex-1 truncate text-left">{p.name}</span>
                <span className="font-mono text-xs">
                  {pr.done}/{pr.total}
                </span>
              </button>
            );
          })}
        </div>
        <form onSubmit={addProject} className="mt-3 flex gap-2 px-1">
          <input
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="New project"
            aria-label="New project name"
            className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground"
          />
          <button
            aria-label="Add project"
            className="rounded-md border border-border px-2 hover:border-foreground"
          >
            <Plus className="h-4 w-4" />
          </button>
        </form>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-medium tracking-tight">{heading}</h1>

          {view.kind === "dashboard" && (
            <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
              {[
                ["Completed", `${all.done}/${all.total}`],
                ["Progress", `${all.pct}%`],
                ["Overdue", String(state.tasks.filter((t) => isOverdue(t, today)).length)],
              ].map(([k, v]) => (
                <div key={k} className="bg-background p-6">
                  <p className="eyebrow">{k}</p>
                  <p className="mt-2 font-mono text-3xl">{v}</p>
                </div>
              ))}
              <div className="bg-background p-6 sm:col-span-3">
                {state.projects.map((p) => {
                  const pr = progress(state.tasks.filter((t) => t.projectId === p.id));
                  return (
                    <div key={p.id} className="py-2">
                      <div className="flex justify-between text-sm">
                        <span>{p.name}</span>
                        <span className="font-mono text-muted-foreground">{pr.pct}%</span>
                      </div>
                      <div className="mt-2 h-1 rounded-full bg-elevated">
                        <div
                          className="h-1 rounded-full bg-foreground transition-all duration-700"
                          style={{ width: `${pr.pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {view.kind !== "today" && (
            <form onSubmit={addTask} className="mt-8 flex flex-wrap gap-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Add a task to ${state.projects.find((p) => p.id === projectFor)?.name ?? "a project"}`}
                aria-label="Task title"
                className="min-w-0 flex-[2_1_220px] rounded-md border border-input bg-surface px-4 py-2.5 text-sm placeholder:text-muted-foreground"
              />
              <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                aria-label="Due date"
                className="rounded-md border border-input bg-surface px-3 py-2.5 text-sm [color-scheme:dark]"
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                aria-label="Priority"
                className="rounded-md border border-input bg-surface px-3 py-2.5 text-sm"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-85">
                <Plus className="h-4 w-4" />
                Add
              </button>
            </form>
          )}

          <ul className="mt-6 divide-y divide-border border-y border-border">
            {visible.length === 0 && (
              <li className="py-10 text-center text-sm text-muted-foreground">
                Nothing here. Enjoy the calm.
              </li>
            )}
            {visible.map((t) =>
              editing?.id === t.id ? (
                <li key={t.id} className="py-4">
                  <form
                    className="flex flex-wrap items-center gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!editing.title.trim()) return;
                      update((s) => ({
                        ...s,
                        tasks: s.tasks.map((x) =>
                          x.id === t.id
                            ? {
                                ...x,
                                title: editing.title.trim(),
                                due: editing.due || undefined,
                                priority: editing.priority,
                                projectId: editing.projectId,
                              }
                            : x,
                        ),
                      }));
                      setEditing(null);
                    }}
                  >
                    <input
                      value={editing.title}
                      onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                      aria-label="Edit task title"
                      className="min-w-0 flex-[2_1_200px] rounded-md border border-input bg-surface px-3 py-2 text-sm"
                    />
                    <input
                      type="date"
                      value={editing.due}
                      onChange={(e) => setEditing({ ...editing, due: e.target.value })}
                      aria-label="Edit due date"
                      className="rounded-md border border-input bg-surface px-3 py-2 text-sm [color-scheme:dark]"
                    />
                    <select
                      value={editing.priority}
                      onChange={(e) =>
                        setEditing({ ...editing, priority: e.target.value as Priority })
                      }
                      aria-label="Edit priority"
                      className="rounded-md border border-input bg-surface px-3 py-2 text-sm"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <select
                      value={editing.projectId}
                      onChange={(e) => setEditing({ ...editing, projectId: e.target.value })}
                      aria-label="Edit project"
                      className="rounded-md border border-input bg-surface px-3 py-2 text-sm"
                    >
                      {state.projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                      Save
                    </button>
                    <button
                      type="button"
                      aria-label="Cancel edit"
                      onClick={() => setEditing(null)}
                      className="rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </form>
                </li>
              ) : (
                <li key={t.id} className="group flex items-center gap-4 py-4">
                  <button
                    aria-label={t.done ? "Mark as not done" : "Mark as done"}
                    onClick={() =>
                      update((s) => ({
                        ...s,
                        tasks: s.tasks.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)),
                      }))
                    }
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                      t.done
                        ? "border-foreground bg-foreground text-background"
                        : "border-muted-foreground hover:border-foreground",
                    )}
                  >
                    {t.done && <Check className="h-3 w-3" />}
                  </button>
                  <span
                    className={cn("flex-1 text-sm", t.done && "text-muted-foreground line-through")}
                  >
                    {t.title}
                  </span>
                  {view.kind !== "project" && (
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                      {state.projects.find((p) => p.id === t.projectId)?.name}
                    </span>
                  )}
                  {t.due && (
                    <span
                      className={cn(
                        "font-mono text-xs",
                        isOverdue(t, today) ? "text-destructive" : "text-muted-foreground",
                      )}
                    >
                      {t.due === today ? "Today" : t.due}
                    </span>
                  )}
                  <span
                    className={cn(
                      "w-14 text-right font-mono text-[10px] uppercase tracking-widest",
                      t.priority === "high" ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {t.priority}
                  </span>
                  <button
                    aria-label="Edit task"
                    onClick={() =>
                      setEditing({
                        id: t.id,
                        title: t.title,
                        due: t.due ?? "",
                        priority: t.priority,
                        projectId: t.projectId,
                      })
                    }
                    className="text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100 focus:opacity-100"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    aria-label="Delete task"
                    onClick={() =>
                      update((s) => ({ ...s, tasks: s.tasks.filter((x) => x.id !== t.id) }))
                    }
                    className="text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100 focus:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ),
            )}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">
            Public beta · tasks are saved on this device. Sync across devices arrives with XOENSOFT
            accounts.
          </p>
        </div>
      </main>
    </div>
  );
}
