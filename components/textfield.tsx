import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from "react";
import { classNames } from "../utils/css-helper";

interface TextFieldProps {
  label?: ReactNode;
  placeholder?: string;
  className?: string;
  inputType?: HTMLInputTypeAttribute | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
}

const TextField = (props: TextFieldProps) => {
  const {
    label,
    placeholder,
    className,
    inputType,
    onChange,
    value,
    defaultValue,
  } = props;
  return (
    <div className="min-w-0 flex-1">
      {label && <label className="text-white mb-2">{label}</label>}
      <input
        type={inputType ?? "text"}
        placeholder={placeholder}
        className={classNames(
          className,
          "block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-gray-900"
        )}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default TextField;
