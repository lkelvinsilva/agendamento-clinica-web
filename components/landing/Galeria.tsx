import Image from "next/image";
import Link from "next/link";

const imagens = [
  {
    src: "/consultorios/consultorio_nutricao.jpeg",
    alt: "Consultório 01",
    title: "Consultório 01",
  },
  {
    src: "/consultorios/imagemconsultorio.jpeg",
    alt: "Consultório 02",
    title: "Consultório 02",
  },
  {
    src: "/consultorios/recepcao.jpeg",
    alt: "Recepção e sala de espera",
    title: "Recepção",
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7952] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EC]";

export function Galeria() {
  return (
    <section
      aria-labelledby="galeria-titulo"
      className="border-t border-[#E5DDD1] bg-[#F7F3EC] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#B99A6B]" />

              <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#9A7952]">
                Nosso espaço
              </span>
            </div>

            <h2
              id="galeria-titulo"
              className="mt-6 font-serif text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-[#27231F] sm:text-5xl"
            >
              Ambientes que fazem parte da experiência.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#746C62] sm:text-lg">
              Conheça os ambientes disponíveis para seus atendimentos e a
              estrutura preparada para receber você e seus pacientes.
            </p>
          </div>

          <Link
            href="/consultorios"
            className={`inline-flex w-fit items-center gap-3 border-b border-[#9A7952] pb-1.5 text-sm font-medium text-[#806342] transition duration-300 hover:border-[#27231F] hover:text-[#27231F] ${focusRing}`}
          >
            Ver consultórios

            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10h12M11 5l5 5-5 5" />
            </svg>
          </Link>
        </div>

        {/* Galeria */}
        <div className="mt-16 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Imagem principal */}
          <Link
            href="/consultorios/consultorio-01"
            aria-label={`Ver detalhes de ${imagens[0].title}`}
            className={`group relative block min-h-[420px] overflow-hidden bg-[#E8DED0] sm:min-h-[560px] ${focusRing}`}
          >
            <Image
              src={imagens[0].src}
              alt={imagens[0].alt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-6 sm:p-8">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
                    01
                  </p>

                  <h3 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
                    {imagens[0].title}
                  </h3>
                </div>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#27231F] transition duration-300 group-hover:bg-[#9A7952] group-hover:text-white">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 10h12M11 5l5 5-5 5" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          {/* Imagens secundárias */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {imagens.slice(1).map((imagem, index) => (
              <div
                key={imagem.src}
                className="relative min-h-[280px] overflow-hidden bg-[#E8DED0] sm:min-h-[320px]"
              >
                <Image
                  src={imagem.src}
                  alt={imagem.alt}
                  fill
                  sizes="(min-width: 1024px) 35vw, 50vw"
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
                    {String(index + 2).padStart(2, "0")}
                  </p>

                  <h3 className="mt-2 font-serif text-2xl text-white">
                    {imagem.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé da seção */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[#E5DDD1] pt-6 text-xs uppercase tracking-[0.16em] text-[#A59A8D] sm:flex-row sm:items-center sm:justify-between">
          <span>02 consultórios</span>
          <span>Recepção compartilhada</span>
          <span>Ambientes preparados</span>
        </div>
      </div>
    </section>
  );
}