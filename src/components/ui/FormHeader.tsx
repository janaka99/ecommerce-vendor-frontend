import React from "react";
import PageTitle from "./PageTitle";
import ArrowIcon from "../../assets/arrow.svg";
type Props = {
  text: string;
};

export default function FormHeader({ text }: Props) {
  return (
    <div className="flex gap-4 items-center">
      <PageTitle>products</PageTitle>
      <img src={ArrowIcon} alt="" />
      <p className="text-secondary-title font-bold text-accent">{text}</p>
    </div>
  );
}
