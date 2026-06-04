const team = [
  {
    name: "Alex Chen",
    role: "Founder & AI Visibility Lead",
    bio: "Former SEO director at a top-10 crypto exchange. Obsessed with how LLMs rank and cite sources.",
  },
  {
    name: "Sarah Kim",
    role: "Head of Content Strategy",
    bio: "Built content engines for 3 unicorn startups. Specializes in technical content that AI systems love to cite.",
  },
  {
    name: "Marcus Johnson",
    role: "Lead Developer",
    bio: "Full-stack engineer with deep expertise in structured data, semantic markup, and AI-readable web architectures.",
  },
];

export function TeamSection() {
  return (
    <section id="company" className="border-b border-[var(--border-default)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
          Team
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
          Built by AI visibility experts
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col gap-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-secondary)] font-semibold text-[var(--accent-primary)]">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {member.name}
                </h3>
                <p className="text-sm text-[var(--accent-primary)]">
                  {member.role}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
