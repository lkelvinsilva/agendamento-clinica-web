
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { consultorios } from "@/lib/data/consultorios";
import { useBooking } from "@/components/agendamento/BookingContext";

type Reserva = {
  id: string;
  consultorioId: string;
  data: string;
  horario: string | null;
  modalidade: string;
  turno: string | null;
  nome: string;
  telefone: string;
  email: string;
  valor: number | string;
  status: string;
  formaPagamento: string | null;
  expiresAt: string | null;
};

export default function PagamentoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { booking } = useBooking();

  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [carregandoReserva, setCarregandoReserva] = useState(false);
  const [segundosRestantes, setSegundosRestantes] = useState(0);

  const [formaPagamento, setFormaPagamento] = useState<
  "pix" | "cartao" | "debito"
>("pix");

  const reservaId = searchParams.get("reservaId");

  const consultorioId = searchParams.get("consultorio");
  const data = searchParams.get("data");
  const horario = searchParams.get("horario");
  const modalidade = searchParams.get("modalidade") ?? "horario";
  const turno = searchParams.get("turno");

  const consultorio = consultorios.find(
    (item) => item.id === (reserva?.consultorioId ?? consultorioId)
  );

  const valorReserva = reserva
    ? Number(reserva.valor)
    : modalidade === "diaria"
      ? 900
      : modalidade === "turno"
        ? 300
        : 80;

  const formatarMoeda = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const dataReserva = reserva?.data ?? data ?? "";

  const dataFormatada = dataReserva
    ? dataReserva.includes("T")
      ? new Date(dataReserva).toLocaleDateString("pt-BR")
      : dataReserva.split("-").reverse().join(".")
    : "Não informada";

  const horarioReserva = reserva?.horario ?? horario;

  const horarioFormatado = horarioReserva
    ? horarioReserva.includes("T")
      ? horarioReserva.slice(11, 16)
      : horarioReserva
    : "Não informado";

  const carregarReserva = useCallback(async () => {
    if (!reservaId) return;

    try {
      setCarregandoReserva(true);
      setErro("");

      const response = await fetch(`/api/reservas/${reservaId}`, {
        cache: "no-store",
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(
          resultado.mensagem || "Não foi possível localizar a reserva."
        );
      }

      setReserva(resultado);

      if (resultado.status === "confirmada") {
        router.replace(`/agendar/confirmacao?reserva=${resultado.id}`);
        return;
      }

      if (resultado.status === "cancelada") {
        setErro("O prazo para pagamento terminou. Esta reserva foi cancelada.");
      }
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar a reserva."
      );
    } finally {
      setCarregandoReserva(false);
    }
  }, [reservaId, router]);

  useEffect(() => {
  if (!reservaId) return;

  const executar = async () => {
    await carregarReserva();
  };

  void executar();
}, [reservaId, carregarReserva]);

  // Atualiza o contador com base no vencimento salvo no banco.
  useEffect(() => {
    if (
  !reserva?.expiresAt ||
  reserva.status !== "pendente"
) {
  return;
}

    const atualizarContador = () => {
      const vencimento = new Date(reserva.expiresAt!).getTime();
      const restante = Math.max(
        0,
        Math.ceil((vencimento - Date.now()) / 1000)
      );

      setSegundosRestantes(restante);
    };

    atualizarContador();

    const intervalo = setInterval(atualizarContador, 1000);

    return () => clearInterval(intervalo);
  }, [reserva]);

  // Quando o prazo termina, solicita o cancelamento no servidor.
  useEffect(() => {
  if (
    !reserva ||
    reserva.status !== "pendente" ||
    segundosRestantes !== 0 ||
    !reserva.expiresAt ||
    new Date(reserva.expiresAt).getTime() > Date.now()
  ) {
    return;
  }

    let ativo = true;

    async function cancelarReservaExpirada() {
      try {
        const response = await fetch(`/api/reservas/${reserva!.id}/cancelar`, {
          method: "POST",
        });

        const resultado = await response.json();

        if (!ativo) return;

        if (response.ok) {
          setReserva(resultado.reserva);
          setErro("O prazo para pagamento terminou. Sua reserva foi cancelada.");
        } else {
          await carregarReserva();
        }
      } catch {
        if (ativo) {
          setErro("Não foi possível verificar o vencimento da reserva.");
        }
      }
    }

    cancelarReservaExpirada();

    return () => {
      ativo = false;
    };
  }, [reserva, segundosRestantes, carregarReserva]);

  // Consulta periodicamente se o pagamento já foi confirmado.
  useEffect(() => {
    if (!reserva || reserva.status !== "pendente") return;

    const intervalo = setInterval(() => {
      carregarReserva();
    }, 5000);

    return () => clearInterval(intervalo);
  }, [reserva, carregarReserva]);
  async function copiarChavePix() {
  const chavePix = process.env.NEXT_PUBLIC_PIX_CHAVE;

  if (!chavePix) {
    setErro("A chave Pix não está configurada.");
    return;
  }

  try {
    await navigator.clipboard.writeText(chavePix);
    setErro("");
    alert("Chave Pix copiada com sucesso!");
  } catch {
    setErro("Não foi possível copiar a chave Pix. Tente copiá-la manualmente.");
  }
}
  function formatarTempo(segundos: number) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    return `${String(minutos).padStart(2, "0")}:${String(
      segundosRestantes
    ).padStart(2, "0")}`;
  }

  async function confirmarReserva() {
    if (formaPagamento !== "pix") {
  setErro(
    "O pagamento por cartão ainda não está disponível. Selecione Pix para continuar."
  );
  return;
}
    if (!consultorioId || !data) {
      setErro("Os dados da reserva estão incompletos.");
      return;
    }

    if (
      !booking.nome ||
      !booking.telefone ||
      !booking.email ||
      !booking.cpf
    ) {
      setErro("Os dados do cliente estão incompletos. Volte e confira o cadastro.");
      return;
    }

    if (modalidade === "horario" && (!horario || horario === "null")) {
      setErro("Selecione um horário para continuar.");
      return;
    }

    if (modalidade === "turno" && !turno) {
      setErro("Selecione um turno para continuar.");
      return;
    }

    try {
      setErro("");
      setSalvando(true);

      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          consultorioId,
          data,
          horario,
          modalidade,
          turno,
          nome: booking.nome,
          telefone: booking.telefone,
          email: booking.email,
          cpf: booking.cpf,
          observacoes: booking.observacoes,
          valor: valorReserva,
          formaPagamento,
        }),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(
          resultado.mensagem ||
            resultado.error ||
            "Erro ao criar a reserva."
        );
      }

      // A reserva é criada uma única vez.
      // O ID permite abrir o pagamento sem criar outra reserva.
      router.push(`/agendar/pagamento?reservaId=${resultado.id}`);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível criar a reserva."
      );
    } finally {
      setSalvando(false);
    }
  }

  if (reservaId && carregandoReserva && !reserva) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] px-6 py-12">
        <div className="mx-auto max-w-3xl text-center text-[#746C62]">
          Carregando sua reserva...
        </div>
      </main>
    );
  }

  const reservaCancelada = reserva?.status === "cancelada";
  const pagamentoPendente = reserva?.status === "pendente";

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {!reserva && (
          <Link
            href={`/agendar/dados?consultorio=${consultorioId}&data=${data}&horario=${horario}&modalidade=${modalidade}&turno=${turno ?? ""}`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#746C62] transition hover:text-[#27231F]"
          >
            <span>←</span>
            Voltar
          </Link>
        )}

        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
          Pagamento
        </p>

        <h1 className="mt-3 font-serif text-3xl text-[#27231F] sm:text-4xl">
          {reserva ? "Realize seu pagamento" : "Finalize sua reserva"}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#746C62]">
          {reserva
            ? "Confira os dados e realize o pagamento para confirmar sua reserva."
            : "Confira os dados da sua reserva antes de continuar."}
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="border border-[#E5DDD1] bg-white p-6 sm:p-8">
            {reservaCancelada ? (
              <>
                <h2 className="font-serif text-2xl text-[#27231F]">
                  Reserva cancelada
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#746C62]">
                  O prazo de pagamento terminou e a reserva foi cancelada.
                  Para escolher um novo horário, faça um novo agendamento.
                </p>
                <Link
                  href="/agendar"
                  className="mt-6 inline-block bg-[#27231F] px-6 py-3 text-sm text-white"
                >
                  Fazer novo agendamento
                </Link>
              </>
            ) : reserva ? (
              <>
                <h2 className="font-serif text-2xl text-[#27231F]">
                  Pagamento via Pix
                </h2>

                {pagamentoPendente && (
                  <div className="mt-6 border border-[#E5DDD1] bg-[#F7F3EC] p-5">
                    <p className="text-sm text-[#746C62]">
                      Tempo restante para pagamento
                    </p>
                    <p className="mt-2 font-serif text-4xl text-[#27231F] tabular-nums">
                      {formatarTempo(segundosRestantes)}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[#746C62]">
                      Após esse prazo, a reserva será cancelada
                      automaticamente.
                    </p>
                  </div>
                )}

                
<div className="mt-6 space-y-6">
  <div>
    <p className="text-sm leading-6 text-[#746C62]">
      Para confirmar seu agendamento, realize a transferência Pix
      utilizando os dados abaixo.
    </p>
  </div>

  {/* Valor da reserva */}
  <div className="rounded-2xl border border-[#D8C5A9] bg-[#F7F3EC] p-6">
    <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#746C62]">
      Valor total a pagar
    </p>

    <p className="mt-2 font-serif text-4xl font-medium text-[#27231F]">
      {formatarMoeda(Number(reserva.valor))}
    </p>

    <p className="mt-2 text-xs text-[#746C62]">
      Transfira exatamente esse valor para evitar divergências na confirmação.
    </p>
  </div>

  {/* Dados do Pix */}
  <div className="rounded-2xl border border-[#E5DDD1] bg-white p-5">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDE4D7] text-[#8B6945]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-5 w-5"
        >
          <path d="M7 7.5 10.5 4a2.1 2.1 0 0 1 3 0L17 7.5M7 16.5 10.5 20a2.1 2.1 0 0 0 3 0l3.5-3.5M4 10.5 7.5 7 11 10.5a2.1 2.1 0 0 0 3 0L17.5 7 21 10.5a2.1 2.1 0 0 1 0 3L17.5 17 14 13.5a2.1 2.1 0 0 0-3 0L7.5 17 4 13.5a2.1 2.1 0 0 1 0-3Z" />
        </svg>
      </div>

      <div>
        <p className="text-sm font-semibold text-[#27231F]">
          Dados para transferência
        </p>
        <p className="text-xs text-[#746C62]">
          Utilize esta chave para realizar o Pix
        </p>
      </div>
    </div>

    <div className="mt-6">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#746C62]">
        Chave Pix
      </p>

      <div className="mt-2 rounded-lg bg-[#F7F3EC] p-4">
        <p className="break-all text-sm font-medium text-[#27231F]">
          {process.env.NEXT_PUBLIC_PIX_CHAVE ||
            "Configure sua chave Pix no .env.local"}
        </p>
        <button
  type="button"
  onClick={copiarChavePix}
  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#9A7952] bg-white px-4 py-3 text-sm font-medium text-[#8B6945] transition hover:bg-[#F7F3EC]"
>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
  </svg>
  Copiar chave Pix
</button>
      </div>
    </div>

    <div className="mt-5 border-t border-[#E5DDD1] pt-5">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#746C62]">
        Titular da chave
      </p>

      <p className="mt-2 text-sm font-medium text-[#27231F]">
        {process.env.NEXT_PUBLIC_PIX_TITULAR ||
          "Configure o titular no .env.local"}
      </p>
    </div>
  </div>

  {/* Orientação sobre a confirmação */}
  <div className="flex items-start gap-3 rounded-xl border border-[#E5DDD1] bg-[#FAF8F4] p-4">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="mt-0.5 h-5 w-5 shrink-0 text-[#9A7952]"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>

    <p className="text-xs leading-5 text-[#746C62]">
      Após realizar o pagamento, aguarde a identificação e a verificação
      da transferência. A reserva não é confirmada automaticamente por
      esta tela.
    </p>
  </div>
  </div>
              </>
            ) : (
              <>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
                  Forma de pagamento
                </p>

                <h2 className="mt-2 font-serif text-2xl text-[#27231F]">
                  Escolha como pagar
                </h2>

                <div className="mt-6 border border-[#C8A97E] bg-[#F7F3EC] p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#9A7952]">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#9A7952]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#27231F]">
                        Pix
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#746C62]">
                        Pagamento antecipado via Pix.
                      </p>
                    </div>
                  </div>
                </div>

                
                  <p className="mt-1 break-all text-sm text-[#746C62]">
                    {process.env.NEXT_PUBLIC_PIX_CHAVE ||
                      "Configure sua chave Pix no .env.local"}
                  </p>
                  <p className="mt-3 text-sm text-[#746C62]">
                    Titular:{" "}
                    {process.env.NEXT_PUBLIC_PIX_TITULAR ||
                      "Configure o titular no .env.local"}
                  </p>               
                
<div className="mt-8 space-y-3">
  <p className="mb-4 text-sm font-medium text-[#27231F]">
    Selecione uma forma de pagamento
  </p>

  {/* PIX */}
  <button
    type="button"
    onClick={() => setFormaPagamento("pix")}
    className={`flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-all duration-200 ${
      formaPagamento === "pix"
        ? "border-[#9A7952] bg-[#F7F3EC] shadow-sm"
        : "border-[#E5DDD1] bg-white hover:border-[#C8A97E]"
    }`}
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#EDE4D7] text-[#8B6945]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-6 w-6"
      >
        <path d="M7 7.5 10.5 4a2.1 2.1 0 0 1 3 0L17 7.5M7 16.5 10.5 20a2.1 2.1 0 0 0 3 0l3.5-3.5M4 10.5 7.5 7 11 10.5a2.1 2.1 0 0 0 3 0L17.5 7 21 10.5a2.1 2.1 0 0 1 0 3L17.5 17 14 13.5a2.1 2.1 0 0 0-3 0L7.5 17 4 13.5a2.1 2.1 0 0 1 0-3Z" />
      </svg>
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold text-[#27231F]">Pix</p>
      <p className="mt-1 text-xs text-[#746C62]">
        Pagamento instantâneo • Prazo de 15 minutos
      </p>
    </div>

    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
      formaPagamento === "pix"
        ? "border-[#9A7952] bg-[#9A7952]"
        : "border-[#CFC5B8]"
    }`}>
      {formaPagamento === "pix" && (
        <div className="h-2 w-2 rounded-full bg-white" />
      )}
    </div>
  </button>

  {/* CRÉDITO */}
  <button
    type="button"
    onClick={() => setFormaPagamento("cartao")}
    className={`flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-all duration-200 ${
      formaPagamento === "cartao"
        ? "border-[#9A7952] bg-[#F7F3EC] shadow-sm"
        : "border-[#E5DDD1] bg-white hover:border-[#C8A97E]"
    }`}
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F3F0EB] text-[#746C62]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-6 w-6"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </svg>
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold text-[#27231F]">
        Cartão de crédito
      </p>
      <p className="mt-1 text-xs text-[#746C62]">
        Pagamento com cartão de crédito
      </p>
    </div>

    <span className="shrink-0 rounded-full bg-[#F1EEE9] px-2.5 py-1 text-[10px] font-medium text-[#746C62]">
      Em breve
    </span>
  </button>

  {/* DÉBITO */}
  <button
    type="button"
    onClick={() => setFormaPagamento("debito")}
    className={`flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-all duration-200 ${
      formaPagamento === "debito"
        ? "border-[#9A7952] bg-[#F7F3EC] shadow-sm"
        : "border-[#E5DDD1] bg-white hover:border-[#C8A97E]"
    }`}
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F3F0EB] text-[#746C62]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-6 w-6"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </svg>
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold text-[#27231F]">
        Cartão de débito
      </p>
      <p className="mt-1 text-xs text-[#746C62]">
        Pagamento com cartão de débito
      </p>
    </div>

    <span className="shrink-0 rounded-full bg-[#F1EEE9] px-2.5 py-1 text-[10px] font-medium text-[#746C62]">
      Em breve
    </span>
      </button>
        </div>
              </>
                        )}
          </section>

          <aside className="h-fit border border-[#E5DDD1] bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
              Resumo
            </p>

            <h2 className="mt-2 font-serif text-2xl text-[#27231F]">
              Sua reserva
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                  Consultório
                </p>
                <p className="mt-1 text-sm text-[#27231F]">
                  {consultorio?.name ?? "Consultório"}
                </p>
              </div>

              <div className="border-t border-[#E5DDD1] pt-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                  Data
                </p>
                <p className="mt-1 text-sm text-[#27231F]">
                  {reserva ? dataFormatada : dataFormatada}
                </p>
              </div>

              <div className="border-t border-[#E5DDD1] pt-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                  Horário
                </p>
                <p className="mt-1 text-sm text-[#27231F]">
                  {reserva ? horarioFormatado : horario ?? "Não informado"}
                </p>
                {reserva?.turno && (
                  <p className="mt-1 text-sm text-[#746C62]">
                    Turno: {reserva.turno}
                  </p>
                )}
                {reserva?.modalidade && (
                  <p className="mt-1 text-sm text-[#746C62]">
                    Modalidade: {reserva.modalidade}
                  </p>
                )}
              </div>

              <div className="border-t border-[#E5DDD1] pt-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                  Cliente
                </p>
                <p className="mt-1 text-sm text-[#27231F]">
                  {reserva?.nome ?? booking.nome ?? "Dados não informados"}
                </p>
                {(reserva?.email || booking.email) && (
                  <p className="mt-1 text-xs text-[#746C62]">
                    {reserva?.email ?? booking.email}
                  </p>
                )}
                {(reserva?.telefone || booking.telefone) && (
                  <p className="mt-1 text-xs text-[#746C62]">
                    {reserva?.telefone ?? booking.telefone}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-[#E5DDD1] pt-5">
              <div className="flex justify-between gap-4 text-sm text-[#746C62]">
                <span>Valor da reserva</span>
                <span>{formatarMoeda(valorReserva)}</span>
              </div>

              <div className="flex items-end justify-between gap-4 border-t border-[#E5DDD1] pt-4">
                <span className="text-sm text-[#746C62]">Total a pagar</span>
                <span className="font-serif text-2xl text-[#27231F]">
                  {formatarMoeda(valorReserva)}
                </span>
              </div>
            </div>

            {erro && (
              <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                {erro}
              </div>
            )}

            {!reserva && (
              <button
                type="button"
                onClick={confirmarReserva}
                disabled={salvando}
                className="mt-6 block w-full bg-[#27231F] px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-[#4A423B] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {salvando ? "Criando reserva..." : "Confirmar reserva"}
              </button>
            )}

            {reserva && pagamentoPendente && (
              <p className="mt-6 text-center text-xs leading-5 text-[#746C62]">
                Reserva aguardando confirmação do pagamento.
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}


