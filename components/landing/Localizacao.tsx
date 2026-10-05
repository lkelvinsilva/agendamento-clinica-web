const local = {
  endereco: "",
  horario: "Segunda a sábado",
  mapsUrl: "",
  embedUrl: "",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7952] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EC]";

export function Localizacao() {
  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-titulo"
      className="scroll-mt-8 border-t border-[#E5DDD1] bg-[#F7F3EC] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          {/* Informações */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#B99A6B]" />

              <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#9A7952]">
                Localização
              </span>
            </div>

            <h2
              id="localizacao-titulo"
              className="mt-6 max-w-xl font-serif text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-[#27231F] sm:text-5xl"
            >
              Um espaço fácil de encontrar.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-[#746C62] sm:text-lg">
              Uma localização pensada para facilitar a chegada de profissionais
              e proporcionar mais praticidade aos seus pacientes.
            </p>

            {/* Informações */}
            <dl className="mt-10 border-y border-[#D8CCBC]">
              <div className="grid gap-2 py-6 sm:grid-cols-[110px_1fr] sm:gap-6">
                <dt className="text-xs font-medium uppercase tracking-[0.16em] text-[#9A7952]">
                  Endereço
                </dt>

                <dd className="text-sm leading-6 text-[#27231F] sm:text-base">
                  {local.endereco || "Endereço em breve"}
                </dd>
              </div>

              <div className="grid gap-2 border-t border-[#E5DDD1] py-6 sm:grid-cols-[110px_1fr] sm:gap-6">
                <dt className="text-xs font-medium uppercase tracking-[0.16em] text-[#9A7952]">
                  Atendimento
                </dt>

                <dd className="text-sm leading-6 text-[#27231F] sm:text-base">
                  {local.horario}
                </dd>
              </div>
            </dl>

            {local.mapsUrl && (
              <a
                href={local.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group mt-8 inline-flex items-center gap-3 rounded-full bg-[#9A7952] px-7 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-[#806342] ${focusRing}`}
              >
                Abrir no Google Maps

                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 4v12M4 10h12" />
                </svg>

                <span className="sr-only">
                  {" "}
                  (abre em nova aba)
                </span>
              </a>
            )}
          </div>

          {/* Mapa */}
          <div className="relative aspect-[4/3] overflow-hidden bg-[#E8DED0] lg:aspect-[5/4]">
            {local.embedUrl ? (
              <iframe
                src={local.embedUrl}
                title="Mapa com a localização dos consultórios"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : (
              <div className="relative flex h-full items-center justify-center">
                {/* Elementos decorativos */}
                <div
                  aria-hidden="true"
                  className="absolute inset-8 border border-[#C8A97E]/30"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-16 border border-[#C8A97E]/15"
                />

                <div className="relative text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C8A97E]/50 bg-white/70">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#9A7952]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </div>

                  <p className="mt-6 font-serif text-2xl text-[#27231F]">
                    Nossa localização
                  </p>

                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#746C62]">
                    O mapa estará disponível assim que o endereço definitivo
                    for cadastrado.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}