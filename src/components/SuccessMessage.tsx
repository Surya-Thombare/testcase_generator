import { CheckCircle } from "lucide-react";

interface SuccessMessageProps {
  message: string;
}

export function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div className="flex items-center gap-2 p-4 mb-4 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800 animate-fadeIn">
      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
      <p className="font-medium">{message}</p>
    </div>
  );
}