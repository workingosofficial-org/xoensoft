export type Priority = "low" | "medium" | "high";
export interface Task {
  id: string;
  title: string;
  projectId: string;
  due?: string | undefined;
  priority: Priority;
  done: boolean;
  createdAt: number;
}
export interface Project {
  id: string;
  name: string;
  team: boolean;
}
export interface OneState {
  projects: Project[];
  tasks: Task[];
}

export const KEY = "xs-one-v1";
export const uid = () => Math.random().toString(36).slice(2, 10);
export const todayISO = () => new Date().toISOString().slice(0, 10);

export function seedState(): OneState {
  const projects = [
    { id: "personal", name: "Personal", team: false },
    { id: "launch", name: "Product launch", team: true },
  ];
  const t = todayISO();
  return {
    projects,
    tasks: [
      {
        id: uid(),
        title: "Plan the week",
        projectId: "personal",
        due: t,
        priority: "medium",
        done: false,
        createdAt: Date.now(),
      },
      {
        id: uid(),
        title: "Review launch checklist",
        projectId: "launch",
        due: t,
        priority: "high",
        done: false,
        createdAt: Date.now(),
      },
      {
        id: uid(),
        title: "Send kickoff notes",
        projectId: "launch",
        priority: "low",
        done: true,
        createdAt: Date.now(),
      },
    ],
  };
}

export function progress(tasks: Task[]) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

export const isOverdue = (t: Task, today = todayISO()) => !t.done && !!t.due && t.due < today;
