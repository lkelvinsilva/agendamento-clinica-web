import Link from "next/link";
import Image from "next/image";

import { consultorios } from "@/lib/data/consultorios";
import { formatPrice } from "@/lib/Format";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7952] focus-visible:ring-offset-2";

export function ConsultoriosPreview() {
  return (
    <section
      id="consultorios"
      aria-labelledby="consultorios-titulo"
      className="scroll-mt-8 border-t border-[#E5DDD1] bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#B99A6B]" />

              <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#9A7952]">
                Nossos espaços
              </span>
            </div>

            <h2
              id="consultorios-titulo"
              className="mt-6 font-serif text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-[#27231F] sm:text-5xl"
            >
              Ambientes preparados para receber o seu trabalho.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#746C62] sm:text-lg">
              Dois consultórios cuidadosamente preparados para proporcionar
              conforto, praticidade e uma experiência profissional aos seus
              pacientes.
            </p>
          </div>

          <Link
            href="/consultorios"
            className={`group inline-flex w-fit shrink-0 items-center gap-3 border-b border-[#9A7952] pb-1.5 text-sm font-medium text-[#806342] transition hover:border-[#27231F] hover:text-[#27231F] ${focusRing}`}
          >
            Conhecer os espaços

            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10h12M11 5l5 5-5 5" />
            </svg>
          </Link>
        </div>

        {/* Consultórios */}
        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-10">
          {consultorios.map((consultorio, index) => (
            <article key={consultorio.id} className="group">
              {/* Imagem */}
              <Link
                href={`/consultorios/${consultorio.id}`}
                aria-label={`Ver detalhes do ${consultorio.name}`}
                className={`relative block aspect-[4/3] overflow-hidden bg-[#E8DED0] ${focusRing}`}
              >
                <Image
                  src={consultorio.image}
                  alt={`Foto do ${consultorio.name}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />

                {/* Número */}
                <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/85 backdrop-blur-md">
                  <span className="font-serif text-sm text-[#806342]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Indicador */}
                <div className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#27231F] shadow-lg transition duration-300 group-hover:bg-[#9A7952] group-hover:text-white">
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
                </div>
              </Link>

              {/* Informações */}
              <div className="pt-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-lg">
                    <h3 className="font-serif text-3xl font-medium tracking-tight text-[#27231F]">
                      {consultorio.name}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-7 text-[#746C62] sm:text-base">
                      {consultorio.description}
                    </p>
                  </div>

                  <div className="shrink-0 sm:text-right">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#9A7952]">
                      A partir de
                    </p>

                    <p className="mt-1 font-serif text-2xl font-medium text-[#27231F]">
                      {formatPrice(consultorio.price)}
                      <span className="ml-1 font-sans text-sm font-normal text-[#746C62]">
                        / hora
                      </span>
                    </p>
                  </div>
                </div>

                {/* Recursos */}
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#E5DDD1] pt-5">
                  {consultorio.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="flex items-center gap-2 text-xs text-[#746C62]"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#C8A97E]" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Sala de espera */}
        <div className="mt-20 border-t border-[#E5DDD1] pt-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#9A7952]">
                  Experiência completa
                </span>

                <span className="h-px w-8 bg-[#C8A97E]" />
              </div>

              <h3 className="mt-4 font-serif text-3xl font-medium tracking-tight text-[#27231F]">
                Sala de espera incluída para seus pacientes.
              </h3>

              <p className="mt-3 max-w-2xl leading-7 text-[#746C62]">
                Um ambiente confortável e acolhedor para receber seus
                pacientes durante todo o período da sua reserva.
              </p>
            </div>

            <Link
              href="/agendar"
              className={`group inline-flex w-fit items-center gap-3 rounded-full bg-[#9A7952] px-7 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-[#806342] ${focusRing}`}
            >
              Fazer uma reserva

              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}