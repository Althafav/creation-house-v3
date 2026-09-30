import type { ReactNode } from "react";

const spacingClasses = {
  md: "my-12 sm:my-16",
  hero: "pt-35 pb-7 md:pb-12 lg:pb-16",
  none: "",
} as const;

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  spacing?: keyof typeof spacingClasses;
  /** Break out of the parent container to span the full viewport width. */
  bleed?: boolean;
};

export default function Section({
  children,
  className = "",
  id = "",
  spacing = "md",
  bleed = false,
}: SectionProps) {
  const bleedClasses = bleed
    ? "relative left-1/2 w-screen -translate-x-1/2"
    : "";

  return (
    <div
      className={`${spacingClasses[spacing]} ${bleedClasses} ${className}`.trim()}
      id={id}
    >
      {children}
    </div>
  );
}
