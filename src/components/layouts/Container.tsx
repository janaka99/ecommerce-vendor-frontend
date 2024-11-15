import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
};

function Container({ children, className = "" }: Props) {
  return (
    <div className={twMerge("max-w-[1440px] mx-auto px-5 md:px-20", className)}>
      {children}
    </div>
  );
}

export default Container;
