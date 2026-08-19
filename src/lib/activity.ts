import { useCallback, useEffect, useState } from "react";

export type Activity = {
  id: string;
  tool: "Email Generator" | "Meeting Summarizer" | "Task Planner";
  label: string;
  at: number;
};

const KEY = "awpa.activity";

export function logActivity(tool: Activity["tool"], label: string) {
  if (typeof window === "undefined") return;
  try {
    const existing: Activity[] = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    const next = [
      { id: crypto.randomUUID(), tool, label: label.slice(0, 90), at: Date.now() },
      ...existing,
    ].slice(0, 6);
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("awpa-activity"));
  } catch {
    /* ignore storage errors */
  }
}

export function useActivity() {
  const [items, setItems] = useState<Activity[]>([]);

  const read = useCallback(() => {
    try {
      setItems(JSON.parse(window.localStorage.getItem(KEY) ?? "[]"));
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    read();
    window.addEventListener("awpa-activity", read);
    return () => window.removeEventListener("awpa-activity", read);
  }, [read]);

  const clear = useCallback(() => {
    window.localStorage.removeItem(KEY);
    setItems([]);
  }, []);

  return { items, clear };
}
