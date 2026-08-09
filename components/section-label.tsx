export function SectionLabel({ name }: { name: string }) {
  return (
    <div
      className="pointer-events-none absolute top-4 left-4 z-50 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white opacity-75"
      aria-label={`${name} section identifier`}
    >
      {name}
    </div>
  );
}
