import { logRoles, render, screen } from "@testing-library/react";
import Home from "../../pages/index";
import { createMockRouter } from "../../test-utils/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";

describe("Home", () => {
  test("renders a heading", () => {
    const view = render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Home />
      </RouterContext.Provider>
    );

    const heading = screen.getByRole("heading", {
      name: /DICOM server/i,
    });
    // logRoles(view.container);

    expect(heading).toHaveTextContent(/DICOM server/i);
  });
});
