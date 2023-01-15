import { render, screen } from "@testing-library/react";
import { RenderIf } from "../../components/optional-render";

describe("Optional Render", () => {
  test("renders correctly when set to true", () => {
    render(
      <RenderIf isTrue>
        <h1>DICOM Viewer</h1>
      </RenderIf>
    );
    const headingElem = screen.getByRole("heading");
    expect(headingElem).toBeInTheDocument();
  });

  test("renders correctly when set to false", () => {
    render(
      <RenderIf isTrue={false}>
        <h1>DICOM Viewer</h1>
      </RenderIf>
    );
    const headingElem = screen.queryByRole("heading");
    expect(headingElem).not.toBeInTheDocument();
  });
});
