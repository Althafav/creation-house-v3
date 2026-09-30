interface ButtonProps {
  label: string;
  href: string;
  variant?: "primary" | "outline";
  target?: "_blank";
}

export default function Button({ label, href, variant = "outline", target }: ButtonProps) {
  const targetProps = target === "_blank" ? { target, rel: "noopener noreferrer" } : {};

  if (variant === "primary") {
    return (
      <a
        href={href}
        {...targetProps}
        className="shine-btn inline-flex shrink-0 items-center gap-4 rounded-full bg-[linear-gradient(100deg,#8be2c6,#b9f0dd_55%,#8be2c6)] py-2 pr-2 pl-7.5 text-[15.5px] font-semibold tracking-normal whitespace-nowrap text-black shadow-[0_18px_46px_-16px_rgba(139,226,198,.85),inset_0_1px_0_rgba(255,255,255,.55)] transition-[translate,box-shadow] duration-500 ease-expo hover:-translate-y-0.75 hover:text-black hover:shadow-[0_26px_60px_-18px_rgba(139,226,198,1),inset_0_1px_0_rgba(255,255,255,.7)]"
      >
        <span className="relative">{label}</span>
        <span className="relative inline-flex size-9.5 items-center justify-center rounded-full bg-black text-base leading-none text-accent text-white">
          →
        </span>
      </a>
    );
  }

  return (
    <a
      href={href}
      {...targetProps}
      className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/20 px-7 py-4 text-[15px] font-normal whitespace-nowrap text-white transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      {label}
    </a>
  );
}
