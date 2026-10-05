"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { consultorios } from "@/lib/data/consultorios";
import { formatPrice } from "@/lib/Format";

export default function AgendarPage() {
  const [consultorioSelecionado, setConsultorioSelecionado] = useState<string | null>(
    null
  );

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
        {/* Cabeçalho */}
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#9A7952]">
            Reserva
          </p>

          <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-[-0.025em] sm:text-5xl">
            Escolha o espaço para o seu atendimento.
          </h1>

          <p className="mt-6 text-base leading-8 text-[#746C62] sm:text-lg">
            Selecione um dos consultórios disponíveis para continuar sua
            reserva.
          </p>
        </div>

        {/* Consultórios */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {consultorios.map((consultorio) => {
            const selecionado = consultorioSelecionado === consultorio.id;

            return (
              <button
                key={consultorio.id}
                type="button"
                onClick={() => setConsultorioSelecionado(consultorio.id)}
                className={`group overflow-hidden border bg-white text-left transition ${
                  selecionado
                    ? "border-[#9A7952] ring-1 ring-[#9A7952]"
                    : "border-[#E5DDD1] hover:border-[#B99A6B]"
                }`}
              >
                {/* Imagem */}
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

                {/* Informações */}
                <div className="p-7">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
                        {consultorio.id === "consultorio-01"
                          ? "01"
                          : "02"}
                      </p>

                      <h2 className="mt-2 font-serif text-2xl font-medium text-[#27231F]">
                        {consultorio.name}
                      </h2>
                    </div>

                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                        por hora
                      </p>

                      <p className="mt-1 text-lg font-medium text-[#27231F]">
                        {formatPrice(consultorio.price)}
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

        {/* Rodapé da etapa */}
        <div className="mt-12 flex flex-col gap-5 border-t border-[#E5DDD1] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#9A7952]">
              Etapa 01 de 04
            </p>

            <p className="mt-2 text-sm text-[#746C62]">
              Primeiro escolha o consultório que deseja reservar.
            </p>
          </div>

          <Link
            href={
  consultorioSelecionado
    ? `/agendar/horario?consultorio=${consultorioSelecionado}`
    : "#"
}
            onClick={(event) => {
              if (!consultorioSelecionado) {
                event.preventDefault();
              }
            }}
            className={`inline-flex items-center justify-center px-7 py-3 text-sm font-medium transition ${
              consultorioSelecionado
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