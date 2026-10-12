const words = ["Быстрее", "Точнее", "Без боли", "В цифре"];

/** Single kinetic strip: bridges the dark services block and the light technology block. */
export function Marquee() {
  const row = (
    <>
      <span className="shrink-0 px-6 text-[15px] font-medium text-text-dark/50 md:px-10">
        Современная стоматология:
      </span>
      {words.map((w) => (
        <span key={w} className="display shrink-0 px-6 text-[64px] leading-none md:px-10 md:text-[120px]">
          {w}
        </span>
      ))}
    </>
  );
  return (
    <div
      aria-hidden
      className="overflow-hidden border-y hairline-dark bg-stone py-6 md:py-8"
    >
      <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
        {row}
        {row}
      </div>
    </div>
  );
}
