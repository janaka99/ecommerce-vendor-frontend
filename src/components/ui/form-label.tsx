type Props = {
  text: string;
  hint?: string;
  htmlFor?: string;
};

const FormLabel = ({ text, htmlFor, hint }: Props) => {
  return (
    <label
      className="capitalize  flex items-center w-20 text-primary-text font-medium"
      htmlFor={htmlFor}
    >
      {text}
    </label>
  );
};

export default FormLabel;
// {hint && (
//   <span className="text-xs text-black italic ml-5 font-semibold">
//     {hint}
//   </span>
// )}
