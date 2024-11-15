import { BiX } from "react-icons/bi";
import AlertIcon from "../../assets/alert.svg";
import { CgSpinner } from "react-icons/cg";
import ReactDOM from "react-dom";

type Props = {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
  isPending: boolean;
};

export default function Dialog({ setDialogOpen, onSuccess, isPending }: Props) {
  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    onSuccess();
  };

  return ReactDOM.createPortal(
    <div className="fixed  z-[100] top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-50/30 font-satoshi">
      <div className="relative bg-secondary max-w-[630px] max-h-[354px] w-full h-full flex flex-col justify-center items-center gap-5 rounded-[16px]">
        <button
          className="absolute top-2 right-2"
          onClick={() => setDialogOpen(false)}
        >
          <BiX className="text-2xl" />
        </button>
        <img src={AlertIcon} alt="" />
        <p className="text-[24px] font-bold">ARE YOU SURE?</p>
        <p className="text-primary-text font-bold">
          You will not be able to undo this action if you proceed!
        </p>
        <div className="flex gap-10">
          <button
            onClick={handleCancel}
            className="text-primary-text rounded-md hover:bg-accent bg-background hover:text-background border-2 border-accent font-bold  px-5 py-2 transition-all duration-150"
          >
            {" "}
            Cancel{" "}
          </button>
          <button
            onClick={handleDelete}
            className="text-primary-text rounded-md bg-accent hover:bg-background text-background hover:text-primary border-2 border-accent font-bold px-5 py-2 transition-all duration-150"
          >
            {" "}
            Delete{" "}
          </button>
        </div>
        {isPending && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-50/60 z-10">
            <CgSpinner className="text-accent font-bold text-2xl animate-spin" />
          </div>
        )}
      </div>
    </div>,
    document.getElementById("dialog-portal")!
  );
}
