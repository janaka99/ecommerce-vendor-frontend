import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Table = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <table className={twMerge("max-w-[1198px] mx-auto w-full", className)}>
      {children}
    </table>
  );
};

export const TableHeader = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <thead className={twMerge("w-full", className)}>{children}</thead>;
};

export const TableBody = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <tbody className={twMerge("w-full", className)}>{children}</tbody>;
};

export const TableRow = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <tr className={twMerge("", className)}>{children}</tr>;
};

export const TableHead = ({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <th
      className={twMerge(
        "text-start text-primary-text text-accent font-bold",
        className
      )}
    >
      {children}
    </th>
  );
};

export const TableCell = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <td className={twMerge("py-5 text-primary", className)}>{children}</td>
  );
};
