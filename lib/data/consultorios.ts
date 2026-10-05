import { Consultorio } from "@/lib/types/consultorio";

export const consultorios: Consultorio[] = [
  {
    id: "consultorio-01",
    name: "Consultório 01",
    description:
      "Ambiente confortável e funcional para realizar seus atendimentos profissionais.",
    price: 50,
    features: [
      "Mesa de atendimento",
      "Wi-Fi",
      "Ar-condicionado",
      "Recepção inclusa",
    ],
    image: "/consultorios/consultorio_nutricao.jpeg",
  },
  {
    id: "consultorio-02",
    name: "Consultório 02",
    description:
      "Espaço reservado e confortável para oferecer uma experiência profissional aos seus pacientes.",
    price: 50,
    features: [
      "Mesa de atendimento",
      "Wi-Fi",
      "Ar-condicionado",
      "Recepção inclusa",
    ],
    image: "/consultorios/imagemconsultorio.jpeg",
  },
];