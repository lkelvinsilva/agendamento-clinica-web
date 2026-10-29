
import { prisma } from "@/lib/prisma";

export type CriarReservaData = {
  consultorioId: string;
  data: string;
  horario: string | null;
  modalidade: string;
  turno?: string | null;
  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  observacoes: string;
  valor: number;
  formaPagamento: string;
};

const horariosManha = ["08:00", "09:00", "10:00", "11:00"];
const horariosTarde = ["13:00", "14:00", "15:00", "16:00"];
const horariosNoite = ["18:00", "19:00", "20:00", "21:00"];

const todosHorarios = [
  ...horariosManha,
  ...horariosTarde,
  ...horariosNoite,
];

function validarData(data: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    throw new Error("Data da reserva inválida.");
  }

  const dataConvertida = new Date(`${data}T12:00:00`);

  if (
    Number.isNaN(dataConvertida.getTime()) ||
    dataConvertida.toISOString().slice(0, 10) !== data
  ) {
    throw new Error("Data da reserva inválida.");
  }

  return dataConvertida;
}

function calcularValor(modalidade: string) {
  if (modalidade === "horario") return 80;
  if (modalidade === "turno") return 300;
  if (modalidade === "diaria") return 900;

  throw new Error("Modalidade de reserva inválida.");
}

function obterHorariosDoTurno(turno: string | null | undefined) {
  if (turno === "manha") return horariosManha;
  if (turno === "tarde") return horariosTarde;
  if (turno === "noite") return horariosNoite;

  return [];
}

/**
 * Cancela reservas pendentes cujo prazo de pagamento expirou.
 * Executada durante as operações de reserva e consulta de disponibilidade.
 */
async function cancelarReservasExpiradas(
  db: typeof prisma | Parameters<Parameters<typeof prisma.$transaction>[0]>[0] = prisma
) {
  await db.reserva.updateMany({
    where: {
      status: "pendente",
      expiresAt: {
        lte: new Date(),
      },
    },
    data: {
      status: "cancelada",
    },
  });
}

export async function criarReserva(dados: CriarReservaData) {
  const dataReserva = validarData(dados.data);
  if (!["pix", "cartao", "debito"].includes(dados.formaPagamento)) {
  throw new Error("Selecione uma forma de pagamento válida.");
}

if (dados.formaPagamento !== "pix") {
  throw new Error(
    "O pagamento por cartão ainda não está disponível. Selecione Pix."
  );
}
  const horario =
    dados.horario && dados.horario !== "null"
      ? dados.horario.slice(0, 5)
      : null;

  if (dados.modalidade === "horario") {
    if (!horario) {
      throw new Error("Selecione um horário válido para a reserva.");
    }

    if (!todosHorarios.includes(horario)) {
      throw new Error("O horário selecionado é inválido.");
    }
  }

  if (
    dados.modalidade === "turno" &&
    !["manha", "tarde", "noite"].includes(dados.turno ?? "")
  ) {
    throw new Error("Selecione um turno válido para a reserva.");
  }

  if (
    !dados.consultorioId?.trim() ||
    !dados.nome.trim() ||
    !dados.telefone.trim() ||
    !dados.email.trim() ||
    !dados.cpf.trim()
  ) {
    throw new Error("Os dados obrigatórios da reserva estão incompletos.");
  }

  const horariosSolicitados =
    dados.modalidade === "diaria"
      ? todosHorarios
      : dados.modalidade === "turno"
        ? obterHorariosDoTurno(dados.turno)
        : horario
          ? [horario]
          : [];

  const inicioDia = new Date(`${dados.data}T00:00:00.000Z`);
  const fimDia = new Date(`${dados.data}T00:00:00.000Z`);
  fimDia.setUTCDate(fimDia.getUTCDate() + 1);

  return prisma.$transaction(async (tx) => {
    // Libera reservas vencidas antes de verificar os horários.
    await cancelarReservasExpiradas(tx);

    const existentes = await tx.reserva.findMany({
      where: {
        consultorioId: dados.consultorioId,
        data: {
          gte: inicioDia,
          lt: fimDia,
        },
        status: {
          not: "cancelada",
        },
      },
      select: {
        horario: true,
        modalidade: true,
        turno: true,
      },
    });

    const ocupados = new Set<string>();

    for (const reserva of existentes) {
      if (reserva.modalidade === "diaria") {
        todosHorarios.forEach((h) => ocupados.add(h));
      } else if (reserva.modalidade === "turno") {
        obterHorariosDoTurno(reserva.turno).forEach((h) =>
          ocupados.add(h)
        );
      } else if (reserva.horario) {
        ocupados.add(reserva.horario.toISOString().slice(11, 16));
      }
    }

    if (horariosSolicitados.some((h) => ocupados.has(h))) {
      throw new Error(
        "Esse período já está ocupado. Escolha outro horário ou turno."
      );
    }

    return tx.reserva.create({
      data: {
        consultorioId: dados.consultorioId,
        data: dataReserva,
        horario: horario
          ? new Date(`1970-01-01T${horario}:00.000Z`)
          : null,
        modalidade: dados.modalidade,
        turno: dados.modalidade === "turno" ? dados.turno! : null,
        nome: dados.nome.trim(),
        telefone: dados.telefone.trim(),
        email: dados.email.trim(),
        cpf: dados.cpf.trim(),
        observacoes: dados.observacoes?.trim() || null,
        valor: calcularValor(dados.modalidade),
        formaPagamento: dados.formaPagamento,
        status: "pendente",
expiresAt:
  dados.formaPagamento === "pix"
    ? new Date(Date.now() + 15 * 60 * 1000)
    : null,
      },
    });
  });
}

export async function buscarHorariosOcupados(
  consultorioId: string,
  data: string
) {
  await cancelarReservasExpiradas();

  const inicioDia = new Date(`${data}T00:00:00.000Z`);
  const fimDia = new Date(`${data}T00:00:00.000Z`);
  fimDia.setUTCDate(fimDia.getUTCDate() + 1);

  const reservas = await prisma.reserva.findMany({
    where: {
      consultorioId,
      data: {
        gte: inicioDia,
        lt: fimDia,
      },
      status: {
        not: "cancelada",
      },
    },
    select: {
      horario: true,
      modalidade: true,
      turno: true,
    },
  });

  const ocupados = new Set<string>();

  for (const reserva of reservas) {
    if (reserva.modalidade === "diaria") {
      todosHorarios.forEach((h) => ocupados.add(h));
    } else if (reserva.modalidade === "turno") {
      obterHorariosDoTurno(reserva.turno).forEach((h) =>
        ocupados.add(h)
      );
    } else if (reserva.horario) {
      ocupados.add(reserva.horario.toISOString().slice(11, 16));
    }
  }

  return [...ocupados];
}

export async function buscarReservaPorId(id: string) {
  await cancelarReservasExpiradas();

  const reserva = await prisma.reserva.findUnique({
    where: { id },
  });

  if (!reserva) {
    throw new Error("Reserva não encontrada.");
  }

  return reserva;
}

export async function cancelarReserva(id: string) {
  const reserva = await prisma.reserva.findUnique({
    where: { id },
  });

  if (!reserva) {
    throw new Error("Reserva não encontrada.");
  }

  if (reserva.status === "cancelada") {
    return reserva;
  }

  if (reserva.status !== "pendente") {
    throw new Error("Esta reserva não pode ser cancelada.");
  }

  const resultado = await prisma.reserva.updateMany({
    where: {
      id,
      status: "pendente",
    },
    data: {
      status: "cancelada",
    },
  });

  if (resultado.count === 0) {
    throw new Error("Não foi possível cancelar a reserva.");
  }

  return prisma.reserva.findUniqueOrThrow({
    where: { id },
  });
}
