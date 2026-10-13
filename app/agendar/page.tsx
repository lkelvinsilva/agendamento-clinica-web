"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { consultorios } from "@/lib/data/consultorios";
import { formatPrice } from "@/lib/Format";

type Modalidade = "horario" | "turno" | "diaria";

const modalidades = [
  {
    id: "horario" as const,
    numero: "01",
    titulo: "Por horário",
    descricao:
      "Escolha a data e o horário específico para utilizar o consultório.",
    detalhe: "Flexibilidade para reservar horários disponíveis.",
  },
  {
    id: "turno" as const,
    numero: "02",
    titulo: "Por turno",
    descricao:
      "Reserve um período completo, conforme os turnos disponíveis da clínica.",
    detalhe: "Manhã, tarde ou noite.",
  },
  {
    id: "diaria" as const,
    numero: "03",
    titulo: "Diária",
    descricao:
      "Reserve o consultório durante o período diário de funcionamento.",
    detalhe: "Ideal para atendimentos ao longo do dia.",
  },
];

export default function AgendarPage() {
  const [modalidadeSelecionada, setModalidadeSelecionada] =
    useState<Modalidade | null>(null);

  const [consultorioSelecionado, setConsultorioSelecionado] =
    useState<string | null>(null);

  const hrefContinuar = consultorioSelecionado
    ? modalidadeSelecionada === "horario"
      ? `/agendar/horario?consultorio=${consultorioSelecionado}&modalidade=horario`
      : modalidadeSelecionada === "turno"
        ? `/agendar/horario?consultorio=${consultorioSelecionado}&modalidade=turno`
        : modalidadeSelecionada === "diaria"
          ? `/agendar/horario?consultorio=${consultorioSelecionado}&modalidade=diaria`
          : "#"
    : "#";

  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#27231F]">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#746C62] transition hover:text-[#27231F]"
        >
          <span>←</span>
          Voltar
        </Link>

        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#9A7952]">
            Reserva
          </p>

          <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-[-0.025em] sm:text-5xl">
            Como você deseja reservar?
          </h1>

          <p className="mt-6 text-base leading-8 text-[#746C62] sm:text-lg">
            Escolha a modalidade de locação e, em seguida, selecione o
            consultório ideal para o seu atendimento.
          </p>
        </div>

        {/* Modalidades */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {modalidades.map((modalidade) => {
            const selecionada =
              modalidadeSelecionada === modalidade.id;

            return (
              <button
                key={modalidade.id}
                type="button"
                onClick={() => setModalidadeSelecionada(modalidade.id)}
                aria-pressed={selecionada}
                className={`flex min-h-52 flex-col border bg-white p-6 text-left transition duration-200 hover:-translate-y-1 ${
                  selecionada
                    ? "border-[#9A7952] ring-1 ring-[#9A7952]"
                    : "border-[#E5DDD1] hover:border-[#B99A6B]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.18em] text-[#9A7952]">
                    {modalidade.numero}
                  </span>

                  <span
                    className={`flex h-6 w-6 items-center justify-center border text-xs ${
                      selecionada
                        ? "border-[#9A7952] bg-[#9A7952] text-white"
                        : "border-[#E5DDD1] text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                </div>

                <h2 className="mt-5 font-serif text-2xl font-medium">
                  {modalidade.titulo}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#746C62]">
                  {modalidade.descricao}
                </p>

                <p className="mt-auto pt-5 text-xs text-[#9A7952]">
                  {modalidade.detalhe}
                </p>
              </button>
            );
          })}
        </div>

        {/* Consultórios */}
        <div className="mt-16">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#9A7952]">
              Próxima escolha
            </p>

            <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">
              Escolha o consultório
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#746C62]">
              {modalidadeSelecionada
                ? `Modalidade escolhida: ${
                    modalidades.find(
                      (item) => item.id === modalidadeSelecionada
                    )?.titulo
                  }. Agora selecione o espaço.`
                : "Selecione primeiro uma modalidade para continuar com sua reserva."}
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {consultorios.map((consultorio) => {
              const selecionado =
                consultorioSelecionado === consultorio.id;

              return (
                <button
                  key={consultorio.id}
                  type="button"
                  onClick={() =>
                    setConsultorioSelecionado(consultorio.id)
                  }
                  aria-pressed={selecionado}
                  className={`group overflow-hidden border bg-white text-left transition ${
                    selecionado
                      ? "border-[#9A7952] ring-1 ring-[#9A7952]"
                      : "border-[#E5DDD1] hover:border-[#B99A6B]"
                  }`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#EFE8DC]">
                    <Image
                      src={consultorio.image}
                      alt={consultorio.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.02]"
                    />

                    {selecionado && (
                      <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center bg-[#9A7952] text-white">
                        ✓
                      </div>
                    )}
                  </div>

                  <div className="p-7">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
                          {consultorio.id === "consultorio-01"
                            ? "01"
                            : "02"}
                        </p>

                        <h3 className="mt-2 font-serif text-2xl font-medium text-[#27231F]">
                          {consultorio.name}
                        </h3>
                      </div>

                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                          {modalidadeSelecionada === "horario"
                            ? "por hora"
                            : modalidadeSelecionada === "turno"
                              ? "por turno"
                              : modalidadeSelecionada === "diaria"
                                ? "por diária"
                                : "a partir de"}
                        </p>

                        
<p className="mt-1 text-lg font-medium text-[#27231F]">
  {modalidadeSelecionada === "horario"
    ? formatPrice(consultorio.price)
    : modalidadeSelecionada === "turno"
      ? "R$ 300,00"
      : modalidadeSelecionada === "diaria"
        ? "R$ 900,00"
        : "Selecione a modalidade"}
</p>

                      </div>
                    </div>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-[#746C62]">
                      {consultorio.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#E5DDD1] pt-5">
                      {consultorio.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs text-[#746C62]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-12 flex flex-col gap-5 border-t border-[#E5DDD1] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#9A7952]">
              Etapa 01 de 04
            </p>

            <p className="mt-2 text-sm text-[#746C62]">
              Escolha a modalidade e o consultório para continuar.
            </p>
          </div>

          <Link
            href={hrefContinuar}
            onClick={(event) => {
              if (!modalidadeSelecionada || !consultorioSelecionado) {
                event.preventDefault();
              }
            }}
            aria-disabled={
              !modalidadeSelecionada || !consultorioSelecionado
            }
            className={`inline-flex items-center justify-center px-7 py-3 text-sm font-medium transition ${
              modalidadeSelecionada && consultorioSelecionado
                ? "bg-[#27231F] text-white hover:bg-[#3A342F]"
                : "cursor-not-allowed bg-[#E5DDD1] text-[#9A9187]"
            }`}
          >
            Continuar
          </Link>
        </div>
      </section>
    </main>
  );
}