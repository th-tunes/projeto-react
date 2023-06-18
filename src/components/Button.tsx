type ButtonProps = {
  type?: "submit" | "button" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function Button({
  type,
  children,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-slate-950 text-yellow-500 text-sm uppercase py-2 px-3 font-bold rounded-md 
      ${className}`}
    >
      {children}
    </button>
  );
}
