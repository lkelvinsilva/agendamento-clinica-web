
import { NextResponse } from "next/server";
import { cancelarReserva } from "@/lib/data/reservas-prisma";

export const runtime = "nodejs";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reserva = await cancelarReserva(id);

    return NextResponse.json({
      sucesso: true,
      reserva,
    });
  } catch (error) {
    console.error("Erro ao cancelar reserva:", error);

    return NextResponse.json(
      { mensagem: "Não foi possível cancelar a reserva." },
      { status: 400 }
    );
  }
}
