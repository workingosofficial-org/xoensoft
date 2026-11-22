import { describe, expect, it } from "vitest";
import { products, isDownloadable } from "@/data/products";
import { progress } from "@/lib/xs-one";

describe("catalog rules", () => {
  it("lists all seven products", () => expect(products).toHaveLength(7));
  it("never offers a download without a real file URL", () => {
    expect(
      isDownloadable({
        platform: "windows",
        packageType: ".exe",
        minimumRequirements: "",
        availability: "available",
      }),
    ).toBe(false);
    expect(
      isDownloadable({
        platform: "windows",
        packageType: ".exe",
        minimumRequirements: "",
        availability: "coming-soon",
        downloadUrl: "https://x",
      }),
    ).toBe(false);
  });
  it("XS One web app is launchable", () => {
    const one = products.find((p) => p.slug === "xs-one")!;
    expect(isDownloadable(one.release.builds.find((b) => b.platform === "web")!)).toBe(true);
  });
  it("progress counts completed tasks", () => {
    const t = (done: boolean) => ({
      id: "a",
      title: "a",
      projectId: "p",
      priority: "low" as const,
      done,
      createdAt: 0,
    });
    expect(progress([t(true), t(false), t(false), t(true)]).pct).toBe(50);
  });
});
