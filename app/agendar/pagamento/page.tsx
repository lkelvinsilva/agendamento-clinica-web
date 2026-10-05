
import { Suspense } from "react";
import PagamentoContent from "./PagamentoContent";

export default function PagamentoPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6">
          <div className="text-center">
            <p className="text-sm text-[#746C62]">
              Carregando pagamento...
            </p>
          </div>
        </main>
      }
    >
      <PagamentoContent />
    </Suspense>
  );
}
