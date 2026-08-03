/* Legal Page Template */
import ScrollReveal from '@/components/common/ScrollReveal';

interface LegalPageProps { title: string; overline: string; lastUpdated: string; children: React.ReactNode; }

export default function LegalPage({ title, overline, lastUpdated, children }: LegalPageProps) {
  return (
    <div>
      <section className="relative bg-primary-dark py-16 lg:py-24">
        <div className="container-custom relative z-10 text-center">
          <span className="overline text-accent-light">{overline}</span>
          <h1 className="heading-display text-white text-3xl sm:text-4xl lg:text-5xl mt-4">{title}</h1>
          <p className="mt-3 text-white/40 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <ScrollReveal>
            <div className="prose prose-gray max-w-none text-sm leading-relaxed [&_h2]:text-xl [&_h2]:font-700 [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-600 [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-gray-600 [&_li]:mb-1.5">
              {children}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
