interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`glass p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}
