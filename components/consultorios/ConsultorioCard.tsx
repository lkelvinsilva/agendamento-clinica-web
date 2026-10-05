import Link from "next/link";
import { Consultorio } from "@/lib/types/consultorio";

type ConsultorioCardProps = {
  consultorio: Consultorio;
};

export function ConsultorioCard({
  consultorio,
}: ConsultorioCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#E5DDD1] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E8DED0]">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/70 text-2xl">
              ✦
            </div>

            <p className="mt-3 text-sm text-[#746C62]">
              Foto do consultório
            </p>
          </div>
        </div>

        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-medium">
          Disponível
        </div>
      </div>

      <div className="p-6">

        <h2 className="text-xl font-semibold">
          {consultorio.name}
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#746C62]">
          {consultorio.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {consultorio.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-[#F7F3EC] px-3 py-1.5 text-xs text-[#746C62]"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-end justify-between border-t border-[#E5DDD1] pt-5">

          <div>
            <p className="text-xs text-[#746C62]">
              A partir de
            </p>

            <p className="mt-1 text-2xl font-semibold">
              R$ {consultorio.price}

              <span className="text-sm font-normal text-[#746C62]">
                {" "}
                / hora
              </span>
            </p>
          </div>


          <Link
            href={`/consultorios/${consultorio.id}`}
            className="rounded-full bg-[#C8A97E] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#9A7952]"
          >
            Ver espaço
          </Link>

        </div>

      </div>

    </article>
  );
}