import React, { forwardRef } from "react";
import { ControllerRenderProps } from "react-hook-form";

type Props = ControllerRenderProps & {
  placeholder?: string;
  type: string;
  defaultValue?: string;
};

const FormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    name,
    value,
    onChange,
    onBlur,
    placeholder = "",
    type,
    defaultValue = "",
  } = props;

  return (
    <div className="relative flex-1 w-full ">
      <input
        className="p-2 w-full shadow-md  outline-none bg-secondary text-primary-text"
        name={name}
        value={value}
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      />
    </div>
  );
});

export default FormInput;
