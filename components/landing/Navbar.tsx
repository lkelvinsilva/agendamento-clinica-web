"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Início", href: "/" },
  { label: "Consultórios", href: "/consultorios" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Localização", href: "/#localizacao" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7952] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EC]";

export function Navbar() {
  const pathname = usePathname();

  const [openedAt, setOpenedAt] = useState<string | null>(null);

  const open = openedAt === pathname;

  const setOpen = (value: boolean) => {
    setOpenedAt(value ? pathname : null);
  };

  // Fecha o menu ao pressionar Esc
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedAt(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    !href.includes("#") && pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5DDD1] bg-[#F7F3EC]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Marca */}
        <Link
          href="/"
          className={`group inline-flex items-center rounded font-serif text-[27px] font-medium tracking-[-0.025em] text-[#27231F] ${focusRing}`}
        >
          Clínica
          <span className="ml-0.5 text-[#B99A6B] transition-colors duration-300 group-hover:text-[#9A7952]">
            .
          </span>
        </Link>

        {/* Navegação desktop */}
        <nav
          aria-label="Principal"
          className="hidden items-center gap-9 md:flex"
        >
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`group relative rounded py-2 text-[13px] font-medium transition-colors duration-300 ${focusRing} ${
                  active
                    ? "text-[#27231F]"
                    : "text-[#746C62] hover:text-[#27231F]"
                }`}
              >
                {link.label}

                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 h-px bg-[#9A7952] transition-all duration-300 ${
                    active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-3">

          <Link
            href="/agendar"
            className={`hidden rounded-full bg-[#9A7952] px-5 py-2.5 text-[13px] font-medium text-white shadow-[0_10px_24px_-16px_rgba(39,35,31,0.7)] transition duration-300 hover:bg-[#806342] sm:inline-flex ${focusRing}`}
          >
            Fazer uma reserva
          </Link>

          {/* Menu mobile */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D8CCBC] text-[#27231F] transition duration-300 hover:bg-[#EFE8DC] md:hidden ${focusRing}`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 8h16" />
                  <path d="M4 16h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div
          id="menu-mobile"
          className="border-t border-[#E5DDD1] bg-[#F7F3EC] md:hidden"
        >
          <nav
            aria-label="Principal (mobile)"
            className="mx-auto max-w-7xl px-6 py-5"
          >
            <ul className="divide-y divide-[#E5DDD1]">
              {links.map((link) => {
                const active = isActive(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block py-4 text-base transition-colors duration-300 ${
                        active
                          ? "font-medium text-[#27231F]"
                          : "text-[#746C62] hover:text-[#27231F]"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {link.label}

                        {active && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-[#9A7952]"
                          />
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 grid gap-3 border-t border-[#E5DDD1] pt-5">

              <Link
                href="/agendar"
                onClick={() => setOpen(false)}
                className="flex w-full justify-center rounded-full bg-[#9A7952] px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-[#806342]"
              >
                Fazer uma reserva
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}