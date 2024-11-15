type Props = {
  message?: string;
};

const FormError = ({ message }: Props) => {
  if (!message) {
    return <></>;
  }
  return (
    <div className="p-2 border border-red-300 text-red-500 mb-6 bg-red-200 flex gap-2 items-center text-sm">
      {message}
    </div>
  );
};

export default FormError;
