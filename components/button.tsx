import { MouseEventHandler, ReactNode } from "react";
import { classNames } from "../utils/css-helper";

interface ButtonProps {
  label: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: "button" | "reset" | "submit";
}

const Button = (props: ButtonProps) => {
  const { label, onClick, className, type } = props;
  return (
    <button
      onClick={onClick}
      type={type ?? "button"}
      className={classNames(
        className,
        "block w-full rounded-md bg-cyan-500 py-3 px-4 font-medium text-white shadow hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-gray-900"
      )}
    >
      {label}
    </button>
  );
};

export default Button;
