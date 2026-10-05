"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type BookingData = {
  consultorioId: string | null;
  data: string | null;
  horario: string | null;

  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  observacoes: string;
};

type BookingContextType = {
  booking: BookingData;

  setConsultorio: (consultorioId: string) => void;
  setData: (data: string) => void;
  setHorario: (horario: string) => void;

  setDadosCliente: (dados: {
    nome: string;
    telefone: string;
    email: string;
    cpf: string;
    observacoes: string;
  }) => void;

  limparReserva: () => void;
};

const bookingInicial: BookingData = {
  consultorioId: null,
  data: null,
  horario: null,

  nome: "",
  telefone: "",
  email: "",
  cpf: "",
  observacoes: "",
};

const BookingContext = createContext<BookingContextType | undefined>(
  undefined
);

export function BookingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [booking, setBooking] =
    useState<BookingData>(bookingInicial);

  function setConsultorio(consultorioId: string) {
    setBooking((atual) => ({
      ...atual,
      consultorioId,
    }));
  }

  function setData(data: string) {
    setBooking((atual) => ({
      ...atual,
      data,
    }));
  }

  function setHorario(horario: string) {
    setBooking((atual) => ({
      ...atual,
      horario,
    }));
  }

  function setDadosCliente(dados: {
    nome: string;
    telefone: string;
    email: string;
    cpf: string;
    observacoes: string;
  }) {
    setBooking((atual) => ({
      ...atual,
      ...dados,
    }));
  }

  function limparReserva() {
    setBooking(bookingInicial);
  }

  return (
    <BookingContext.Provider
      value={{
        booking,
        setConsultorio,
        setData,
        setHorario,
        setDadosCliente,
        limparReserva,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useBooking deve ser usado dentro de um BookingProvider"
    );
  }

  return context;
}