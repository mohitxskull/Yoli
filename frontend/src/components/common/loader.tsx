import { Loader2 } from "lucide-react";

interface LoaderProps {
  text?: string;
  size?: number;
}

export default function Loader({
  text = "Loading...",
  size = 24,
}: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-10">
      <Loader2
        className={`h-${size / 4} w-${size / 4} animate-spin text-primary`}
      />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
