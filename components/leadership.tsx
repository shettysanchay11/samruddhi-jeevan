import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { type Locale } from "@/lib/content";
import { news, inauguration } from "@/lib/news";

export function Leadership({ locale }: { locale: Locale }) {
  const n = news[locale];
  return <section className="section founder-section" id="founder"><div className="container founder-grid">
    <div className="founder-photo"><Image src="/founder-president.jpg" alt={n.founderAlt} width={1560} height={1040} sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1200px) 45vw, 540px"/><span className="founder-photo-tag">{n.founderLabel}</span></div>
    <div className="founder-copy"><span className="eyebrow">{n.founderEyebrow}</span><h2>{n.founderTitle}</h2><div className="founder-name">{n.founderName}</div><span className="founder-role">{n.founderLabel}</span><p>{n.founderDescription}</p><dl className="founder-highlights">{n.founderHighlights.map(item=><div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl><ul className="founder-credentials">{n.founderCredentials.map(label=><li key={label}>{label}</li>)}</ul></div>
  </div></section>;
}

export function BlogPreview({ locale }: { locale: Locale }) {
  const n = news[locale];
  return <section className="section blog-preview" id="news"><div className="container">
    <div className="section-heading"><div><span className="eyebrow">{n.blogEyebrow}</span><h2>{n.blogTitle}</h2></div><Link className="text-button" href={`/${locale}/blog`}>{n.viewBlog}<ArrowUpRight size={17}/></Link></div>
    <Link className="news-feature" href={`/${locale}/blog#${inauguration.slug}`}>
      <div className="news-feature-image"><Image src={inauguration.cover} alt={n.photoCaptions[0]} width={1280} height={853} sizes="(max-width: 700px) calc(100vw - 40px), 50vw"/><span className="media-badge"><Play size={13} aria-hidden="true"/>{n.mediaSummary}</span></div>
      <div className="news-feature-copy"><span className="eyebrow">{n.category}</span><h3>{n.title}</h3><p>{n.excerpt}</p><span className="text-button">{n.read}<ArrowUpRight size={18}/></span></div>
    </Link>
  </div></section>;
}
