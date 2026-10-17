-- CreateTable
CREATE TABLE "reservas" (
    "id" UUID NOT NULL,
    "consultorio_id" TEXT NOT NULL,
    "data" DATE NOT NULL,
    "horario" TIME(0),
    "modalidade" TEXT NOT NULL,
    "turno" TEXT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "observacoes" TEXT,
    "valor" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "forma_pagamento" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reservas_pkey" PRIMARY KEY ("id")
);
