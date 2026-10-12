"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "@phosphor-icons/react";
import { clinic, footerLinks, locations } from "@/lib/content";
import { Logo } from "./Logo";

type Status = "idle" | "sending" | "sent" | "error";

export function Footer() {
  const [location, setLocation] = useState(locations[0].id);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const next: typeof errors = {};
    if (name.length < 2) next.name = "Напишите, как к вам обращаться";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Проверьте номер телефона";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      // TODO: подключить реальную отправку (API route / CRM). Сейчас имитация.
      await new Promise((r) => setTimeout(r, 900));
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer id="contact" className="bg-ink text-text-light">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-24 md:px-8 md:pt-32">
        <div className="flex justify-center">
          <Logo className="scale-125" />
        </div>

        {/* booking */}
        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12">
          <div className="md:col-span-5 md:col-start-2">
            <h2 className="display text-[40px] leading-[1] md:text-[56px]">
              Готовы изменить улыбку? <em>Запишитесь на консультацию.</em>
            </h2>
            <p className="mt-6 max-w-[38ch] text-[15px] leading-relaxed text-white/60">
              Перезвоним в течение 15 минут в рабочее время, подберём врача и удобный слот.
            </p>
          </div>

          <form onSubmit={onSubmit} noValidate className="md:col-span-5 md:col-start-7">
            <fieldset>
              <legend className="text-[13px] text-white/50">Выберите клинику</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {locations.map((l) => (
                  <label
                    key={l.id}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-[14px] transition-colors ${
                      location === l.id
                        ? "border-white bg-white text-ink"
                        : "border-white/25 hover:border-white/60"
                    }`}
                  >
                    <input
                      type="radio"
                      name="location"
                      value={l.id}
                      checked={location === l.id}
                      onChange={() => setLocation(l.id)}
                      className="sr-only"
                    />
                    {l.name}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-6">
              <div className="grid gap-1">
                <label htmlFor="name" className="text-[13px] text-white/50">
                  Имя
                </label>
                <input id="name" name="name" autoComplete="name" className="field" />
                {errors.name && <p className="text-[13px] text-red-300">{errors.name}</p>}
              </div>
              <div className="grid gap-1">
                <label htmlFor="phone" className="text-[13px] text-white/50">
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7"
                  className="field"
                />
                {errors.phone && <p className="text-[13px] text-red-300">{errors.phone}</p>}
              </div>
              <div className="grid gap-1">
                <label htmlFor="message" className="text-[13px] text-white/50">
                  Сообщение
                </label>
                <textarea id="message" name="message" rows={2} className="field resize-none" />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="btn btn-light disabled:opacity-70"
              >
                <span>
                  {status === "sending"
                    ? "Отправляем"
                    : status === "sent"
                      ? "Заявка принята"
                      : "Отправить"}
                </span>
                <span className="btn-icon bg-ink/8">
                  {status === "sent" ? (
                    <Check size={13} weight="bold" />
                  ) : (
                    <ArrowUpRight size={13} weight="bold" />
                  )}
                </span>
              </button>
              {status === "error" && (
                <p className="text-[13px] text-red-300">Не получилось отправить. Позвоните нам.</p>
              )}
              <p className="text-[12px] text-white/40">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
              </p>
            </div>
          </form>
        </div>

        {/* links & locations */}
        <div className="mt-28 grid gap-12 border-t hairline-light pt-12 md:mt-36 md:grid-cols-12">
          <div className="md:col-span-3">
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
          <div className="md:col-span-2">
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
          <div className="grid gap-10 sm:grid-cols-2 md:col-span-7">
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
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t hairline-light pt-6 text-[13px] text-white/50 md:flex-row md:items-center md:justify-between">
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
          <ul className="flex gap-6">
            <li>
              <a className="link-line" href={clinic.vk}>
                ВКонтакте
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
