import { render, screen } from "@testing-library/react";
import Loading from "../../components/loader";

describe("Loader", () => {
  test("renders correctly", () => {
    render(<Loading />);
    const svgElem = screen.getByRole("status");
    expect(svgElem).toBeInTheDocument();
    expect(svgElem).toHaveClass("animate-spin");
  });
});
