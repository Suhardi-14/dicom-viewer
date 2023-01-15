import { render, screen, within } from "@testing-library/react";
import Container from "../../components/container";
import Loading from "../../components/loader";

describe("Loader", () => {
  test("renders correctly", () => {
    render(<Loading />);
    const svgElem = screen.getByRole("status");
    expect(svgElem).toBeInTheDocument();
    expect(svgElem).toHaveClass("animate-spin");
  });
});
