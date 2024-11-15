import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PageTitle({ children }: Props) {
  return (
    <h2 className="font-black text-primary-title  text-primary uppercase">
      {children}
    </h2>
  );
}
