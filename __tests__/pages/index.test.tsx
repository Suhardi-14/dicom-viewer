import { logRoles, render, screen } from "@testing-library/react";
import Home from "../../pages/index";
import { useRouter } from "next/router";
// import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Home", () => {
  // beforeEach(() => {
  let expectedRouterPush = jest.fn();
  useRouter.mockReturnValue({ push: expectedRouterPush });
  // });
  it("renders a heading", () => {
    const view = render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /DICOM server/i,
    });
    // logRoles(view.container);

    expect(heading).toBeInTheDocument();
  });
});
