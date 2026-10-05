"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { consultorios } from "@/lib/data/consultorios";
import { useBooking } from "@/components/agendamento/BookingContext";

import {
  reservaSchema,
  type ReservaFormData,
} from "@/lib/types/validations/reserva";

function mascararTelefone(valor: string) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);

  if (numeros.length <= 2) {
    return numeros;
  }

  if (numeros.length <= 7) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  }

  return `(${numeros.slice(0, 2)}) ${numeros.slice(
    2,
    7
  )}-${numeros.slice(7)}`;
}

function mascararCpf(valor: string) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);

  if (numeros.length <= 3) {
    return numeros;
  }

  if (numeros.length <= 6) {
    return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
  }

  if (numeros.length <= 9) {
    return `${numeros.slice(0, 3)}.${numeros.slice(
      3,
      6
    )}.${numeros.slice(6)}`;
  }

  return `${numeros.slice(0, 3)}.${numeros.slice(
    3,
    6
  )}.${numeros.slice(6, 9)}-${numeros.slice(9)}`;
}

export default function DadosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const consultorioId = searchParams.get("consultorio");
  const data = searchParams.get("data");
  const horario = searchParams.get("horario");
  const dataFormatada = data
  ? data.split("-").reverse().join(".")
  : "Não informada";

  const { setDadosCliente } = useBooking();

  const consultorio = consultorios.find(
    (item) => item.id === consultorioId
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservaFormData>({
    resolver: zodResolver(reservaSchema),
    defaultValues: {
      nome: "",
      telefone: "",
      email: "",
      cpf: "",
      observacoes: "",
    },
  });

  function continuarParaPagamento(
    dados: ReservaFormData
  ) {
    setDadosCliente({
      nome: dados.nome,
      telefone: dados.telefone,
      email: dados.email,
      cpf: dados.cpf,
      observacoes: dados.observacoes ?? "",
    });

    router.push(
      `/agendar/pagamento?consultorio=${consultorioId}&data=${data}&horario=${horario}`
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-3xl">

        {/* VOLTAR */}
        <Link
          href={`/agendar/horario?consultorio=${consultorioId}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#746C62] transition hover:text-[#27231F]"
        >
          <span>←</span>
          Voltar
        </Link>

        {/* CABEÇALHO */}
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
          Seus dados
        </p>

        <h1 className="mt-3 font-serif text-3xl text-[#27231F] sm:text-4xl">
          Dados da reserva
        </h1>

        <form
          onSubmit={handleSubmit(continuarParaPagamento)}
          className="mt-8"
        >
          <div className="border border-[#E5DDD1] bg-white p-6">

            {/* RESUMO DA RESERVA */}
            <div>
              <p className="text-sm text-[#746C62]">
                Consultório
              </p>

              <p className="mt-1 text-lg text-[#27231F]">
                {consultorio?.name ?? "Consultório"}
              </p>

              <div className="my-6 border-t border-[#E5DDD1]" />

              <p className="text-sm text-[#746C62]">
                Data
              </p>

              <p className="mt-1 text-lg text-[#27231F]">
  {dataFormatada}
</p>

              <div className="my-6 border-t border-[#E5DDD1]" />

              <p className="text-sm text-[#746C62]">
                Horário
              </p>

              <p className="mt-1 text-lg text-[#27231F]">
                {horario ?? "Não informado"}
              </p>
            </div>

            {/* DADOS DO CLIENTE */}
            <div className="mt-8 border-t border-[#E5DDD1] pt-8">

              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9A7952]">
                Informações pessoais
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#27231F]">
                Preencha seus dados
              </h2>

              {/* NOME */}
              <div className="mt-6">
                <label
                  htmlFor="nome"
                  className="text-sm font-medium text-[#27231F]"
                >
                  Nome completo
                </label>

                <Controller
                  name="nome"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="nome"
                      type="text"
                      placeholder="Digite seu nome completo"
                      className={`mt-2 w-full border bg-white px-4 py-3 text-sm text-[#27231F] outline-none transition placeholder:text-[#A9A198] focus:border-[#9A7952] ${
                        errors.nome
                          ? "border-red-400"
                          : "border-[#E5DDD1]"
                      }`}
                    />
                  )}
                />

                {errors.nome && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.nome.message}
                  </p>
                )}
              </div>

              {/* TELEFONE */}
              <div className="mt-6">
                <label
                  htmlFor="telefone"
                  className="text-sm font-medium text-[#27231F]"
                >
                  Telefone
                </label>

                <Controller
                  name="telefone"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="telefone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="(85) 99999-9999"
                      maxLength={15}
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(
                          mascararTelefone(
                            event.target.value
                          )
                        )
                      }
                      onBlur={field.onBlur}
                      ref={field.ref}
                      className={`mt-2 w-full border bg-white px-4 py-3 text-sm text-[#27231F] outline-none transition placeholder:text-[#A9A198] focus:border-[#9A7952] ${
                        errors.telefone
                          ? "border-red-400"
                          : "border-[#E5DDD1]"
                      }`}
                    />
                  )}
                />

                {errors.telefone && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.telefone.message}
                  </p>
                )}
              </div>

              {/* E-MAIL */}
              <div className="mt-6">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-[#27231F]"
                >
                  E-mail
                </label>

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="seuemail@email.com"
                      className={`mt-2 w-full border bg-white px-4 py-3 text-sm text-[#27231F] outline-none transition placeholder:text-[#A9A198] focus:border-[#9A7952] ${
                        errors.email
                          ? "border-red-400"
                          : "border-[#E5DDD1]"
                      }`}
                    />
                  )}
                />

                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* CPF */}
              <div className="mt-6">
                <label
                  htmlFor="cpf"
                  className="text-sm font-medium text-[#27231F]"
                >
                  CPF
                </label>

                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="cpf"
                      type="text"
                      inputMode="numeric"
                      placeholder="000.000.000-00"
                      maxLength={14}
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(
                          mascararCpf(
                            event.target.value
                          )
                        )
                      }
                      onBlur={field.onBlur}
                      ref={field.ref}
                      className={`mt-2 w-full border bg-white px-4 py-3 text-sm text-[#27231F] outline-none transition placeholder:text-[#A9A198] focus:border-[#9A7952] ${
                        errors.cpf
                          ? "border-red-400"
                          : "border-[#E5DDD1]"
                      }`}
                    />
                  )}
                />

                {errors.cpf && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.cpf.message}
                  </p>
                )}
              </div>

              {/* OBSERVAÇÕES */}
              <div className="mt-6">
                <label
                  htmlFor="observacoes"
                  className="text-sm font-medium text-[#27231F]"
                >
                  Observações

                  <span className="ml-2 font-normal text-[#A9A198]">
                    (opcional)
                  </span>
                </label>

                <Controller
                  name="observacoes"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id="observacoes"
                      rows={4}
                      placeholder="Alguma informação que gostaria de deixar antes da reserva?"
                      className={`mt-2 w-full resize-none border bg-white px-4 py-3 text-sm text-[#27231F] outline-none transition placeholder:text-[#A9A198] focus:border-[#9A7952] ${
                        errors.observacoes
                          ? "border-red-400"
                          : "border-[#E5DDD1]"
                      }`}
                    />
                  )}
                />

                {errors.observacoes && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.observacoes.message}
                  </p>
                )}
              </div>

              {/* BOTÃO */}
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#27231F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#4A423B]"
                >
                  Continuar para pagamento
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>
    </main>
  );
}