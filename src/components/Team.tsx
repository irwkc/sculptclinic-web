"use client";

import { useState } from "react";
import { stats, team } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

/**
 * Doctors as an expanding strip, not a carousel and not a card list.
 * One portrait is open; the others stay as narrow name columns.
 */
export function Team() {
  const [active, setActive] = useState(0);

  return (
    <section id="team" className="bg-ink text-text-light">
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32">
        <h2 className="display text-[56px] leading-[0.92] md:text-[84px]">Команда</h2>

        {/* desktop: strips share one row */}
        <div className="mt-10 hidden h-[min(72vh,680px)] min-h-[460px] gap-2 md:flex">
          {team.map((member, index) => {
            const open = index === active;
            return (
              <button
                key={member.name}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={open}
                className="relative h-full overflow-hidden text-left transition-[flex-grow] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none"
                style={{ flexGrow: open ? 8 : 1, flexBasis: 0 }}
              >
                <img
                  src={member.photo}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/25" />
                {open ? (
                  <span className="absolute inset-x-0 bottom-0 p-6">
                    <span className="block text-[20px] font-medium leading-snug">
                      {member.name}
                    </span>
                    <span className="mt-1 block max-w-[28ch] text-[14px] leading-snug text-white/60">
                      {member.role}
                    </span>
                  </span>
                ) : (
                  <span className="absolute inset-y-6 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 text-[14px] font-medium tracking-wide">
                    {member.name.split(" ")[0]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* phone: one portrait, names stacked under it */}
        <div className="mt-8 md:hidden">
          <div className="relative h-[58vh] min-h-[320px] overflow-hidden">
            <img
              src={team[active].photo}
              alt={team[active].name}
              className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-5">
              <span className="block text-[18px] font-medium">{team[active].name}</span>
              <span className="mt-1 block text-[13px] text-white/60">{team[active].role}</span>
            </span>
          </div>
          <ul className="mt-2">
            {team.map((member, index) => (
              <li key={member.name} className="border-b hairline-light">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={index === active}
                  className={`flex w-full items-center justify-between py-3.5 text-left text-[16px] ${
                    index === active ? "text-white" : "text-white/45"
                  }`}
                >
                  {member.name.split(" ")[0]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 pb-28 md:px-8 md:pb-36">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t hairline-light pt-12 md:grid-cols-3">
          {stats.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.06}>
              <p className="display text-[56px] leading-none md:text-[72px]">{item.value}</p>
              <p className="mt-3 text-[13px] text-white/50">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
