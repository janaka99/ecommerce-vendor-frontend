import Button from "../ui/Button";
import starred from "../../assets/starred.svg";
import SearchIcon from "../../assets/search.svg";
import PageTitle from "../ui/PageTitle";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

type Props = {
  title: string;
};

export default function PageHeader({ title }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let query = e.target.value;
    const encodedQuery = encodeURIComponent(query);

    setSearchQuery(encodedQuery);
  };

  return (
    <div className=" flex flex-col gap-5 font-satoshi">
      <PageTitle>{title}</PageTitle>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-2 w-full justify-between items-center">
        <div className="max-w-[757px] w-full h-16 flex bg-secondary rounded-[50px] pl-7">
          <input
            type="text"
            placeholder="Search for products"
            onChange={handleChange}
            className="h-full flex-grow bg-transparent outline-none w-full text-primary-text font-medium text-mute"
          />
          <div className="h-full py-[10px] px-[10px]">
            <a
              href={`/search?q=${searchQuery}`}
              className="flex gap-[10px] bg-accent text-background h-full rounded-[80px] text-primary-text font-bold items-center  px-10 justify-center"
            >
              <img src={SearchIcon} alt="" className="h-5 aspect-square " />{" "}
              Search
            </a>
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-5">
          <a href="/new-product">
            <Button>New Product</Button>
          </a>
          <a
            href="/favourite-products"
            className="h-14 w-[72px] px-[5px] py-[15px] border border-accent flex justify-center items-center rounded-[10px]"
          >
            <img src={starred} alt="" className="w-[35px] aspect-square" />
          </a>
        </div>
      </div>
    </div>
  );
}
