export function SectionLabel({ name }: { name: string }) {
  // Dev-only section identifier. Hidden in production/staging builds.
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <div
      className="pointer-events-none absolute top-4 left-4 z-50 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white opacity-75"
      aria-label={`${name} section identifier`}
    >
      {name}
    </div>
  );
}
