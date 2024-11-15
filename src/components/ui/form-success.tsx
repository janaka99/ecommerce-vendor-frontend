type Props = {
  message?: string;
};

const FormSuccess = ({ message }: Props) => {
  if (!message) {
    return <></>;
  }
  return (
    <div className="p-2 border border-green-300 text-green-500 mb-6 bg-green-200 flex gap-2 items-center textsm">
      {message}
    </div>
  );
};

export default FormSuccess;
