import React from "react";
import { ControllerFieldState } from "react-hook-form";

type Props = ControllerFieldState & {};

const FormMessage = (props: Props) => {
  const { error } = props;
  //   if (!message) return null;
  return (
    <span className="text-xs mt-[2px] text-red-400 font-semibold flex justify-end">
      {error?.message}
    </span>
  );
};

export default FormMessage;
