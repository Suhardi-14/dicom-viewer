import { render, screen, within } from "@testing-library/react";
import Navbar from "../../components/navbar";

describe("Navbar", () => {
  test("renders navbar correctly", () => {
    render(<Navbar />);
    const link = screen.getByRole("link", {
      name: /your company duerr\-ndt\-logo/i,
    });

    const companyImg = within(link).getByRole("img", {
      name: /duerr\-ndt\-logo/i,
    });

    expect(companyImg).toBeVisible();
  });

  test("logo links to homepage", async () => {
    render(<Navbar />);
    const link = screen.getByRole("link", {
      name: /your company duerr\-ndt\-logo/i,
    });
    // expect(link).not.toBeEnabled();
    expect(link).toHaveAttribute("href", "/");
  });
});
