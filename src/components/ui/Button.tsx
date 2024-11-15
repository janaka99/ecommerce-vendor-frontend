import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className="px-[67px] font-bold text-[19px] h-14 bg-accent text-background rounded-[10px]"
    >
      {children}
    </button>
  );
}
