import { render, screen, within } from "@testing-library/react";
import Container from "../../components/container";

describe("Container", () => {
  test("renders correctly", () => {
    render(
      <Container>
        <h1>Hello World</h1>
      </Container>
    );
    const mainElem = screen.getByRole("main");
    const divWithinMainElem = within(mainElem).getByRole("generic");
    const containedElem = within(divWithinMainElem).getByRole("heading");
    expect(mainElem).toBeInTheDocument();
    expect(divWithinMainElem).toBeInTheDocument();
    expect(containedElem).toBeInTheDocument();
  });
});
