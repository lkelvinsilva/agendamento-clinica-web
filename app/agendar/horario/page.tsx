
import { Suspense } from "react";
import HorarioContent from "./HorarioContent";

export default function HorarioPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6">
          <div className="text-center">
            <p className="text-sm text-[#746C62]">
              Carregando horários...
            </p>
          </div>
        </main>
      }
    >
      <HorarioContent />
    </Suspense>
  );
}
