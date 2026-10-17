
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const total = await prisma.reserva.count();

    return NextResponse.json({
      sucesso: true,
      mensagem: "PostgreSQL funcionando.",
      totalDeReservas: total,
    });
  } catch (error) {
    console.error("Erro ao consultar reservas:", error);

    return NextResponse.json(
      {
        sucesso: false,
        mensagem: "Erro ao consultar reservas.",
      },
      { status: 500 }
    );
  }
}
