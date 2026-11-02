
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      success: true,
      message: "Conexão com PostgreSQL funcionando.",
    });
  } catch (error) {
    console.error("Erro na conexão com PostgreSQL:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Não foi possível conectar ao banco de dados.",
      },
      { status: 500 }
    );
  }
}
