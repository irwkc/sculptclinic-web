import { Plus, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "dark" | "light" | "ghost-light";

type Props = {
  variant?: Variant;
  icon?: "plus" | "arrow" | "none";
  className?: string;
  children: React.ReactNode;
} & (
  | ({ as?: "a" } & ComponentPropsWithoutRef<"a">)
  | ({ as: "button" } & ComponentPropsWithoutRef<"button">)
);

const iconBg: Record<Variant, string> = {
  dark: "bg-white/12",
  light: "bg-ink/8",
  "ghost-light": "bg-white/12",
};

export function Button({
  variant = "dark",
  icon = "plus",
  className = "",
  children,
  ...rest
}: Props) {
  const classes = `btn btn-${variant} ${className}`;
  const Icon = icon === "plus" ? Plus : icon === "arrow" ? ArrowUpRight : null;
  const content = (
    <>
      <span>{children}</span>
      {Icon && (
        <span className={`btn-icon ${iconBg[variant]}`}>
          <Icon size={13} weight="bold" />
        </span>
      )}
    </>
  );

  if (rest.as === "button") {
    const { as: _as, ...btnProps } = rest;
    void _as;
    return (
      <button className={classes} {...btnProps}>
        {content}
      </button>
    );
  }
  const { as: _as, ...aProps } = rest;
  void _as;
  return (
    <a className={classes} {...aProps}>
      {content}
    </a>
  );
}
