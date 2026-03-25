interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({ className = 'w-5 h-5 text-white' }: LogoIconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 3 20 Q 5 12 12 9 Q 19 12 21 20 H 3 M 12 9 C 11 6 11.5 2.5 14 2 C 16 1.5 18 3 18 5 C 18 7 16.5 8 15 8"
      />
    </svg>
  );
}
