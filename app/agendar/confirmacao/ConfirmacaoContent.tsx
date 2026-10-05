"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  buscarReservaPorId,
  cancelarReserva,
} from "@/lib/data/reservas";
import { consultorios } from "@/lib/data/consultorios";

type Reserva = {
  id: string;
  consultorio_id: string;
  data: string;
  horario: string;

  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  observacoes: string | null;

  valor: number;
  status: string;
  forma_pagamento: string | null;

  created_at: string;
};

export default function ConfirmacaoPage() {
  const searchParams = useSearchParams();

  const reservaId = searchParams.get("reserva");

  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tempoRestante, setTempoRestante] = useState(15 * 60);

  useEffect(() => {
    async function carregarReserva() {
      if (!reservaId) {
        setErro("Reserva não encontrada.");
        setCarregando(false);
        return;
      }

      try {
        const dados = await buscarReservaPorId(reservaId);

        setReserva(dados);
      } catch (error) {
        console.error("Erro ao carregar reserva:", error);

        setErro(
          "Não foi possível carregar os dados da reserva."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarReserva();
  }, [reservaId]);

   useEffect(() => {
  if (!reserva || reserva.status !== "pendente") {
    return;
  }

  function atualizarContador() {
    const criadaEm = new Date(reserva!.created_at).getTime();
    const prazo = criadaEm + 15 * 60 * 1000;
    const agora = Date.now();

    const restante = Math.max(
  0,
  Math.floor((prazo - agora) / 1000)
);

setTempoRestante(restante);

if (restante === 0) {
  clearInterval(intervalo);

  cancelarReserva(reserva!.id)
    .then(() => {
      setReserva((reservaAtual) =>
        reservaAtual
          ? { ...reservaAtual, status: "cancelada" }
          : reservaAtual
      );
    })
    .catch((error) => {
      console.error(
        "Erro ao cancelar reserva expirada:",
        error
      );
    });
}
  }

  atualizarContador();

  const intervalo = setInterval(atualizarContador, 1000);

  return () => clearInterval(intervalo);
}, [reserva]);


  if (carregando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6">
        <div className="text-center">
          <p className="text-sm text-[#746C62]">
            Carregando sua reserva...
          </p>
        </div>
      </main>
    );
  }

  if (erro || !reserva) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6">
        <div className="w-full max-w-xl border border-[#E5DDD1] bg-white p-8 text-center sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center border border-red-200 bg-red-50">
            <span className="text-xl text-red-600">
              !
            </span>
          </div>

          <h1 className="mt-6 font-serif text-3xl text-[#27231F]">
            Reserva não encontrada
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#746C62]">
            {erro ||
              "Não encontramos os dados dessa reserva."}
          </p>

          <Link
            href="/"
            className="mt-8 inline-block bg-[#27231F] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#4A423B]"
          >
            Voltar para o início
          </Link>
        </div>
      </main>
    );
  }

 
  const consultorio = consultorios.find(
    (item) => item.id === reserva.consultorio_id
  );

  const valorReserva = Number(reserva.valor);

  const dataFormatada = new Date(
    `${reserva.data}T00:00:00`
  ).toLocaleDateString("pt-BR");

  const minutos = Math.floor(tempoRestante / 60)
  .toString()
  .padStart(2, "0");

const segundos = (tempoRestante % 60)
  .toString()
  .padStart(2, "0");

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
        <div className="w-full border border-[#E5DDD1] bg-white p-8 text-center sm:p-12">
          {/* Ícone */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#C8A97E] bg-[#F7F3EC]">
            <span className="text-2xl text-[#9A7952]">
              ✓
            </span>
          </div>

          {/* Título */}
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
            Reserva realizada
          </p>

          <h1 className="mt-3 font-serif text-3xl text-[#27231F] sm:text-4xl">
            Tudo certo com sua reserva
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#746C62]">
            Sua reserva foi registrada e está aguardando a
            confirmação do pagamento.
          </p>

          {/* Resumo */}
          <div className="mx-auto mt-8 max-w-lg border border-[#E5DDD1] bg-[#F7F3EC] p-6 text-left">
            {/* Número */}
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                Número da reserva
              </p>

              <p className="mt-1 break-all text-sm text-[#27231F]">
                {reserva.id}
              </p>
            </div>

            {/* Consultório */}
            <div className="mt-5 border-t border-[#E5DDD1] pt-5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                Consultório
              </p>

              <p className="mt-1 text-base text-[#27231F]">
                {consultorio?.name ??
                  reserva.consultorio_id}
              </p>
            </div>

            {/* Cliente */}
            <div className="mt-5 border-t border-[#E5DDD1] pt-5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                Cliente
              </p>

              <p className="mt-1 text-base text-[#27231F]">
                {reserva.nome}
              </p>

              {reserva.email && (
                <p className="mt-1 text-sm text-[#746C62]">
                  {reserva.email}
                </p>
              )}
            </div>

            {/* Data */}
            <div className="mt-5 border-t border-[#E5DDD1] pt-5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                Data
              </p>

              <p className="mt-1 text-base text-[#27231F]">
                {dataFormatada}
              </p>
            </div>

            {/* Horário */}
            <div className="mt-5 border-t border-[#E5DDD1] pt-5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                Horário
              </p>

              <p className="mt-1 text-base text-[#27231F]">
                {reserva.horario.slice(0, 5)}
              </p>
            </div>

            {/* Status */}
            <div className="mt-5 border-t border-[#E5DDD1] pt-5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                Status
              </p>

              <p className="mt-1 text-base text-[#9A7952]">
                {reserva.status === "pendente"
                  ? "Aguardando pagamento"
                  : reserva.status}
              </p>
            </div>

            {/* Valor */}
            <div className="mt-5 border-t border-[#E5DDD1] pt-5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                Valor
              </p>

              <p className="mt-1 font-serif text-2xl text-[#27231F]">
                R$ {valorReserva.toFixed(2).replace(".", ",")}
              </p>
            </div>
          </div>

          {/* PRAZO PARA PAGAMENTO */}
<div className="mx-auto mt-6 max-w-lg border border-[#C8A97E] bg-[#F7F3EC] px-5 py-5">
  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9A7952]">
    Prazo para pagamento
  </p>

  {tempoRestante > 0 ? (
    <>
      <p className="mt-2 text-sm leading-6 text-[#746C62]">
        Você tem até 15 minutos para realizar o pagamento
        e garantir o horário escolhido.
      </p>

      <div className="mt-4 text-center">
        <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
          Tempo restante
        </p>

        <p className="mt-1 font-serif text-4xl text-[#27231F]">
          {minutos}:{segundos}
        </p>
      </div>

      <p className="mt-4 text-xs leading-5 text-[#746C62]">
  Caso o pagamento não seja realizado dentro desse
  prazo, a reserva será cancelada e o horário ficará
  novamente disponível.
</p>

<Link
  href={`/agendar/pagamento?consultorio=${reserva.consultorio_id}&data=${reserva.data}&horario=${reserva.horario.slice(0, 5)}`}
  className="mt-5 inline-flex w-full items-center justify-center border border-[#9A7952] bg-[#9A7952] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#806341]"
>
  Ir para pagamento
</Link>
    </>
  ) : (
    <div className="mt-3">
      <p className="text-sm font-medium text-red-700">
        O prazo para pagamento expirou.
      </p>

      <p className="mt-2 text-sm leading-6 text-[#746C62]">
        Esta reserva será cancelada e o horário ficará
        novamente disponível.
      </p>
    </div>
  )}
</div>

          {/* Voltar */}
          <Link
            href="/"
            className="mt-8 inline-block bg-[#27231F] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#4A423B]"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </main>
  );
}