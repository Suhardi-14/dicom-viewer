import { render, screen, within } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import StudiesListing from "../../../pages/studies";
import { createMockRouter } from "../../../test-utils/createMockRouter";

describe("Studies Listing", () => {
  test("renders a heading", () => {
    const view = render(
      <RouterContext.Provider value={createMockRouter({})}>
        <StudiesListing />
      </RouterContext.Provider>
    );

    const link = screen.getByRole("link", {
      name: /your company duerr\-ndt\-logo/i,
    });

    const companyImg = within(link).getByRole("img", {
      name: /duerr\-ndt\-logo/i,
    });

    expect(companyImg).toBeVisible();
  });
});
