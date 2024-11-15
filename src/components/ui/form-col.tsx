import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const FormCol = ({ children }: Props) => {
  return <div className="flex w-full  gap-5">{children}</div>;
};

export default FormCol;
