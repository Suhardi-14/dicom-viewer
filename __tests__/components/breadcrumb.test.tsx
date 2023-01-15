import { render, screen } from "@testing-library/react";
import Breadcrumbs from "../../components/breadcrumbs";

describe("Breadcrumb", () => {
  test("renders correctly", () => {
    const pages = [{ name: "List of Studies", href: "#", current: false }];
    render(<Breadcrumbs pages={pages} />);
    const allLink = screen.getAllByRole("link");
    expect(allLink).toHaveLength(2);
    expect(allLink[0]).toHaveAttribute("href", "/");
    expect(allLink[1]).toHaveAttribute("href", pages[0].href);
  });
});
