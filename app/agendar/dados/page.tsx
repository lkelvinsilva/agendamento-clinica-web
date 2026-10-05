import { Suspense } from "react";
import DadosContent from "./DadosContent";

export default function DadosPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6">
          <div className="text-center">
            <p className="text-sm text-[#746C62]">
              Carregando seus dados...
            </p>
          </div>
        </main>
      }
    >
      <DadosContent />
    </Suspense>
  );
}