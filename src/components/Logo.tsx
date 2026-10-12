export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label="Sculpt Clinic, на главную"
      className={`inline-flex items-baseline gap-1.5 leading-none ${className}`}
    >
      <span className="display text-[26px] tracking-[-0.04em]">Sculpt</span>
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] opacity-70">
        clinic
      </span>
    </a>
  );
}
