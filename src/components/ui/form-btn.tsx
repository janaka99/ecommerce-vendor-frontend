import { ImSpinner2 } from "react-icons/im";
import Button from "./Button";

type Props = {
  text: string;
  isProcessing?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  classes?: string;
  onClick?: () => void;
};

const FormButton = ({
  isProcessing = false,
  text,
  type = "submit",
  onClick,
}: Props) => {
  return (
    <Button type={type} disabled={isProcessing} onClick={onClick}>
      {isProcessing ? (
        <ImSpinner2 className="animate-spin mx-auto text-base" />
      ) : (
        `${text}`
      )}
    </Button>
  );
};

export default FormButton;
