type CardProps = {
  children: React.ReactNode;
  className?: string;
};
export function Card({ children, className }: CardProps) {
  return (
    <div className={`m-4 rounded  p-2 max-w-screen-lg md:mx-auto ${className}`}>
      {children}
    </div>
  );
}
