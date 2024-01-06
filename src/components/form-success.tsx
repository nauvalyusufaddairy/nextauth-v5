import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccesProps {
  message?: string;
};

export const FormSuccess = ({
  message,
}: FormSuccesProps) => {
  if (!message) return null;

  return (
    <div className="bg-teal-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-teal-500">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};