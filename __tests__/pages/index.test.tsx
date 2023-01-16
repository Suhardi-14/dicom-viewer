import { logRoles, render, screen, within } from "@testing-library/react";
import Home from "../../pages/index";
import { createMockRouter } from "../../test-utils/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import user from "@testing-library/user-event";

describe("Home", () => {
  user.setup();
  test("renders correctly", () => {
    const view = render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Home />
      </RouterContext.Provider>
    );

    // logRoles(view.container);

    const link = screen.getByRole("link", {
      name: /your company duerr\-ndt\-logo/i,
    });
    const companyImg = within(link).getByRole("img", {
      name: /duerr\-ndt\-logo/i,
    });
    expect(companyImg).toBeVisible();

    const linkToDuerrWebsite = screen.getByRole("link", {
      name: /duerr\-ndt\-logo visit our main page/i,
    });
    const smallDuerrLogo = within(linkToDuerrWebsite).getByRole("img", {
      name: /duerr\-ndt\-logo/i,
    });
    expect(linkToDuerrWebsite).toBeInTheDocument();
    expect(linkToDuerrWebsite).toHaveAttribute(
      "href",
      "https://www.duerr-ndt.com/"
    );
    expect(smallDuerrLogo).toBeInTheDocument();

    const heading = screen.getByRole("heading", {
      name: /dicom server web viewer/i,
    });
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(
      /enter patient name and\/or patient id to get studies for a specific patient\. if not, just press "search" to view list of studies available/i
    );
    expect(description).toBeInTheDocument();

    const idField = screen.getByRole("textbox", { name: /patient id/i });
    const nameField = screen.getByRole("textbox", { name: /patient name/i });
    const searchButton = screen.getByRole("button", {
      name: /search studies/i,
    });
    expect(idField).toBeInTheDocument();
    expect(nameField).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    const smallText = screen.getByText(/this is a demo page\. powered by \./i);
    expect(smallText).toBeInTheDocument();
  });
  test("input fields render keyboard input", async () => {
    const inputId = "5132651546546";
    const inputName = "Mikhail Gorbachev";

    const view = render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Home />
      </RouterContext.Provider>
    );

    logRoles(view.container);

    const idField = screen.getByRole("textbox", { name: /patient id/i });
    const nameField = screen.getByRole("textbox", { name: /patient name/i });

    await user.type(idField, inputId);
    await user.type(nameField, inputName);

    expect(idField).toHaveDisplayValue(inputId);
    expect(nameField).toHaveDisplayValue(inputName);
  });
  test("sumbit input when clicking submit button", async () => {
    const inputId = "5132651546546";
    const inputName = "Mikhail Gorbachev";
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <Home />
      </RouterContext.Provider>
    );

    const idField = screen.getByRole("textbox", { name: /patient id/i });
    const nameField = screen.getByRole("textbox", { name: /patient name/i });
    const searchButton = screen.getByRole("button", {
      name: /search studies/i,
    });

    await user.type(idField, inputId);
    await user.type(nameField, inputName);
    await user.click(searchButton);

    expect(router.push).toHaveBeenCalledWith({
      pathname: "/studies",
      query: {
        patientId: inputId,
        patientName: inputName,
      },
    });
  });
});
