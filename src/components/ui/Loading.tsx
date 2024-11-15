import { CgSpinner } from "react-icons/cg";

type Props = {};

function Loading({}: Props) {
  return (
    <div className="fixed z-[10000] flex top-0 left-0 w-screen h-screen justify-center items-center overflow-hidden">
      <CgSpinner className="text-accent font-bold text-4xl animate-spin" />
    </div>
  );
}

export default Loading;
