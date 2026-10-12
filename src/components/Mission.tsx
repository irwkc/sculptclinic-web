import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function Mission() {
  return (
    <section id="about" className="bg-stone px-5 py-28 md:px-8 md:py-44">
      <div className="mx-auto grid max-w-[1600px] gap-14 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-5">
          <h2 className="display text-[52px] leading-[0.95] md:text-[84px] lg:text-[104px]">
            Наша <em>цель</em>
          </h2>
          <p className="mt-8 max-w-[34ch] text-[17px] leading-relaxed text-text-dark/70">
            Десятилетия совместного опыта и постоянное обучение. Лечение, в основе
            которого знание, точность и внимание к деталям.
          </p>
        </Reveal>

        <div className="md:col-span-7 md:pt-24">
          <Reveal delay={0.1} className="flex items-start gap-6 md:gap-12">
            <span className="display shrink-0 text-[120px] leading-[0.8] text-text-dark/15 md:text-[220px]">
              12
            </span>
            <div className="pt-2 md:pt-6">
              <p className="text-[13px] text-text-dark/55">лет проектируем улыбки</p>
              <p className="display mt-4 max-w-[26ch] text-[26px] leading-[1.12] md:text-[40px]">
                Сделать стоматологию мирового уровня с индивидуальным подходом и
                сервисом, в котором каждый пациент чувствует себя главным.
              </p>
              <Button href="#team" className="mt-10">
                О клинике
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
