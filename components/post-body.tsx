import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

type Block = {
  _type: string;
  _key?: string;
  style?: string;
  children?: Array<{ _type: string; text?: string; marks?: string[] }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
    nofollow?: boolean;
  }>;
  asset?: { _ref?: string; url?: string };
  url?: string;
  caption?: string;
  code?: string;
  language?: string;
  filename?: string;
};

const components: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      const nofollow = (value as { nofollow?: boolean })?.nofollow;
      const rel = external
        ? nofollow
          ? "nofollow noopener noreferrer"
          : "noopener noreferrer"
        : undefined;
      return (
        <a
          href={href}
          {...(external
            ? {
                target: "_blank",
                rel,
              }
            : {})}
          className="text-[var(--accent-primary)] underline decoration-[var(--accent-primary)]/40 underline-offset-2 hover:decoration-[var(--accent-primary)]"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--text-primary)]">
        {children}
      </strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-[var(--bg-surface-hover)] px-1.5 py-0.5 text-[0.9em] text-[var(--accent-primary)]">
        {children}
      </code>
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="text-[17px] leading-[1.8] text-[var(--text-secondary)]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-[var(--text-primary)]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-[var(--accent-primary)] pl-5 text-lg text-[var(--text-primary)] italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 list-disc space-y-2 pl-6 text-[var(--text-secondary)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 list-decimal space-y-2 pl-6 text-[var(--text-secondary)]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const url = (value as { asset?: { url?: string } })?.asset?.url;
      if (!url) return null;
      return (
        <figure className="my-8">
          <img
            src={url}
            alt={(value as { alt?: string })?.alt ?? ""}
            className="w-full rounded-2xl border border-[var(--border-soft)]"
            loading="lazy"
          />
        </figure>
      );
    },
    video: ({ value }) => {
      const v = value as { url?: string; caption?: string };
      if (!v?.url) return null;
      return (
        <figure className="my-8">
          <div className="aspect-video overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-black">
            <VideoEmbed url={v.url} />
          </div>
          {v.caption ? (
            <figcaption className="mt-3 text-center text-sm text-[var(--text-muted)]">
              {v.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    code: ({ value }) => {
      const v = value as {
        code?: string;
        language?: string;
        filename?: string;
      };
      if (!v?.code) return null;
      return (
        <pre className="my-6 overflow-x-auto rounded-xl border border-[var(--border-soft)] bg-[var(--bg-surface-hover)] p-4 text-sm leading-relaxed">
          {v.filename ? (
            <div className="mb-2 text-xs font-medium text-[var(--text-muted)]">
              {v.filename}
            </div>
          ) : null}
          <code className="text-[var(--text-primary)]">{v.code}</code>
        </pre>
      );
    },
  },
};

function VideoEmbed({ url }: { url: string }) {
  // YouTube watch -> embed
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/,
  );
  if (yt) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${yt[1]}`}
        title="YouTube video"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }
  // Vimeo
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${vm[1]}`}
        title="Vimeo video"
        className="h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }
  // Fallback: direct mp4
  return <video src={url} controls className="h-full w-full" />;
}

export default function PostBody({ blocks }: { blocks: Block[] }) {
  if (!blocks || blocks.length === 0) {
    return (
      <p className="text-[var(--text-secondary)]">
        This post has no body content yet.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <PortableText value={blocks as never} components={components} />
    </div>
  );
}
