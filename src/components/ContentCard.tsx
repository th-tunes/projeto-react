type ContentProps = {
  children: React.ReactNode;
};

export function ContentCard({ children }: ContentProps) {
  return (
    <div className={`flex flex-col p-3 font-black bg-white rounded mb-3 `}>
      {children}
    </div>
  );
}
