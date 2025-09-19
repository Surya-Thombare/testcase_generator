import { AlertCircle } from "lucide-react";

export function RequiredFieldsNote() {
  return (
    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 rounded-md border border-blue-100 dark:border-blue-800 text-sm">
      <AlertCircle className="h-4 w-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
      <p>Fields marked with an asterisk (*) are required</p>
    </div>
  );
}