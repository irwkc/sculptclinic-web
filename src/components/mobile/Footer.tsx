"use client";

import { clinic, footerLinks, locations } from "@/lib/content";
import { Logo } from "@/components/Logo";

/** Phone footer: contacts only. No booking button / form CTA. */
export function Footer() {
  return (
    <footer id="contact" className="bg-ink text-text-light">
      <div className="mx-auto max-w-[1600px] px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-20">
        <div className="flex justify-center">
          <Logo className="scale-110" />
        </div>

        <div className="mt-14">
          <h2 className="display text-[40px] leading-[1]">
            Готовы изменить улыбку?
          </h2>
          <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-white/60">
            Позвоните, подберём врача и удобный слот в рабочее время.
          </p>
          <a
            href={clinic.phoneHref}
            className="link-line mt-8 inline-block text-[22px] font-medium tracking-tight"
          >
            {clinic.phone}
          </a>
          {clinic.phoneAlt && (
            <a
              href={clinic.phoneAltHref}
              className="link-line mt-3 block text-[16px] text-white/70"
            >
              {clinic.phoneAlt}
            </a>
          )}
        </div>

        <div className="mt-16 grid gap-10 border-t hairline-light pt-10">
          <div>
            <p className="text-[13px] text-white/50">Направления</p>
            <ul className="mt-4 space-y-2 text-[15px]">
              {footerLinks.services.map((l) => (
                <li key={l.label}>
                  <a className="link-line" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[13px] text-white/50">Клиника</p>
            <ul className="mt-4 space-y-2 text-[15px]">
              {footerLinks.clinic.map((l) => (
                <li key={l.label}>
                  <a className="link-line" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {locations.map((l) => (
            <div key={l.id} className="text-[15px]">
              <p className="display text-[32px] leading-none">{l.name}</p>
              <p className="mt-3 text-white/70">{l.address}</p>
              <a href={clinic.phoneHref} className="link-line mt-1 inline-block">
                {l.phone}
              </a>
              <dl className="mt-5 grid grid-cols-[72px_1fr] gap-y-1 text-[14px] text-white/60">
                {l.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt>{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t hairline-light pt-6 text-[13px] text-white/50">
          <p>
            © 2026 {clinic.nameRu}. Лицензия № {clinic.license}. Имеются противопоказания.
            Необходима консультация специалиста.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.legal.map((l) => (
              <li key={l.label}>
                <a className="link-line" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="link-line w-fit" href={clinic.vk}>
            ВКонтакте
          </a>
        </div>
      </div>
    </footer>
  );
}
