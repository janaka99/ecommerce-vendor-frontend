import React from "react";

type Props = {
  title: string;
};

const FormHeader = ({ title }: Props) => {
  return (
    <h3 className="text-xl font-sans text-center mb-6 font-medium">{title}</h3>
  );
};

export default FormHeader;
