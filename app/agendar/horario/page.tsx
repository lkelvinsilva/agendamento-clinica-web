
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { consultorios } from "@/lib/data/consultorios";
import { CalendarBooking } from "@/components/agendamento/CalendarBooking";

export default function HorarioPage() {
  const searchParams = useSearchParams();

  const consultorioId = searchParams.get("consultorio");

  const consultorio = consultorios.find(
    (item) => item.id === consultorioId
  );

  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#27231F]">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        {/* VOLTAR */}
        <Link
          href="/agendar"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#746C62] transition hover:text-[#27231F]"
        >
          <span>←</span>
          Voltar
        </Link>

        {/* CABEÇALHO */}
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#9A7952]">
            Reserva
          </p>

          <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-[-0.025em] sm:text-5xl">
            Escolha a data e o horário.
          </h1>

          <p className="mt-6 text-base leading-8 text-[#746C62] sm:text-lg">
            Selecione quando deseja realizar seu atendimento.
          </p>
        </div>

        {/* CONSULTÓRIO SELECIONADO */}
        {consultorio && (
          <div className="mt-8 border-y border-[#E5DDD1] py-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#9A7952]">
              Consultório selecionado
            </p>

            <div className="mt-2 flex items-center justify-between gap-4">
              <p className="font-serif text-xl text-[#27231F]">
                {consultorio.name}
              </p>

              <p className="text-sm text-[#746C62]">
                {consultorio.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                {" / hora"}
              </p>
            </div>
          </div>
        )}

        {/* CALENDÁRIO */}
        <div className="mt-14 max-w-4xl">
          <CalendarBooking
            consultorioId={consultorioId ?? ""}
          />

          {/* RODAPÉ */}
          <div className="mt-14 border-t border-[#E5DDD1] pt-8">
            <p className="text-xs uppercase tracking-[0.18em] text-[#9A7952]">
              Etapa 02 de 04
            </p>

            <p className="mt-2 text-sm leading-6 text-[#746C62]">
              Escolha uma data e um horário disponíveis para
              continuar sua reserva.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

