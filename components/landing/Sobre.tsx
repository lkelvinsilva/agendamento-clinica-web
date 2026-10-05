import Image from "next/image";

import { consultorios } from "@/lib/data/consultorios";

const destaques = [
  {
    number: "01",
    title: "Estrutura profissional",
    text: "Ambientes organizados para diferentes necessidades de atendimento.",
  },
  {
    number: "02",
    title: "Mais praticidade",
    text: "Reserve somente o período necessário para o seu atendimento.",
  },
];

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-[#9A7952]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

export function Sobre() {
  // Usa o segundo consultório para não repetir a foto do Hero
  const imagem = consultorios[1] ?? consultorios[0];

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="scroll-mt-8 border-t border-[#E5DDD1] bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          {/* Imagem */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#EFE8DC]">
              {imagem?.image ? (
                <Image
                  src={imagem.image}
                  alt={`Foto do ${imagem.name}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition duration-700 hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-10 text-center">
                  <div>
                    <p className="font-serif text-xl text-[#27231F]">
                      Um espaço para cuidar
                    </p>

                    <p className="mt-2 text-sm text-[#746C62]">
                      Foto do espaço em breve.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Identificação discreta da imagem */}
            <div className="absolute -bottom-5 right-5 border border-[#E5DDD1] bg-white px-5 py-4 shadow-[0_18px_40px_-28px_rgba(39,35,31,0.55)]">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#9A7952]">
                Nosso espaço
              </p>

              <p className="mt-1 font-serif text-lg text-[#27231F]">
                {imagem?.name ?? "Consultório"}
              </p>
            </div>
          </div>

          {/* Texto */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#B99A6B]" />

              <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#9A7952]">
                Sobre o espaço
              </span>
            </div>

            <h2
              id="sobre-titulo"
              className="mt-6 max-w-2xl font-serif text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-[#27231F] sm:text-5xl"
            >
              Um espaço pensado para profissionais e seus pacientes.
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#746C62] sm:text-lg">
              Oferecemos uma estrutura profissional, confortável e prática
              para quem precisa de um ambiente adequado para realizar seus
              atendimentos.
            </p>

            <p className="mt-5 max-w-xl leading-8 text-[#746C62]">
              Os consultórios estão preparados para receber seus pacientes, e
              a sala de espera compartilhada completa a experiência durante
              todo o período da reserva.
            </p>

            {/* Destaques */}
            <ul className="mt-10 border-t border-[#E5DDD1]">
              {destaques.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-5 border-b border-[#E5DDD1] py-6"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D8CCBC]">
                    <CheckIcon />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <p className="font-medium text-[#27231F]">
                        {item.title}
                      </p>

                      <span className="text-[10px] font-medium tracking-[0.16em] text-[#B99A6B]">
                        {item.number}
                      </span>
                    </div>

                    <p className="mt-2 max-w-lg text-sm leading-7 text-[#746C62]">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}