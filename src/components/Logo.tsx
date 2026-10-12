export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label="Sculpt Clinic, на главную"
      className={`inline-flex items-center ${className}`}
    >
      <img src="/logo-mark.png" alt="" className="size-10" />
    </a>
  );
}
