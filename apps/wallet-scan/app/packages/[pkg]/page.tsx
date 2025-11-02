import { notFound } from "next/navigation";
import Link from "next/link";
import { button as buttonStyles } from "@heroui/theme";

import { packageKeys, packageMetadata } from "../package-metadata";

export function generateStaticParams() {
  return packageKeys.map((pkg) => ({ pkg }));
}

export default function PackagePage({ params }: { params: { pkg: string } }) {
  const entry = packageMetadata[params.pkg as keyof typeof packageMetadata];

  if (!entry) {
    notFound();
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 py-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-default-500">
          Shared Package
        </p>
        <h1 className="text-3xl font-semibold text-foreground">
          {entry.title}
        </h1>
        <p className="text-base text-default-600">{entry.description}</p>
        <Link
          className={buttonStyles({ variant: "flat", radius: "full" })}
          href="/packages"
        >
          Back to all packages
        </Link>
      </header>

      <div className="rounded-lg border border-default-200 bg-default-50 p-6">
        <p className="text-sm text-default-600">
          This package is shared across all apps in the monorepo.
        </p>
      </div>
    </section>
  );
}
