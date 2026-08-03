import Image from 'next/image';

interface PageHeroProps {
  title: string;
  overline?: string;
  description?: string;
  backgroundImage: string;
}

export default function PageHero({ title, overline, description, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative bg-primary-dark py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className="object-cover opacity-25 filter brightness-[0.8] contrast-[1.05]"
          sizes="100vw"
        />
        {/* Deep Green/Black Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-emerald-950/20 to-black/85" />
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        {overline && (
          <span className="overline text-accent-light tracking-[0.2em] font-700 text-xs sm:text-sm uppercase block mb-3 animate-in fade-in slide-in-from-top-4 duration-500">
            {overline}
          </span>
        )}
        <h1 className="heading-display text-white text-4xl sm:text-5xl lg:text-6xl font-900 tracking-tight leading-tight animate-in fade-in slide-in-from-top-6 duration-700">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-white/70 text-base sm:text-lg max-w-2xl mx-auto font-500 leading-relaxed animate-in fade-in slide-in-from-top-8 duration-900">
            {description}
          </p>
        )}
        <div className="accent-line accent-line-center mt-6 animate-in fade-in zoom-in duration-1000" />
      </div>
    </section>
  );
}
