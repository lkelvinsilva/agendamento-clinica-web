import Link from "next/link";
import { notFound } from "next/navigation";
import { consultorios } from "@/lib/data/consultorios";
import Image from "next/image";

export default async function ConsultorioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const consultorio = consultorios.find(
    (item) => item.id === id
  );

  if (!consultorio) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#27231F]">
      {/* Navegação */}
      <div className="border-b border-[#E5DDD1]">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <Link
            href="/consultorios"
            className="text-sm text-[#746C62] transition hover:text-[#9A7952]"
          >
            ← Voltar para consultórios
          </Link>
        </div>
      </div>

      {/* Conteúdo principal */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            {/* Imagem */}
            <div className="overflow-hidden rounded-[2rem] bg-[#E8DED0]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#E8DED0]">
                <Image
  src={consultorio.image}
  alt={consultorio.name}
  fill
  className="object-cover transition duration-500 hover:scale-105"
/>
              </div>
            </div>

            {/* Informações */}
            <div>
              <span className="inline-flex rounded-full bg-[#EFE8DC] px-4 py-2 text-sm font-medium text-[#9A7952]">
                Disponível para reserva
              </span>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                {consultorio.name}
              </h1>

              <p className="mt-6 text-lg leading-8 text-[#746C62]">
                {consultorio.description}
              </p>

              {/* Preço */}
              <div className="mt-8 rounded-2xl border border-[#E5DDD1] bg-white p-6">
                <p className="text-sm text-[#746C62]">
                  Valor da utilização
                </p>

                <p className="mt-2 text-3xl font-semibold">
                  R$ {consultorio.price}
                  <span className="text-base font-normal text-[#746C62]">
                    {" "}
                    / hora
                  </span>
                </p>
              </div>

              {/* Características */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold">
                  Estrutura disponível
                </h2>

                <div className="mt-4 space-y-3">
                  {consultorio.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EFE8DC] text-sm text-[#9A7952]">
                        ✓
                      </span>

                      <span className="text-[#746C62]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reserva */}
              <div className="mt-10">
                <Link
                  href={`/agendar?consultorio=${consultorio.id}`}
                  className="flex w-full items-center justify-center rounded-full bg-[#C8A97E] px-7 py-4 font-medium text-white transition hover:bg-[#9A7952]"
                >
                  Reservar este consultório
                </Link>

                <p className="mt-3 text-center text-xs text-[#746C62]">
                  Você poderá escolher a data e o horário na próxima etapa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sala de espera */}
      <section className="border-t border-[#E5DDD1] bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[2rem] bg-[#EFE8DC] p-8 lg:p-12">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9A7952]">
                Estrutura compartilhada
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                Sala de espera inclusa
              </h2>

              <p className="mt-5 leading-8 text-[#746C62]">
                Durante sua reserva, seus pacientes também poderão utilizar a
                sala de espera da clínica, proporcionando uma experiência mais
                confortável antes do atendimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voltar */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <Link
            href="/consultorios"
            className="text-sm font-medium text-[#9A7952] transition hover:text-[#746C62]"
          >
            ← Ver todos os consultórios
          </Link>
        </div>
      </section>
    </main>
  );
}