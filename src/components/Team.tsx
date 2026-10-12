import { team, stats } from "@/lib/content";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

/** Dark team section: full-bleed group photo, three bios aligned under each doctor, stats strip. */
export function Team() {
  return (
    <section id="team" className="relative bg-ink text-text-light">
      <div className="relative min-h-[100dvh] overflow-hidden">
        <img
          src="/img/team.jpg"
          alt="Врачи Sculpt Clinic"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/40 to-ink" />

        <div className="relative mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-[60vh] md:px-8 md:pb-24 md:pt-[55vh]">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08} className="max-w-[32ch]">
                <p className="text-[17px] font-medium">{m.name}</p>
                <p className="text-[13px] text-white/50">{m.role}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-white/75">{m.bio}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 grid items-end gap-10 md:mt-40 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="text-[22px] font-medium leading-snug">
                Команда специалистов,
                <span className="block text-white/50">
                  которые соединяют клинический опыт и технологии.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7">
              <h2 className="display max-w-[16ch] text-[44px] leading-[0.98] md:text-[64px] lg:text-[76px]">
                Наша команда создаёт <em>исключительный</em> результат
              </h2>
              <Button variant="light" href="#contact" className="mt-10">
                Познакомиться с врачами
              </Button>
            </Reveal>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-10 md:px-8 md:pb-40">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t hairline-light pt-12 md:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <p className="display text-[56px] leading-none md:text-[72px]">{s.value}</p>
              <p className="mt-3 text-[13px] text-white/50">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
