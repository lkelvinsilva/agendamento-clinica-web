import Link from "next/link";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#27231F]";

export function CTA() {
  return (
    <section
      aria-labelledby="cta-titulo"
      className="bg-[#F7F3EC] px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden bg-[#27231F] px-8 py-16 sm:px-12 lg:px-16 lg:py-20">
          {/* Elemento decorativo */}
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-[#C8A97E]/20"
          />

          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-[#C8A97E]/10"
          />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            {/* Texto */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#C8A97E]" />

                <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#C8A97E]">
                  Reserve seu espaço
                </span>
              </div>

              <h2
                id="cta-titulo"
                className="mt-7 max-w-3xl font-serif text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl"
              >
                Seu próximo atendimento começa aqui.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                Escolha o consultório que combina com o seu atendimento,
                encontre o melhor horário e faça sua reserva de forma simples
                e segura.
              </p>
            </div>

            {/* Ações */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/agendar"
                className={`group inline-flex items-center justify-center gap-3 rounded-full bg-[#C8A97E] px-7 py-3.5 text-sm font-medium text-[#27231F] transition duration-300 hover:bg-[#D8B98B] ${focusRing}`}
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

              <Link
                href="/consultorios"
                className={`inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/85 transition duration-300 hover:border-white/40 hover:bg-white/5 hover:text-white ${focusRing}`}
              >
                Conhecer os consultórios
              </Link>
            </div>
          </div>

          {/* Linha inferior */}
          <div className="relative mt-14 border-t border-white/10 pt-5">
            <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.14em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
              <span>02 consultórios disponíveis</span>
              <span>Reserva por hora</span>
              <span>Sala de espera incluída</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}