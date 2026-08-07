"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { img } from "@/content/elements";
import { gallery, galleryCategories, type GalleryCategory } from "@/content/site";

/**
 * Filterable mosaic with a lightbox.
 *
 * The lightbox is a native <dialog> opened with showModal(), which gives focus
 * trapping, Esc-to-close and inert background for free — all things a div-based
 * modal has to reimplement and usually gets wrong.
 */
export default function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategory>("All");
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const shots = gallery.filter((s) => filter === "All" || s.category === filter);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => {
    dialogRef.current?.close();
    setIndex(null);
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i === null ? null : (i + dir + shots.length) % shots.length));
    },
    [shots.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index === null ? null : shots[index];

  return (
    <>
      {/* Filters */}
      <div className="mb-10 flex flex-wrap gap-2">
        {galleryCategories.map((c) => {
          const on = c === filter;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={on}
              className="u-label rounded-full border px-4 py-2 transition-colors duration-400"
              style={{
                borderColor: on ? "var(--accent)" : "color-mix(in srgb, currentColor 22%, transparent)",
                backgroundColor: on ? "color-mix(in srgb, var(--accent) 15%, transparent)" : "transparent",
                color: on ? "var(--accent)" : undefined,
                opacity: on ? 1 : 0.6,
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Mosaic. Tall shots take two rows so the grid never reads as a
          uniform contact sheet. */}
      <ul className="grid auto-rows-[190px] grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {shots.map((s, i) => (
          <li key={s.id + i} className={s.tall ? "row-span-2" : ""}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative h-full w-full overflow-hidden rounded-[14px] text-left transition-[translate,scale] duration-500 ease-[var(--ease-world)] hover:-translate-y-1 hover:scale-[1.02] focus-visible:-translate-y-1 focus-visible:scale-[1.02]"
              aria-label={`${s.caption} — open larger`}
            >
              <Image
                src={img(s.id, s.tall ? 900 : 700)}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
                }}
              />
              <span className="u-label absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{ color: "rgba(255,255,255,0.92)", fontSize: "0.58rem" }}>
                {s.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {shots.length === 0 && (
        <p className="py-16 text-center text-sm text-muted">
          Nothing in this category yet.
        </p>
      )}

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          // Clicking the backdrop closes; clicking the figure does not.
          if (e.target === dialogRef.current) close();
        }}
        className="max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
        style={{ width: "100vw", height: "100dvh" }}
      >
        {current && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-4 sm:p-10">
            <div className="relative max-h-[74vh] w-full max-w-5xl flex-1">
              <Image
                src={img(current.id, 1800, 80)}
                alt={current.caption}
                fill
                sizes="90vw"
                className="rounded-[14px] object-contain"
              />
            </div>

            <div className="flex w-full max-w-5xl items-center justify-between gap-6">
              <p className="u-label" style={{ color: "rgba(255,255,255,0.8)" }}>
                {current.caption}
                <span className="ml-3 opacity-50">
                  {(index ?? 0) + 1} / {shots.length}
                </span>
              </p>
              <div className="flex gap-2">
                <LightboxButton onClick={() => step(-1)} label="Previous image">←</LightboxButton>
                <LightboxButton onClick={() => step(1)} label="Next image">→</LightboxButton>
                <LightboxButton onClick={close} label="Close">✕</LightboxButton>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function LightboxButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border transition-opacity duration-300 hover:opacity-60"
      style={{ borderColor: "rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.9)" }}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}

