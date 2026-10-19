
import { NextResponse } from "next/server";
import { criarReserva } from "@/lib/data/reservas-prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const dados = await request.json();

console.log("Dados recebidos para criar reserva:", {
  consultorioId: dados.consultorioId,
  data: dados.data,
  horario: dados.horario,
  modalidade: dados.modalidade,
  turno: dados.turno,
  nome: dados.nome ? "preenchido" : "VAZIO",
  telefone: dados.telefone ? "preenchido" : "VAZIO",
  email: dados.email ? "preenchido" : "VAZIO",
  cpf: dados.cpf ? "preenchido" : "VAZIO",
  formaPagamento: dados.formaPagamento,
});

const reserva = await criarReserva(dados);

    return NextResponse.json(reserva, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar reserva:", error);

    const mensagem =
      error instanceof Error
        ? error.message
        : "Não foi possível criar a reserva.";

    return NextResponse.json(
      { mensagem },
      { status: 400 }
    );
  }
}
