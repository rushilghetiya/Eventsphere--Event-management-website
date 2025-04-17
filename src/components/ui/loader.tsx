
import { Loader } from "lucide-react"; // Changed from Loader2 to Loader
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm" | "lg";
  text?: string;
}

export function Loader({ size = "default", text, className, ...props }: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <Loader className={cn("animate-spin text-milan-600", sizeClasses[size])} /> {/* Changed from Loader2 to Loader */}
      {text && <span className="ml-2">{text}</span>}
    </div>
  );
}
