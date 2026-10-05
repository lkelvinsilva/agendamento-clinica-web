import Link from "next/link";

const navegacao = [
  { label: "Início", href: "/" },
  { label: "Consultórios", href: "/consultorios" },
  { label: "Fazer uma reserva", href: "/agendar" },
];

const atendimento = [
  "Segunda a sábado",
  "Consulte os horários disponíveis",
  "Reserva online",
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7952] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EC]";

export function Footer() {
  return (
    <footer className="border-t border-[#E5DDD1] bg-[#F7F3EC]">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 lg:px-8">
        {/* Conteúdo principal */}
        <div className="grid gap-14 lg:grid-cols-[1.6fr_0.7fr_0.7fr]">
          {/* Marca */}
          <div>
            <Link
              href="/"
              className={`inline-block rounded font-serif text-3xl font-medium tracking-[-0.02em] text-[#27231F] ${focusRing}`}
            >
              Clínica
              <span className="text-[#B99A6B]">.</span>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#746C62]">
              Consultórios preparados para profissionais que valorizam uma
              experiência confortável, prática e profissional para seus
              pacientes.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C8A97E]" />

              <span className="text-xs uppercase tracking-[0.18em] text-[#9A7952]">
                Espaços profissionais
              </span>
            </div>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
              Navegação
            </h2>

            <ul className="mt-6 space-y-4">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group inline-flex items-center gap-2 rounded text-sm text-[#746C62] transition duration-300 hover:text-[#27231F] ${focusRing}`}
                  >
                    <span className="h-px w-0 bg-[#9A7952] transition-all duration-300 group-hover:w-3" />

                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Atendimento */}
          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
              Atendimento
            </h2>

            <ul className="mt-6 space-y-4 text-sm leading-6 text-[#746C62]">
              {atendimento.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="mt-16 border-t border-[#E5DDD1] pt-6">
          <div className="flex flex-col gap-3 text-xs text-[#A59A8D] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Clínica. Todos os direitos
              reservados.
            </p>

            <p>Um espaço para o seu atendimento.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}