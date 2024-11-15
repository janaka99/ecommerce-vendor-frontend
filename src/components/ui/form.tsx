import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Form = ({ children }: Props) => {
  return (
    <div className="bg-background-2 shadow-md m-6 p-6 max-w-sm w-full">
      {children}
    </div>
  );
};

export default Form;
