
import { NextRequest, NextResponse } from "next/server";
import { buscarHorariosOcupados } from "@/lib/data/reservas-prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const consultorioId = searchParams.get("consultorioId");
  const data = searchParams.get("data");

  if (!consultorioId || !data) {
    return NextResponse.json(
      { error: "Informe o consultório e a data." },
      { status: 400 }
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    return NextResponse.json(
      { error: "Data inválida." },
      { status: 400 }
    );
  }

  try {
    const horarios = await buscarHorariosOcupados(
      consultorioId,
      data
    );

    return NextResponse.json({ horarios });
  } catch (error) {
    console.error("Erro ao consultar horários:", error);

    return NextResponse.json(
      { error: "Não foi possível consultar os horários." },
      { status: 500 }
    );
  }
}
