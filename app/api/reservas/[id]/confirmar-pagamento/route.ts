
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Esta rota é exclusiva para testes locais.
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          mensagem:
            "Confirmação simulada indisponível em produção.",
        },
        { status: 403 }
      );
    }

    const { id } = await params;

    const reserva = await prisma.reserva.findUnique({
      where: { id },
    });

    if (!reserva) {
      return NextResponse.json(
        { mensagem: "Reserva não encontrada." },
        { status: 404 }
      );
    }

    if (reserva.status === "confirmada") {
      return NextResponse.json({
        mensagem: "A reserva já está confirmada.",
        reserva,
        whatsappEnviado: false,
      });
    }

    if (reserva.status !== "pendente") {
      return NextResponse.json(
        {
          mensagem:
            "Somente reservas pendentes podem ser confirmadas.",
        },
        { status: 409 }
      );
    }

    const agora = new Date();

if (reserva.expiresAt && reserva.expiresAt <= agora) {
  await prisma.reserva.updateMany({
    where: {
      id,
      status: "pendente",
      expiresAt: { lte: agora },
    },
    data: {
      status: "cancelada",
    },
  });

  return NextResponse.json(
    {
      mensagem: "O prazo de 15 minutos expirou. A reserva foi cancelada.",
    },
    { status: 410 }
  );
}

    const resultado = await prisma.reserva.updateMany({
  where: {
    id,
    status: "pendente",
  },
  data: {
    status: "confirmada",
  },
});

if (resultado.count === 0) {
  const reservaAtual = await prisma.reserva.findUnique({
    where: { id },
  });

  if (!reservaAtual) {
    return NextResponse.json(
      { mensagem: "Reserva não encontrada." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    mensagem:
      reservaAtual.status === "confirmada"
        ? "A reserva já está confirmada."
        : "Somente reservas pendentes podem ser confirmadas.",
    reserva: reservaAtual,
    whatsappEnviado: false,
  }, {
    status: reservaAtual.status === "confirmada" ? 200 : 409,
  });
}

const atualizada = await prisma.reserva.findUniqueOrThrow({
  where: { id },
});

    let whatsappEnviado = false;

    const webhookUrl = process.env.N8N_RESERVA_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        const resposta = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: atualizada.nome,
            telefone: atualizada.telefone,
            consultorio: atualizada.consultorioId,
            data: atualizada.data.toISOString().slice(0, 10).split("-").reverse().join("-"),
            horario: atualizada.horario
              ? atualizada.horario.toISOString().slice(11, 16)
              : atualizada.turno ?? atualizada.modalidade,
            modalidade: atualizada.modalidade,
            valor: Number(atualizada.valor),
            status: "confirmada - pagamento simulado",
          }),
          signal: AbortSignal.timeout(10000),
        });

        whatsappEnviado = resposta.ok;

        if (!resposta.ok) {
          console.error(
            "Falha ao notificar o n8n:",
            resposta.status
          );
        }
      } catch (erro) {
        console.error(
          "Erro ao enviar notificação WhatsApp:",
          erro
        );
      }
    } else {
      console.warn(
        "N8N_RESERVA_WEBHOOK_URL não está configurada."
      );
    }

    return NextResponse.json({
      mensagem: "Pagamento simulado confirmado.",
      reserva: atualizada,
      whatsappEnviado,
    });
  } catch (error) {
    console.error("Erro na confirmação simulada:", error);

    return NextResponse.json(
      { mensagem: "Não foi possível confirmar a reserva." },
      { status: 500 }
    );
  }
}
