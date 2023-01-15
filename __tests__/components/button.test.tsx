import { render, screen } from "@testing-library/react";
import Button from "../../components/button";
import user from "@testing-library/user-event";

describe("Button", () => {
  test("renders correctly", () => {
    render(<Button label="Submit" />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("Submit");
    expect(buttonElement).toHaveAttribute("type", "button");
  });
  test("execute click handler", async () => {
    user.setup();
    const clickHandler = jest.fn();
    render(<Button label="Submit" onClick={clickHandler} />);
    const buttonElement = screen.getByRole("button");
    await user.click(buttonElement);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
