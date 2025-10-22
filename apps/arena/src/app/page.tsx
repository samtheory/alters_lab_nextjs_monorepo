import { Button } from "@ui/shared";
import { nowISO } from "@utils/shared/time";
import { health } from "@api/client";

export default async function Page() {
  const api = await health().catch(() => ({ ok: false }));
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Arena</h1>
      <p>Now: {nowISO()}</p>
      <p>API health: {api?.ok ? "OK" : "DOWN"}</p>
      <Button>Start</Button>
    </main>
  );
}
