import Image from "next/image";

type PageHeroProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export default function PageHero({ title, description, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-zinc-900">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover opacity-40"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-lime-950/90 to-lime-900/70" />
      <div className="relative mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-lime-50">{description}</p>
      </div>
    </section>
  );
}
