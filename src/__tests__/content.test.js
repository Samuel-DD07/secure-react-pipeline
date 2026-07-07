import {
  getAllProjects,
  getProject,
  getProfile,
  loc,
  CATEGORIES,
} from "@/lib/content";

describe("content library", () => {
  test("loc() resolves localized fields and passes through plain values", () => {
    expect(loc({ fr: "Bonjour", en: "Hello" }, "en")).toBe("Hello");
    expect(loc({ fr: "Bonjour", en: "Hello" }, "fr")).toBe("Bonjour");
    expect(loc("plain", "fr")).toBe("plain");
  });

  test("getAllProjects() returns localized projects sorted by order", () => {
    const projects = getAllProjects("fr");
    expect(projects.length).toBeGreaterThan(0);

    const orders = projects.map((p) => p.order ?? 999);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));

    projects.forEach((p) => {
      expect(typeof p.title).toBe("string");
      expect(CATEGORIES).toContain(p.category);
      expect(Array.isArray(p.tags)).toBe(true);
    });
  });

  test("getProject() returns the requested project, localized", () => {
    const en = getProject("aloqas-qa", "en");
    expect(en).not.toBeNull();
    expect(en.slug).toBe("aloqas-qa");
    expect(en.title).toMatch(/Aloqas/);

    expect(getProject("does-not-exist", "fr")).toBeNull();
  });

  test("getProfile() localizes bio, experience and skills", () => {
    const profile = getProfile("fr");
    expect(profile.name).toBe("Samuel Dorismond");
    expect(typeof profile.role).toBe("string");
    expect(Array.isArray(profile.longBio)).toBe(true);
    expect(profile.experience[0].company).toBe("Cyber Test Systems");
    expect(profile.skills[0]).toHaveProperty("category");
    expect(Array.isArray(profile.skills[0].items)).toBe(true);
  });
});
