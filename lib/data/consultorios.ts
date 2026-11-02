
import { Consultorio } from "@/lib/types/consultorio";

export const consultorios: Consultorio[] = [
  {
    id: "consultorio-01",
    name: "Consultório 01",
    description:
      "Um ambiente pensado para profissionais de odontologia e harmonização facial, que valorizam o cuidado, a estética e a excelência em cada atendimento. Um espaço profissional para receber seus pacientes com conforto e atenção aos detalhes.",
    price: 80,
    features: [
      "Estrutura para odontologia e harmonização facial",
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
      "Um ambiente acolhedor e reservado para profissionais de psicologia e nutrição. Um espaço que valoriza a escuta, o bem-estar e o cuidado individualizado, proporcionando uma experiência confortável para profissionais e pacientes.",
    price: 70,
    features: [
      "Ambiente para psicologia e nutrição",
      "Wi-Fi",
      "Ar-condicionado",
      "Recepção inclusa",
    ],
    image: "/consultorios/imagemconsultorio.jpeg",
  },
];
