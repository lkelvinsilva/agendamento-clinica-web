import { supabase } from "@/lib/supabase";

export type CriarReservaData = {
  consultorioId: string;
  data: string;
  horario: string;

  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  observacoes: string;

  valor: number;
  formaPagamento: string;
};

export async function criarReserva(
  dados: CriarReservaData
) {
  const { data, error } = await supabase
    .from("reservas")
    .insert({
      consultorio_id: dados.consultorioId,
      data: dados.data,
      horario: dados.horario,

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
    .select("horario")
    .eq("consultorio_id", consultorioId)
    .eq("data", data)
    .neq("status", "cancelada");

  if (error) {
  if (error.code === "23505") {
    throw new Error(
      "Esse horário acabou de ser reservado por outra pessoa."
    );
  }

  throw new Error(error.message);
}

  return reservas.map((reserva) =>
    reserva.horario.slice(0, 5)
  );
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