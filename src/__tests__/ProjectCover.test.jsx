import { render, screen } from "@testing-library/react";
import ProjectCover from "@/components/ProjectCover";

describe("ProjectCover", () => {
  test("renders a stylized code fallback when no cover is provided", () => {
    const { container } = render(
      <ProjectCover title="Test Project" tags={["Python", "AWS"]} />
    );
    expect(container.textContent).toContain("</>");
    // First tag is shown as the caption
    expect(container.textContent).toContain("Python");
  });

  test("renders an image with the project title as alt when a cover is set", () => {
    render(
      <ProjectCover cover="/images/x.webp" title="My Project" tags={[]} />
    );
    expect(screen.getByAltText("My Project")).toBeInTheDocument();
  });
});
