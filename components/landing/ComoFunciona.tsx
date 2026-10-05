import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Escolha o consultório",
    text: "Compare os dois ambientes e escolha o espaço que melhor atende às necessidades do seu atendimento.",
  },
  {
    number: "02",
    title: "Escolha data e horário",
    text: "Consulte a disponibilidade e selecione o período ideal para realizar o seu atendimento.",
  },
  {
    number: "03",
    title: "Confirme sua reserva",
    text: "Informe seus dados, confirme a reserva e tenha todas as informações necessárias para o seu atendimento.",
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7952] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EC]";

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-titulo"
      className="scroll-mt-8 border-t border-[#E5DDD1] bg-[#F7F3EC] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#B99A6B]" />

              <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#9A7952]">
                Como funciona
              </span>
            </div>

            <h2
              id="como-funciona-titulo"
              className="mt-6 max-w-2xl font-serif text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-[#27231F] sm:text-5xl"
            >
              Reserve seu espaço de forma simples e tranquila.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#746C62] sm:text-lg">
              Do primeiro acesso à confirmação da reserva, tudo foi pensado
              para tornar a experiência mais prática para você.
            </p>
          </div>

          <Link
            href="/agendar"
            className={`inline-flex w-fit items-center gap-3 rounded-full border border-[#9A7952] bg-transparent px-6 py-3.5 text-sm font-medium text-[#806342] transition duration-300 hover:bg-[#9A7952] hover:text-white ${focusRing}`}
          >
            Fazer uma reserva

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
        </div>

        {/* Etapas */}
        <ol className="mt-20 grid border-t border-[#D8CCBC] md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className={`relative py-9 md:px-8 md:py-10 ${
                index > 0 ? "border-t border-[#D8CCBC] md:border-l md:border-t-0" : ""
              }`}
            >
              {/* Número */}
              <div className="flex items-start justify-between">
                <span className="font-serif text-4xl font-medium tracking-tight text-[#B99A6B]">
                  {step.number}
                </span>

                {index === 0 && (
                  <span className="text-xs uppercase tracking-[0.18em] text-[#A59A8D]">
                    Comece aqui
                  </span>
                )}
              </div>

              <h3 className="mt-10 text-xl font-medium tracking-tight text-[#27231F]">
                <span className="sr-only">
                  Passo {index + 1}:{" "}
                </span>
                {step.title}
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-7 text-[#746C62] sm:text-base">
                {step.text}
              </p>

              {/* Linha decorativa */}
              <div className="mt-8 h-px w-10 bg-[#C8A97E]" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}