import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { PostCard } from "@/components/cards";
import { Marker, Section, RULE } from "@/components/ui/primitives";
import { img } from "@/content/elements";
import { findPost, formatDate, posts, relatedPosts } from "@/content/journal";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const related = relatedPosts(post.slug);

  return (
    <>
      <article>
        {/* Header */}
        <Section className="pt-32 lg:pt-40">
          <Reveal>
            <p className="u-label opacity-45">
              {post.category} · {post.readingMinutes} min read
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(2rem,5vw,4.2rem)] font-light leading-[1.04]">
              {post.title}
            </h1>
            <p className="mt-8 max-w-2xl text-[1.05rem] leading-[1.8] text-muted">
              {post.excerpt}
            </p>
            <div
              className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t pt-6"
              style={{ borderColor: RULE }}
            >
              <span className="text-sm">{post.author}</span>
              <span className="u-label opacity-45">{post.authorRole}</span>
              <span className="u-label opacity-45">{formatDate(post.date)}</span>
            </div>
          </Reveal>
        </Section>

        {/* Hero plate */}
        <Section className="pt-12 lg:pt-16">
          <Reveal>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[16px]">
              <Image
                src={img(post.hero, 2000)}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Section>

        {/* Body — a measure-limited column, not the full grid */}
        <Section className="pt-16 lg:pt-24">
          <div className="max-w-[46rem]">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <Reveal key={i}>
                    <h2 className="mt-16 font-display text-[clamp(1.5rem,3vw,2.3rem)] font-light leading-[1.15]">
                      {block.text}
                    </h2>
                  </Reveal>
                );
              }
              if (block.type === "quote") {
                return (
                  <Reveal key={i}>
                    <blockquote
                      className="my-14 border-l-2 pl-8"
                      style={{ borderColor: "var(--accent)" }}
                    >
                      <p className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-light leading-[1.25]">
                        {block.text}
                      </p>
                      {block.cite && (
                        <cite className="u-label mt-4 block not-italic opacity-45">
                          {block.cite}
                        </cite>
                      )}
                    </blockquote>
                  </Reveal>
                );
              }
              if (block.type === "image") {
                return (
                  <Reveal key={i}>
                    <figure className="my-14">
                      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[14px]">
                        <Image
                          src={img(block.id, 1400)}
                          alt={block.caption}
                          fill
                          sizes="(max-width: 768px) 100vw, 46rem"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="u-label mt-4 opacity-45">
                        {block.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                );
              }
              return (
                <Reveal key={i}>
                  <p className="mt-7 text-[1.02rem] leading-[1.85] text-muted">
                    {block.text}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </Section>
      </article>

      <Section className="py-24 lg:py-36">
        <Marker>Read next</Marker>
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-3">
          {related.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.08}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
