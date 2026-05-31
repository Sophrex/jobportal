import Image from "next/image";

type PageHeroProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export default function PageHero({ title, description, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
            Travailleso
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">{description}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg shadow-green-900/5 ring-1 ring-green-100">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
