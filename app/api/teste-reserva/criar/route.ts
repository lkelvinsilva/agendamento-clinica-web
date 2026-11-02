
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const reserva = await prisma.reserva.create({
      data: {
        consultorioId: "consultorio-01",
        data: new Date("2030-01-15T12:00:00.000Z"),
        horario: new Date("1970-01-01T09:00:00.000Z"),
        modalidade: "horario",
        nome: "Teste Local",
        telefone: "85999999999",
        email: "teste@exemplo.com",
        cpf: "00000000000",
        observacoes: "Reserva criada apenas para teste local",
        valor: 80,
        status: "pendente",
        formaPagamento: "pix",
      },
    });

    return NextResponse.json({
      sucesso: true,
      mensagem: "Reserva de teste salva no PostgreSQL.",
      id: reserva.id,
    });
  } catch (error) {
    console.error("Erro ao criar reserva de teste:", error);

    return NextResponse.json(
      {
        sucesso: false,
        mensagem: "Não foi possível salvar a reserva de teste.",
      },
      { status: 500 }
    );
  }
}
