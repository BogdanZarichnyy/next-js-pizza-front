import { cn } from "../../../shared/lib/utils";

interface Props {
  className?: string
}

export default function Dashboard({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <div className={cn("", "")}>
      Dashboard
    </div>
  );
}