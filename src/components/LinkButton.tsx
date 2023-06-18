import { Link } from "react-router-dom";

type LinkButtonProps = {
  children: React.ReactNode;
  to: string;
  className?: string;
};

export function LinkButton({ children, to, className = "" }: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={`bg-slate-950 text-yellow-500 text-sm uppercase py-2 px-3 font-bold rounded-md 
        ${className}`}
    >
      {children}
    </Link>
  );
}
