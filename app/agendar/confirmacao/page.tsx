import { Suspense } from "react";
import ConfirmacaoContent from "./ConfirmacaoContent";

export default function ConfirmacaoPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6">
          <div className="text-center">
            <p className="text-sm text-[#746C62]">
              Carregando sua reserva...
            </p>
          </div>
        </main>
      }
    >
      <ConfirmacaoContent />
    </Suspense>
  );
}