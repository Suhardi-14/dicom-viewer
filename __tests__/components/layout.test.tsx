import { logRoles, render, screen, within } from "@testing-library/react";
import Container from "../../components/container";
import Layout from "../../components/layout";

describe("Layout", () => {
  test("renders correctly", () => {
    const view = render(
      <Layout>
        <h1>Hello World</h1>
      </Layout>
    );

    const link = screen.getByRole("link", {
      name: /your company duerr\-ndt\-logo/i,
    });

    const companyImg = within(link).getByRole("img", {
      name: /duerr\-ndt\-logo/i,
    });
    expect(companyImg).toBeVisible();

    const mainElem = screen.getByRole("main");
    const divWithinMainElem = within(mainElem).getByRole("generic");
    const containedElem = within(divWithinMainElem).getByRole("heading");
    expect(mainElem).toBeInTheDocument();
    expect(divWithinMainElem).toBeInTheDocument();
    expect(containedElem).toBeInTheDocument();
  });

  test("logo provide links to homepage", async () => {
    render(
      <Layout>
        <h1>Hello World</h1>
      </Layout>
    );

    const link = screen.getByRole("link", {
      name: /your company duerr\-ndt\-logo/i,
    });

    expect(link).toHaveAttribute("href", "/");
  });
});
