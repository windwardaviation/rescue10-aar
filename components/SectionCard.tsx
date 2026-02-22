interface SectionCardProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
}

export function SectionCard({ title, badge, children }: SectionCardProps) {
  return (
    <div className="bg-navy-800 border border-navy-700 rounded-xl p-5 shadow-lg">
      {badge && (
        <span className="inline-block font-mono text-xs text-rescue-red uppercase tracking-wider mb-2">
          {badge}
        </span>
      )}
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      {children}
    </div>
  );
}
