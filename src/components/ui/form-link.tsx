import React from "react";

type Props = {
  href: string;
  text: string;
};

const FormLink = ({ href, text }: Props) => {
  return (
    <a
      className="text-sm text-text-1 text-center font-semibold underline"
      href={href}
    >
      {text}
    </a>
  );
};

export default FormLink;
