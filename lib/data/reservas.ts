import { supabase } from "@/lib/supabase";

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


export async function criarReserva(dados: CriarReservaData) {
  const horarioValido =
  dados.horario && dados.horario !== "null"
    ? dados.horario
    : null;

if (dados.modalidade === "horario" && !horarioValido) {
  throw new Error("Selecione um horário válido para a reserva.");
}

if (
  dados.modalidade === "turno" &&
  !dados.turno
) {
  throw new Error("Selecione um turno para a reserva.");
}

  const { data, error } = await supabase
    .from("reservas")
    .insert({
      consultorio_id: dados.consultorioId,
      data: dados.data,
      horario: horarioValido,
      modalidade: dados.modalidade,
      turno: dados.turno ?? null,
      nome: dados.nome,
      telefone: dados.telefone,
      email: dados.email,
      cpf: dados.cpf,
      observacoes: dados.observacoes,
      valor: dados.valor,
      forma_pagamento: dados.formaPagamento,
      status: "pendente",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function buscarHorariosOcupados(
  consultorioId: string,
  data: string
) {
  const { data: reservas, error } = await supabase
    .from("reservas")
    .select("horario, modalidade, turno")
    .eq("consultorio_id", consultorioId)
    .eq("data", data)
    .neq("status", "cancelada");

  if (error) {
    throw new Error(error.message);
  }

  const horariosManha = ["08:00", "09:00", "10:00", "11:00"];
  const horariosTarde = ["13:00", "14:00", "15:00", "16:00"];
  const horariosNoite = ["18:00", "19:00", "20:00", "21:00"];

  const horariosOcupados = new Set<string>();

  for (const reserva of reservas) {
    if (reserva.modalidade === "diaria") {
      [
        ...horariosManha,
        ...horariosTarde,
        ...horariosNoite,
      ].forEach((horario) => horariosOcupados.add(horario));

      continue;
    }

    if (reserva.modalidade === "turno") {
      const horariosDoTurno =
        reserva.turno === "manha"
          ? horariosManha
          : reserva.turno === "tarde"
            ? horariosTarde
            : reserva.turno === "noite"
              ? horariosNoite
              : [];

      horariosDoTurno.forEach((horario) =>
        horariosOcupados.add(horario)
      );

      continue;
    }

    if (reserva.horario) {
      horariosOcupados.add(reserva.horario.slice(0, 5));
    }
  }

  return Array.from(horariosOcupados);
}


export async function buscarReservaPorId(id: string) {
  const { data, error } = await supabase
    .from("reservas")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function cancelarReserva(id: string) {
  const { data, error } = await supabase.rpc(
    "cancelar_reserva_expirada",
    {
      p_reserva_id: id,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}