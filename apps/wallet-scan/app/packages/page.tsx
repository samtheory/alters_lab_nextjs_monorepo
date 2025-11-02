import Link from "next/link";
import { button as buttonStyles } from "@heroui/theme";

import { packageMetadata } from "./package-metadata";

export default function PackagesIndexPage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 py-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-default-500">
          Workspace Packages
        </p>
        <h1 className="text-3xl font-semibold text-foreground">
          Shared package demos
        </h1>
        <p className="text-base text-default-600">
          Explore the reusable building blocks that power the Alters monorepo.
          Each link below opens an interactive example that proves the package
          wiring works inside the wallet-scan app.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(packageMetadata).map(([key, entry]) => (
          <article
            key={key}
            className="flex h-full flex-col justify-between rounded-2xl border border-default-100 bg-default-50/30 p-6 shadow-sm"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                {entry.title}
              </h2>
              <p className="text-sm text-default-600">{entry.description}</p>
            </div>
            <div className="pt-4">
              <Link
                className={buttonStyles({
                  variant: "bordered",
                  radius: "full",
                })}
                href={`/packages/${key}`}
              >
                View example
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
