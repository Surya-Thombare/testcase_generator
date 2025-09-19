import { Info } from "lucide-react";

interface ModuleDescriptionProps {
  description: string | undefined;
}

export function ModuleDescription({ description }: ModuleDescriptionProps) {
  if (!description) return null;
  
  return (
    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground p-2 bg-muted/50 rounded-lg border border-border">
      <Info className="h-4 w-4" />
      <p>{description}</p>
    </div>
  );
}