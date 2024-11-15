import React, { forwardRef } from "react";
import { ControllerRenderProps } from "react-hook-form";

type Props = ControllerRenderProps & {
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
};

const FormTextArea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const {
    name,
    value,
    onChange,
    onBlur,
    placeholder = "",
    defaultValue = "",
    required = true,
  } = props;

  return (
    <textarea
      className="p-2 shadow-md rounded-md bg-secondary outline-none text-primary-text"
      name={name}
      value={value}
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
});

export default FormTextArea;
