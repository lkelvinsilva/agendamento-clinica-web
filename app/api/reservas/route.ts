
import { NextResponse } from "next/server";
import {
  criarReserva,
  type CriarReservaData,
} from "@/lib/data/reservas-prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const dados: unknown = await request.json();

    if (
      !dados ||
      typeof dados !== "object" ||
      Array.isArray(dados)
    ) {
      return NextResponse.json(
        { mensagem: "Os dados da reserva são inválidos." },
        { status: 400 }
      );
    }

    const campos = dados as Record<string, unknown>;

    const camposObrigatorios = [
      "consultorioId",
      "data",
      "horario",
      "modalidade",
      "nome",
      "telefone",
      "email",
      "cpf",
      "valor",
      "formaPagamento",
    ];

    const faltando = camposObrigatorios.some(
      (campo) =>
        campos[campo] === undefined ||
        campos[campo] === null ||
        campos[campo] === ""
    );

    if (faltando) {
      return NextResponse.json(
        { mensagem: "Os dados obrigatórios da reserva estão incompletos." },
        { status: 400 }
      );
    }

    const reserva = await criarReserva(
      campos as unknown as CriarReservaData
    );

    return NextResponse.json(reserva, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar reserva:", error);

    const mensagem =
      error instanceof Error
        ? error.message
        : "Não foi possível criar a reserva.";

    return NextResponse.json({ mensagem }, { status: 400 });
  }
}
