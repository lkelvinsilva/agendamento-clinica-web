const depoimentos = [
  {
    text: "Um espaço muito confortável e organizado. Foi uma experiência excelente para atender meus pacientes.",
    name: "Mariana Alves",
    profession: "Cirurgiã-dentista",
  },
  {
    text: "A estrutura facilita muito a rotina. Consigo chegar, atender e sair sem precisar me preocupar com a manutenção de um consultório próprio.",
    name: "Rafael Martins",
    profession: "Fisioterapeuta",
  },
  {
    text: "Meus pacientes elogiaram bastante o ambiente e a sala de espera. O espaço transmite muito profissionalismo.",
    name: "Camila Rocha",
    profession: "Nutricionista",
  },
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);

  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";

  return `${first}${last}`.toUpperCase();
}

function Author({
  name,
  profession,
}: {
  name: string;
  profession: string;
}) {
  return (
    <figcaption className="mt-8 flex items-center gap-4">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8CCBC] bg-white font-serif text-sm text-[#806342]"
      >
        {getInitials(name)}
      </span>

      <div>
        <p className="text-sm font-medium text-[#27231F]">{name}</p>

        <p className="mt-0.5 text-xs text-[#746C62]">
          {profession}
        </p>
      </div>
    </figcaption>
  );
}

export function Depoimentos() {
  const [destaque, ...demais] = depoimentos;

  return (
    <section
      aria-labelledby="depoimentos-titulo"
      className="border-t border-[#E5DDD1] bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#B99A6B]" />

              <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#9A7952]">
                Experiências
              </span>
            </div>

            <h2
              id="depoimentos-titulo"
              className="mt-6 font-serif text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-[#27231F] sm:text-5xl"
            >
              Quem atende aqui também valoriza a experiência.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#746C62] sm:text-lg">
              Profissionais que utilizam nossos espaços compartilham um pouco
              da experiência de atender em um ambiente preparado para receber
              seus pacientes.
            </p>
          </div>

          <div className="hidden text-right lg:block">
            <span className="font-serif text-5xl text-[#C8A97E]">
              “
            </span>
          </div>
        </div>

        {/* Depoimentos */}
        <div className="mt-16 grid gap-0 border-t border-[#E5DDD1] lg:grid-cols-[1.15fr_0.85fr]">
          {/* Destaque */}
          <figure className="border-b border-[#E5DDD1] py-10 lg:border-b-0 lg:border-r lg:py-12 lg:pr-14">
            <blockquote>
              <p className="max-w-2xl font-serif text-3xl font-normal leading-[1.3] tracking-[-0.02em] text-[#27231F] sm:text-4xl">
                “{destaque.text}”
              </p>
            </blockquote>

            <Author
              name={destaque.name}
              profession={destaque.profession}
            />
          </figure>

          {/* Demais */}
          <div className="lg:pl-14">
            {demais.map((depoimento, index) => (
              <figure
                key={depoimento.name}
                className={`py-10 ${
                  index < demais.length - 1
                    ? "border-b border-[#E5DDD1]"
                    : ""
                }`}
              >
                <blockquote>
                  <p className="max-w-xl text-base leading-8 text-[#4E4842]">
                    “{depoimento.text}”
                  </p>
                </blockquote>

                <Author
                  name={depoimento.name}
                  profession={depoimento.profession}
                />
              </figure>
            ))}
          </div>
        </div>

        {/* Rodapé da seção */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[#E5DDD1] pt-6 text-xs uppercase tracking-[0.16em] text-[#A59A8D] sm:flex-row sm:items-center sm:justify-between">
          <span>Experiência profissional</span>
          <span>Conforto para seus pacientes</span>
          <span>Estrutura preparada</span>
        </div>
      </div>
    </section>
  );
}