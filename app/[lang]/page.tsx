import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Website } from "@/components/website";
import { content, type Locale } from "@/lib/content";
export const dynamicParams = false;
export function generateStaticParams() { return [{ lang: "en" }, { lang: "kn" }]; }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = content[lang as Locale];
  if (!t) return {};
  return { title: `${t.brand} | ${t.legal}`, description: t.intro };
}
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "kn") notFound();
  return <Website locale={lang} />;
}
