// Step instruction component for displaying test steps

interface StepInstructionProps {
  number: number;
  text: string;
}

export function StepInstruction({ number, text }: StepInstructionProps) {
  return (
    <div className="flex items-start gap-2 p-2 border border-border rounded-md bg-muted/50">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
        {number}
      </div>
      <div className="flex-1 pt-1">
        <p>{text}</p>
      </div>
    </div>
  );
}