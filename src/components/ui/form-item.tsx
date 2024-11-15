import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const FormItem = ({ children }: Props) => {
  return <div className="mb-6 flex w-full flex-col gap-5">{children}</div>;
};

export default FormItem;
