import Link from "next/link";
import Image from "next/image";

import { consultorios } from "@/lib/data/consultorios";
import { formatPrice } from "@/lib/Format";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7952] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EC]";

const features = [
  "Ambientes modernos",
  "Horários flexíveis",
  "Pagamento seguro",
];

export function Hero() {
  const destaque = consultorios[0];

  return (
    <section id="inicio" className="bg-[#F7F3EC]">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:min-h-[720px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8 lg:py-20">
        {/* Conteúdo */}
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#B99A6B]" />

            <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#9A7952]">
              Espaços profissionais
            </span>
          </div>

          <h1 className="mt-7 font-serif text-5xl font-medium leading-[1.02] tracking-[-0.035em] text-[#27231F] sm:text-6xl lg:text-[68px]">
            Um espaço pensado para{" "}
            <span className="italic text-[#8F704C]">seu atendimento.</span>
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-8 text-[#746C62]">
            Consultórios cuidadosamente preparados para profissionais que
            valorizam conforto, praticidade e uma experiência especial para
            seus pacientes.
          </p>

          {/* Diferenciais */}
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm text-[#4E4842]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#C8A97E] text-[#9A7952]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3.5 8 3 3 6-6" />
                  </svg>
                </span>

                {feature}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/consultorios"
              className={`inline-flex items-center gap-3 rounded-full bg-[#9A7952] px-7 py-4 text-sm font-medium text-white shadow-[0_14px_30px_-18px_rgba(39,35,31,0.7)] transition duration-300 hover:bg-[#806342] ${focusRing}`}
            >
              Conhecer os consultórios

              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </Link>

            <Link
              href="#como-funciona"
              className="text-sm font-medium text-[#746C62] transition hover:text-[#9A7952]"
            >
              Como funciona
            </Link>
          </div>
        </div>

        {/* Imagem */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#E8DED0] lg:aspect-[4/4.7]">
            {destaque?.image ? (
              <Image
                src={destaque.image}
                alt={`Foto do ${destaque.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition duration-700 hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-10 text-center">
                <p className="text-sm text-[#746C62]">
                  Foto do espaço em breve.
                </p>
              </div>
            )}

            {/* Número sobre a imagem */}
            <div className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/85 px-4 py-2 backdrop-blur-md">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#746C62]">
                02 consultórios
              </p>
            </div>
          </div>

          {/* Card do consultório */}
          {destaque && (
            <Link
              href={`/consultorios/${destaque.id}`}
              className={`absolute -bottom-6 left-5 right-5 flex items-center gap-4 rounded-2xl border border-[#E5DDD1] bg-white p-4 shadow-[0_20px_50px_-24px_rgba(39,35,31,0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_-24px_rgba(39,35,31,0.6)] sm:left-auto sm:w-[330px] ${focusRing}`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EFE8DC] text-[#9A7952]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
                  <path d="M14 9h5a1 1 0 0 1 1 1v11" />
                  <path d="M3 21h18" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.12em] text-[#9A7952]">
                  Disponível para reserva
                </p>

                <p className="mt-1 truncate font-semibold text-[#27231F]">
                  {destaque.name}
                </p>

                <p className="mt-0.5 text-sm text-[#746C62]">
                  {formatPrice(destaque.price)} / hora
                </p>
              </div>

              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4 shrink-0 text-[#9A7952]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m7 4 6 6-6 6" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}