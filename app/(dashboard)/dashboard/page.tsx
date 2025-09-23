import { cn } from "../../../shared/lib/utils";

interface Props {
  className?: string
}

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("", "")}>
      Dashboard
      {children}
    </div>
  );
}