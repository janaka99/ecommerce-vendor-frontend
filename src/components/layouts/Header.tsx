import Container from "./Container";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="pt-5">
      <Container className="flex justify-end gap-5">
        <select className="text-xl font-bold">
          <option value="">ADMIN</option>
        </select>
        <div className="relative h-[58px] aspect-square">
          <div className="w-full  h-full object-cover rounded-full bg-accent" />
          <div className=" w-[12px] aspect-square rounded-full bg-green absolute right-[2px] bottom-[2px]"></div>
        </div>
      </Container>
    </div>
  );
}
