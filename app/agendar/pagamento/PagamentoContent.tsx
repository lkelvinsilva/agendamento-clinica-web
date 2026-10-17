
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { consultorios } from "@/lib/data/consultorios";
import { useBooking } from "@/components/agendamento/BookingContext";


export default function PagamentoPage() {
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState<
  "cartao" | "pix" | "debito"
>("pix");

  const router = useRouter();
  const searchParams = useSearchParams();

  const consultorioId = searchParams.get("consultorio");
  const data = searchParams.get("data");
  const horario = searchParams.get("horario");
  const modalidade = searchParams.get("modalidade") ?? "horario";
  const turno = searchParams.get("turno");

  const { booking } = useBooking();
  const dataFormatada = data
  ? data.split("-").reverse().join(".")
  : "Não informada";

  const consultorio = consultorios.find(
    (item) => item.id === consultorioId
  );

  const valorReserva =
  modalidade === "diaria"
    ? 900
    : modalidade === "turno"
      ? 300
      : 120;

  async function confirmarReserva() {
    if (
  !consultorioId ||
  !data ||
  !booking.nome ||
  !booking.telefone ||
  !booking.email ||
  !booking.cpf ||
  (modalidade === "horario" && (!horario || horario === "null"))
) {
  setErro("Os dados da reserva estão incompletos.");
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
      "Erro ao salvar a reserva."
  );
}

// A API retorna a reserva diretamente
const reserva = resultado;

if (!response.ok) {
  console.error("Status da API:", response.status);
  console.error("Resposta da API:", resultado);

  throw new Error(
    resultado.mensagem ||
      resultado.error ||
      "Erro ao salvar a reserva."
  );
}

router.push(
  `/agendar/confirmacao?reserva=${reserva.id}`
);
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

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* VOLTAR */}
        <Link
          href={`/agendar/dados?consultorio=${consultorioId}&data=${data}&horario=${horario}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#746C62] transition hover:text-[#27231F]"
        >
          <span>←</span>
          Voltar
        </Link>

        {/* CABEÇALHO */}
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
          Pagamento
        </p>

        <h1 className="mt-3 font-serif text-3xl text-[#27231F] sm:text-4xl">
          Finalize sua reserva
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#746C62]">
          Confira os dados da sua reserva antes de realizar o pagamento.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* PAGAMENTO */}
          <section className="border border-[#E5DDD1] bg-white p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
              Forma de pagamento
            </p>

            <h2 className="mt-2 font-serif text-2xl text-[#27231F]">
              Escolha como pagar
            </h2>

            
{/* CARTÃO */}
<button
  type="button"
  onClick={() => setFormaPagamento("cartao")}
  className={`mt-6 block w-full border p-5 text-left transition ${
    formaPagamento === "cartao"
      ? "border-[#C8A97E] bg-[#F7F3EC]"
      : "border-[#E5DDD1] bg-white hover:border-[#C8A97E]"
  }`}
>
  <div className="flex items-start gap-4">
    <div className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${
      formaPagamento === "cartao"
        ? "border-[#9A7952]"
        : "border-[#D4CCC2]"
    }`}>
      {formaPagamento === "cartao" && (
        <div className="h-2.5 w-2.5 rounded-full bg-[#9A7952]" />
      )}
    </div>

    <div>
      <p className="text-sm font-medium text-[#27231F]">
        Cartão de crédito
      </p>
      <p className="mt-1 text-sm leading-6 text-[#746C62]">
        Opção de pagamento por cartão.
      </p>
    </div>
  </div>
</button>

{/* CARTÃO DE DÉBITO */}
<button
  type="button"
  onClick={() => setFormaPagamento("debito")}
  aria-pressed={formaPagamento === "debito"}
  className={`mt-4 block w-full border p-5 text-left transition ${
    formaPagamento === "debito"
      ? "border-[#C8A97E] bg-[#F7F3EC]"
      : "border-[#E5DDD1] bg-white hover:border-[#C8A97E]"
  }`}
>
  <div className="flex items-start gap-4">
    <div
      className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${
        formaPagamento === "debito"
          ? "border-[#9A7952]"
          : "border-[#D4CCC2]"
      }`}
    >
      {formaPagamento === "debito" && (
        <div className="h-2.5 w-2.5 rounded-full bg-[#9A7952]" />
      )}
    </div>

    <div>
      <p className="text-sm font-medium text-[#27231F]">
        Cartão de débito
      </p>
      <p className="mt-1 text-sm leading-6 text-[#746C62]">
        Pagamento com cartão de débito após a integração.
      </p>
    </div>
  </div>
</button>

{/* PIX */}
<button
  type="button"
  onClick={() => setFormaPagamento("pix")}
  className={`mt-4 block w-full border p-5 text-left transition ${
    formaPagamento === "pix"
      ? "border-[#C8A97E] bg-[#F7F3EC]"
      : "border-[#E5DDD1] bg-white hover:border-[#C8A97E]"
  }`}
>
  <div className="flex items-start gap-4">
    <div className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${
      formaPagamento === "pix"
        ? "border-[#9A7952]"
        : "border-[#D4CCC2]"
    }`}>
      {formaPagamento === "pix" && (
        <div className="h-2.5 w-2.5 rounded-full bg-[#9A7952]" />
      )}
    </div>

    <div>
      <p className="text-sm font-medium text-[#27231F]">
        Pix
      </p>
      <p className="mt-1 text-sm leading-6 text-[#746C62]">
        Opção de pagamento por Pix.
      </p>
    </div>
  </div>
</button>



{/* INSTRUÇÕES DA FORMA DE PAGAMENTO */}
<div className="mt-6 border border-[#E5DDD1] bg-[#F7F3EC] p-5">
  {formaPagamento === "pix" ? (
    <>
      <h3 className="text-sm font-medium text-[#27231F]">
        Pagamento via Pix
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#746C62]">
        O QR Code e o código Pix copia e cola estarão disponíveis
        quando a integração de pagamento for ativada.
        Por enquanto, nenhuma cobrança será realizada.
      </p>
    </>
  ) : formaPagamento === "cartao" ? (
    <>
      <h3 className="text-sm font-medium text-[#27231F]">
        Cartão de crédito
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#746C62]">
        O processamento do cartão e as opções de parcelamento
        estarão disponíveis após a integração de pagamento.
        Nenhuma cobrança será realizada neste momento.
      </p>
    </>
  ) : (
    <>
      <h3 className="text-sm font-medium text-[#27231F]">
        Cartão de débito
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#746C62]">
        O pagamento por débito dependerá do provedor escolhido.
        Essa opção ainda não processa pagamentos reais.
      </p>
    </>
  )}
</div>


            {/* SEGURANÇA */}
            <div className="mt-8 border-t border-[#E5DDD1] pt-6">
              <p className="text-xs leading-5 text-[#746C62]">
                O pagamento será utilizado para confirmar o horário escolhido.
                A reserva somente será considerada confirmada após a
                identificação do pagamento.
              </p>
            </div>
          </section>

          {/* RESUMO */}
          <aside className="h-fit border border-[#E5DDD1] bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
              Resumo
            </p>

            <h2 className="mt-2 font-serif text-2xl text-[#27231F]">
              Sua reserva
            </h2>

            <div className="mt-6 space-y-5">
              {/* CONSULTÓRIO */}
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                  Consultório
                </p>

                <p className="mt-1 text-sm text-[#27231F]">
                  {consultorio?.name ?? "Consultório"}
                </p>
              </div>

              {/* DATA */}
              <div className="border-t border-[#E5DDD1] pt-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                  Data
                </p>

                <p className="mt-1 text-sm text-[#27231F]">
                  {dataFormatada}
                </p>
              </div>

              {/* HORÁRIO */}
              <div className="border-t border-[#E5DDD1] pt-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                  Horário
                </p>

                <p className="mt-1 text-sm text-[#27231F]">
                  {horario ?? "Não informado"}
                </p>
              </div>

              {/* CLIENTE */}
              <div className="border-t border-[#E5DDD1] pt-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#746C62]">
                  Cliente
                </p>

                <p className="mt-1 text-sm text-[#27231F]">
                  {booking.nome || "Dados não informados"}
                </p>

                {booking.email && (
                  <p className="mt-1 text-xs text-[#746C62]">
                    {booking.email}
                  </p>
                )}

                {booking.telefone && (
                  <p className="mt-1 text-xs text-[#746C62]">
                    {booking.telefone}
                  </p>
                )}
              </div>

              {/* TOTAL */}
              <div className="border-t border-[#E5DDD1] pt-5">
                <div className="flex items-end justify-between gap-4">
                  <span className="text-sm text-[#746C62]">
                    Total
                  </span>

                  <span className="font-serif text-2xl text-[#27231F]">
                    R${" "}
                    {valorReserva.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>

            {/* ERRO */}
            {erro && (
              <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                {erro}
              </div>
            )}

            {/* CONFIRMAR */}
            <button
              type="button"
              onClick={confirmarReserva}
              disabled={salvando}
              className="mt-6 block w-full bg-[#27231F] px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-[#4A423B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {salvando ? "Confirmando..." : "Confirmar reserva"}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}

