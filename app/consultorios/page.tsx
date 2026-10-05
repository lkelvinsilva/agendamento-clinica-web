import Link from "next/link";
import Image from "next/image";
import { Fraunces, Manrope } from "next/font/google";
import { consultorios } from "@/lib/data/consultorios";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

function formatPrice(value: number | string) {
  const number = Number(value);
  if (Number.isNaN(number)) return `R$ ${value}`;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: number % 1 === 0 ? 0 : 2,
  }).format(number);
}

const highlights = [
  { title: "Reserva por hora", text: "Pague apenas pelo tempo que utilizar." },
  { title: "Sala de espera inclusa", text: "Acolhimento para seus pacientes." },
  { title: "Agenda online", text: "Escolha data e horário em poucos cliques." },
];

const steps = [
  {
    title: "Escolha o consultório",
    text: "Compare estrutura e valores e selecione o espaço ideal.",
  },
  {
    title: "Defina data e horário",
    text: "Veja a agenda e reserve o período que precisar.",
  },
  {
    title: "Confirme e atenda",
    text: "Receba a confirmação e chegue para atender com tudo pronto.",
  },
];

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 shrink-0 text-[#9A7952]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7952] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EC]";

export default function ConsultoriosPage() {
  return (
    <main
      className={`${display.variable} ${body.variable} min-h-screen bg-[#F7F3EC] font-[family-name:var(--font-body)] text-[#27231F] antialiased`}
    >
      {/* Cabeçalho */}
      <section className="border-b border-[#E5DDD1]">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-8 lg:pb-24">
          <nav aria-label="Navegação estrutural" className="text-sm text-[#746C62]">
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  href="/"
                  className={`rounded transition hover:text-[#9A7952] ${focusRing}`}
                >
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#27231F]">
                Consultórios
              </li>
            </ol>
          </nav>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Consultórios prontos para receber você e seus pacientes.
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[#746C62]">
                Dois ambientes equipados, com sala de espera e reserva por
                hora. Escolha o que combina com o seu atendimento e agende
                online.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/agendar"
                  className={`rounded-full bg-[#27231F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#9A7952] ${focusRing}`}
                >
                  Fazer uma reserva
                </Link>
                <a
                  href="#consultorios"
                  className={`rounded-full border border-[#D8CCBC] px-7 py-3.5 text-sm font-semibold transition hover:bg-[#EFE8DC] ${focusRing}`}
                >
                  Conhecer os espaços
                </a>
              </div>
            </div>

            <ul className="divide-y divide-[#E5DDD1] rounded-3xl border border-[#E5DDD1] bg-white/60 backdrop-blur">
              {highlights.map((item) => (
                <li key={item.title} className="flex gap-4 p-6">
                  <CheckIcon />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#746C62]">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Consultórios */}
      <section id="consultorios" className="scroll-mt-8 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight sm:text-4xl">
              Escolha o seu consultório
            </h2>
            <p className="mt-4 leading-7 text-[#746C62]">
              Todos os valores são por hora, com a sala de espera incluída.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {consultorios.map((consultorio, index) => (
              <article
                key={consultorio.id}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-[#E5DDD1] bg-white shadow-[0_1px_2px_rgba(39,35,31,0.04)] transition duration-300 hover:shadow-[0_24px_48px_-24px_rgba(39,35,31,0.25)]"
              >
                {/* Imagem */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#E8DED0]">
                  <Image
                    src={consultorio.image}
                    alt={`Foto do ${consultorio.name}`}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#27231F]/40 to-transparent"
                  />
                </div>

                {/* Conteúdo */}
                <div className="flex flex-1 flex-col p-8 lg:p-9">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight">
                    {consultorio.name}
                  </h3>

                  <p className="mt-4 leading-7 text-[#746C62]">
                    {consultorio.description}
                  </p>

                  <div className="mt-7">
                    <h4 className="text-sm font-semibold">O que está incluso</h4>
                    <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {consultorio.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm leading-6 text-[#746C62]"
                        >
                          <CheckIcon />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Rodapé */}
                  <div className="mt-auto flex flex-col gap-6 border-t border-[#E5DDD1] pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <div className="mt-8 sm:mt-0">
                      <p className="text-xs text-[#746C62]">A partir de</p>
                      <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-medium">
                        {formatPrice(consultorio.price)}
                        <span className="ml-1 font-[family-name:var(--font-body)] text-sm font-normal text-[#746C62]">
                          / hora
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/consultorios/${consultorio.id}`}
                        className={`rounded-full border border-[#D8CCBC] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#EFE8DC] ${focusRing}`}
                      >
                        Ver detalhes
                      </Link>

                      <Link
                        href={`/agendar?consultorio=${consultorio.id}`}
                        className={`rounded-full bg-[#27231F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9A7952] ${focusRing}`}
                      >
                        Reservar agora
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sala de espera */}
      <section className="border-y border-[#E5DDD1] bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="max-w-xl font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight sm:text-4xl">
                Uma sala de espera que recebe bem o seu paciente
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-[#746C62]">
                A estrutura compartilhada fica à disposição durante todo o
                período da sua reserva, para que a experiência do paciente
                comece antes mesmo da consulta.
              </p>

              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#E5DDD1] bg-[#F7F3EC] p-5">
                  <dt className="font-semibold">Ambiente confortável</dt>
                  <dd className="mt-1.5 text-sm leading-6 text-[#746C62]">
                    Espaço pensado para uma espera tranquila.
                  </dd>
                </div>

                <div className="rounded-2xl border border-[#E5DDD1] bg-[#F7F3EC] p-5">
                  <dt className="font-semibold">Sem custo adicional</dt>
                  <dd className="mt-1.5 text-sm leading-6 text-[#746C62]">
                    Incluída durante o horário reservado.
                  </dd>
                </div>
              </dl>
            </div>

           <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
  <Image
    src="/consultorios/recepcao.jpeg"
    alt="Recepção e sala de espera"
    fill
    className="object-cover"
  />
</div>
</div>
</div>
</section>

{/* Como funciona */}
      {/* Como funciona */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="max-w-xl font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight sm:text-4xl">
            Reservar é simples
          </h2>

          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-[#D8CCBC] pt-6">
                <span className="font-[family-name:var(--font-display)] text-2xl text-[#9A7952]">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-[#746C62]">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-[#27231F] px-8 py-12 text-white sm:px-12 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight sm:text-4xl">
              Pronto para reservar o seu horário?
            </h2>
            <p className="mt-4 leading-7 text-white/70">
              Escolha a data e o horário em que deseja usar o espaço.
            </p>
          </div>

          <Link
            href="/agendar"
            className="inline-flex shrink-0 rounded-full bg-[#C8A97E] px-7 py-3.5 text-sm font-semibold text-[#27231F] transition hover:bg-[#E0C79F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#27231F]"
          >
            Fazer uma reserva
          </Link>
        </div>
      </section>
    </main>
  );
}
