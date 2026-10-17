
import { NextResponse } from "next/server";
import { buscarReservaPorId } from "@/lib/data/reservas-prisma";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reserva = await buscarReservaPorId(id);

    return NextResponse.json(reserva);
  } catch (error) {
    console.error("Erro ao buscar reserva:", error);

    return NextResponse.json(
      { mensagem: "Reserva não encontrada." },
      { status: 404 }
    );
  }
}
