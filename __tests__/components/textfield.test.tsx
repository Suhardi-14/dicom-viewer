import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import TextField from "../../components/textfield";

describe("Textfield", () => {
  test("renders basic textfield correctly", () => {
    render(<TextField />);
    const inputElem = screen.getByRole("textbox");
    expect(inputElem).toBeInTheDocument();
    expect(inputElem).toHaveAttribute("type", "text");
    expect(inputElem).not.toHaveAttribute("placeholder");
    expect(inputElem).toHaveValue("");
    expect(inputElem).not.toHaveAttribute("onChange");
    expect(inputElem).not.toHaveAttribute("defaultValue");
  });
  test("renders textfield with label correctly", () => {
    render(<TextField label="Name" />);
    const inputElem = screen.getByLabelText("Name");
    expect(inputElem).toBeInTheDocument();
  });
  test("execute change handler", async () => {
    const nameInput = "John Doe";
    user.setup();
    const changeHandler = jest.fn();
    render(<TextField label="Name" onChange={changeHandler} />);
    const inputElem = screen.getByRole("textbox");
    await user.type(inputElem, nameInput);
    expect(changeHandler).toHaveBeenCalledTimes(nameInput.length);
  });
});
