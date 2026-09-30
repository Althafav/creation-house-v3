import Image from "next/image";

type ServiceRowProps = {
  index: number;
  title: string;
  imageUrl?: string;
};

export default function ServiceRow({ index, title, imageUrl }: ServiceRowProps) {
  return (
    <li className="group relative border-t border-white/10 py-7 md:py-12 lg:py-18">
      {/* Hover image: bleeds past the row's content edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-2.5 md:-inset-x-6 lg:-inset-x-11 -inset-y-px overflow-hidden [--r:14px] lg:[--r:20px] [clip-path:inset(50%_0_50%_0_round_var(--r))] transition-[clip-path] duration-500 ease-expo group-hover:[clip-path:inset(0_0_0_0_round_var(--r))] group-hover:duration-800 motion-reduce:duration-20 motion-reduce:group-hover:duration-20"
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="(min-width: 1200px) 1080px, 90vw"
            quality={70}
            decoding="async"
            className="scale-110 object-cover grayscale transition-transform duration-500 ease-expo group-hover:scale-100 group-hover:duration-1200 motion-reduce:duration-20 motion-reduce:group-hover:duration-20"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.65))]" />
      </div>

      <div className="relative grid grid-cols-[32px_1fr] sm:grid-cols-[44px_1fr] md:grid-cols-[72px_1fr] lg:grid-cols-[96px_1fr]">
        <span className="pt-[.5em] text-[13px] lg:text-[17px] text-white transition-colors duration-500 group-hover:text-accent">
          {index + 1}
        </span>
        <h3 className="text-3xl md:text-5xl lg:text-6xl leading-[1.05] font-semibold tracking-normal text-white transition-colors duration-500 group-hover:text-accent">
          {title}
        </h3>
      </div>
    </li>
  );
}
