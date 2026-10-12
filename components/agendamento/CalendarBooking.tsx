
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { buscarHorariosOcupados } from "@/lib/data/reservas";

type Modalidade = "horario" | "turno" | "diaria";

type CalendarBookingProps = {
  consultorioId: string;
  modalidade: Modalidade;
};

export function CalendarBooking({
  consultorioId,
  modalidade,
}: CalendarBookingProps) {
  const [mesAtual, setMesAtual] = useState(new Date());
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [turnoSelecionado, setTurnoSelecionado] = useState<string | null>(null);
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [carregandoHorarios, setCarregandoHorarios] = useState(false);

  const turnos = [
    {
      id: "manha",
      nome: "Manhã",
      periodo: "08:00 às 12:00",
      horarios: ["08:00", "09:00", "10:00", "11:00"],
    },
    {
      id: "tarde",
      nome: "Tarde",
      periodo: "13:00 às 17:00",
      horarios: ["13:00", "14:00", "15:00", "16:00"],
    },
    {
      id: "noite",
      nome: "Noite",
      periodo: "18:00 às 21:00",
      horarios: ["18:00", "19:00", "20:00", "21:00"],
    },
  ];

  function formatarData(data: Date) {
    return `${data.getFullYear()}-${String(
      data.getMonth() + 1
    ).padStart(2, "0")}-${String(data.getDate()).padStart(2, "0")}`;
  }

  useEffect(() => {
    async function carregarHorariosOcupados() {
      if (!dataSelecionada || !consultorioId) {
        setHorariosOcupados([]);
        return;
      }

      try {
        setCarregandoHorarios(true);

        const horarios = await buscarHorariosOcupados(
          consultorioId,
          formatarData(dataSelecionada)
        );

        setHorariosOcupados(horarios);
      } catch (error) {
        console.error("Erro ao carregar horários ocupados:", error);
        setHorariosOcupados([]);
      } finally {
        setCarregandoHorarios(false);
      }
    }

    carregarHorariosOcupados();
  }, [dataSelecionada, consultorioId]);

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const nomeMes = mesAtual.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const primeiroDiaDoMes = new Date(
    mesAtual.getFullYear(),
    mesAtual.getMonth(),
    1
  );

  const quantidadeDias = new Date(
    mesAtual.getFullYear(),
    mesAtual.getMonth() + 1,
    0
  ).getDate();

  const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const diaDaSemana = primeiroDiaDoMes.getDay();
  const deslocamento = diaDaSemana === 0 ? 6 : diaDaSemana - 1;

  function mesAnterior() {
    setMesAtual(
      new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1, 1)
    );
    setDataSelecionada(null);
    setHorarioSelecionado(null);
    setTurnoSelecionado(null);
    setHorariosOcupados([]);
  }

  function proximoMes() {
    setMesAtual(
      new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 1)
    );
    setDataSelecionada(null);
    setHorarioSelecionado(null);
    setTurnoSelecionado(null);
    setHorariosOcupados([]);
  }

  function selecionarData(data: Date) {
    setDataSelecionada(data);
    setHorarioSelecionado(null);
    setTurnoSelecionado(null);
    setHorariosOcupados([]);
  }

  const dataFormatada = dataSelecionada
    ? formatarData(dataSelecionada)
    : "";

  const podeContinuar =
    (modalidade === "horario" && Boolean(horarioSelecionado)) ||
    (modalidade === "turno" && Boolean(turnoSelecionado)) ||
    (modalidade === "diaria" && turnoSelecionado === "diaria");

  const parametrosContinuar = `/agendar/dados?consultorio=${encodeURIComponent(
    consultorioId
  )}&data=${dataFormatada}&modalidade=${modalidade}${
    modalidade === "horario"
      ? `&horario=${encodeURIComponent(horarioSelecionado ?? "")}`
      : modalidade === "turno"
        ? `&turno=${encodeURIComponent(turnoSelecionado ?? "")}`
        : "&turno=diaria"
  }`;

  return (
    <div className="max-w-2xl">
      {/* CABEÇALHO DO CALENDÁRIO */}
      <div className="flex items-center justify-between border-b border-[#E5DDD1] pb-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
            Disponibilidade
          </p>

          <h2 className="mt-2 font-serif text-xl capitalize text-[#27231F] sm:text-2xl">
            {nomeMes}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={mesAnterior}
            aria-label="Mês anterior"
            className="flex h-8 w-8 items-center justify-center border border-[#E5DDD1] bg-white text-sm text-[#27231F] transition hover:border-[#B99A6B]"
          >
            ←
          </button>

          <button
            type="button"
            onClick={proximoMes}
            aria-label="Próximo mês"
            className="flex h-8 w-8 items-center justify-center border border-[#E5DDD1] bg-white text-sm text-[#27231F] transition hover:border-[#B99A6B]"
          >
            →
          </button>
        </div>
      </div>

      {/* CALENDÁRIO */}
      <div className="mt-6">
        <div className="grid grid-cols-7 gap-2">
          {diasDaSemana.map((dia) => (
            <div
              key={dia}
              className="py-2 text-center text-xs font-medium uppercase tracking-[0.12em] text-[#746C62]"
            >
              {dia}
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-2">
          {Array.from({ length: deslocamento }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {Array.from({ length: quantidadeDias }).map((_, index) => {
            const dia = index + 1;

            const dataDoDia = new Date(
              mesAtual.getFullYear(),
              mesAtual.getMonth(),
              dia
            );

            dataDoDia.setHours(0, 0, 0, 0);

            const dataPassada = dataDoDia < hoje;
            const domingo = dataDoDia.getDay() === 0;

            const selecionada =
              dataSelecionada?.getDate() === dia &&
              dataSelecionada?.getMonth() === mesAtual.getMonth() &&
              dataSelecionada?.getFullYear() === mesAtual.getFullYear();

            return (
              <button
                key={dia}
                type="button"
                disabled={dataPassada || domingo}
                onClick={() => selecionarData(dataDoDia)}
                className={`flex h-12 items-center justify-center border text-sm transition ${
                  dataPassada || domingo
                    ? "cursor-not-allowed border-[#E5DDD1] bg-[#F7F3EC] text-[#C8C0B6]"
                    : selecionada
                      ? "border-[#9A7952] bg-[#C8A97E] text-white"
                      : "border-[#E5DDD1] bg-white text-[#27231F] hover:border-[#B99A6B]"
                }`}
              >
                {dia}
              </button>
            );
          })}
        </div>
      </div>

      {/* HORÁRIOS E PERÍODOS */}
      <div className="mt-8 border-t border-[#E5DDD1] pt-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
            {modalidade === "turno"
              ? "Turnos disponíveis"
              : modalidade === "diaria"
                ? "Reserva diária"
                : "Horários disponíveis"}
          </p>

          <h3 className="mt-2 font-serif text-xl text-[#27231F]">
            {!dataSelecionada
              ? "Selecione uma data primeiro"
              : modalidade === "turno"
                ? "Escolha um turno"
                : modalidade === "diaria"
                  ? "Confirme a data da diária"
                  : "Escolha um horário"}
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#746C62]">
            {modalidade === "turno"
              ? "Selecione um período completo para utilizar o consultório."
              : modalidade === "diaria"
                ? "A diária corresponde à reserva do consultório durante o dia."
                : "Selecione um dos horários disponíveis para continuar."}
          </p>
        </div>

        {dataSelecionada && (
          <>
            {carregandoHorarios ? (
              <p className="mt-5 text-sm text-[#746C62]">
                Verificando horários disponíveis...
              </p>
            ) : (
              <div className="mt-6 space-y-8">
                {/* RESERVA POR HORÁRIO */}
                {modalidade === "horario" && (
                  <div className="space-y-8">
                    {turnos.map((turno) => (
                      <div key={turno.id}>
                        <div className="mb-3">
                          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#9A7952]">
                            {turno.nome}
                          </p>
                          <p className="mt-1 text-xs text-[#746C62]">
                            {turno.periodo}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                          {turno.horarios.map((horario) => {
                            const horarioOcupado =
                              horariosOcupados.includes(horario);

                            const selecionado =
                              horarioSelecionado === horario;

                            return (
                              <button
                                key={horario}
                                type="button"
                                disabled={horarioOcupado}
                                onClick={() =>
                                  setHorarioSelecionado(horario)
                                }
                                className={`border px-4 py-3 text-sm transition ${
                                  horarioOcupado
                                    ? "cursor-not-allowed border-[#E5DDD1] bg-[#F7F3EC] text-[#C8C0B6]"
                                    : selecionado
                                      ? "border-[#9A7952] bg-[#C8A97E] text-white"
                                      : "border-[#E5DDD1] bg-white text-[#27231F] hover:border-[#B99A6B]"
                                }`}
                              >
                                {horario}
                                {horarioOcupado && (
                                  <span className="block text-xs">
                                    Ocupado
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* RESERVA POR TURNO */}
                {modalidade === "turno" && (
                  <div className="grid gap-4 sm:grid-cols-3">
                    {turnos.map((turno) => {
                      const ocupado = turno.horarios.some((horario) =>
                        horariosOcupados.includes(horario)
                      );

                      const selecionado = turnoSelecionado === turno.id;

                      return (
                        <button
                          key={turno.id}
                          type="button"
                          disabled={ocupado}
                          onClick={() => {
                            setTurnoSelecionado(turno.id);
                            setHorarioSelecionado(null);
                          }}
                          className={`border p-5 text-left transition ${
                            ocupado
                              ? "cursor-not-allowed border-[#E5DDD1] bg-[#F7F3EC] text-[#C8C0B6]"
                              : selecionado
                                ? "border-[#9A7952] bg-[#C8A97E] text-white"
                                : "border-[#E5DDD1] bg-white text-[#27231F] hover:border-[#B99A6B]"
                          }`}
                        >
                          <p className="font-serif text-xl">{turno.nome}</p>
                          <p className="mt-2 text-sm">{turno.periodo}</p>
                          <p className="mt-3 text-xs">
                            {ocupado ? "Indisponível" : "Turno completo"}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* RESERVA DIÁRIA */}
                {modalidade === "diaria" && (
                  <div className="mt-6">
                    {turnos.some((turno) =>
                      turno.horarios.some((horario) =>
                        horariosOcupados.includes(horario)
                      )
                    ) ? (
                      <p className="border border-[#E5DDD1] bg-white p-4 text-sm text-[#746C62]">
                        Existem horários ocupados nesta data. A
                        disponibilidade da diária precisa ser verificada
                        antes de continuar.
                      </p>
                    ) : (
                      <div className="border border-[#E5DDD1] bg-white p-5">
                        <p className="font-serif text-xl text-[#27231F]">
                          Diária completa
                        </p>

                        <p className="mt-2 text-sm text-[#746C62]">
                          Consultório reservado para o dia selecionado.
                        </p>

                        <button
                          type="button"
                          onClick={() => setTurnoSelecionado("diaria")}
                          className={`mt-4 border px-5 py-3 text-sm transition ${
                            turnoSelecionado === "diaria"
                              ? "border-[#9A7952] bg-[#C8A97E] text-white"
                              : "border-[#E5DDD1] text-[#27231F] hover:border-[#B99A6B]"
                          }`}
                        >
                          {turnoSelecionado === "diaria"
                            ? "Diária selecionada"
                            : "Selecionar diária"}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* BOTÃO CONTINUAR */}
                {podeContinuar && (
                  <div className="mt-8 flex justify-end">
                    <Link
                      href={parametrosContinuar}
                      className="bg-[#27231F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#4A423B]"
                    >
                      Continuar
                    </Link>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
