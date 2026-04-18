import type { ReactNode } from "react";

export function GhostHeading({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`ghost-heading text-[18vw] md:text-[14vw] lg:text-[12rem] whitespace-nowrap overflow-hidden ${className}`}
    >
      {text}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
