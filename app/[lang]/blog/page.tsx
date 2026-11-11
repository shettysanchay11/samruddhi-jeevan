import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Camera, Play, CalendarDays, MapPin, Clock3, Newspaper, FileText } from "lucide-react";
import { content, type Locale } from "@/lib/content";
import { news, inauguration } from "@/lib/news";
import { enhancements } from "@/lib/enhancements";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { PhotoGallery } from "@/components/photo-gallery";
import { PressGallery } from "@/components/press-gallery";

export const dynamicParams = false;
export function generateStaticParams() { return [{lang:"en"},{lang:"kn"}]; }
export async function generateMetadata({ params }: { params: Promise<{lang:string}> }): Promise<Metadata> {
  const {lang} = await params;
  if(lang !== "en" && lang !== "kn") return {};
  return {title:`${news[lang].blog} | ${content[lang].brand}`,description:news[lang].excerpt};
}
export default async function BlogPage({ params }: {params: Promise<{lang:string}>}) {
  const {lang} = await params;
  if(lang !== "en" && lang !== "kn") notFound();
  const locale: Locale = lang, n = news[locale], e = enhancements[locale];
  const anchors = [{id:"event-overview",label:e.overview},{id:"invitation",label:e.invitation},{id:"photographs",label:n.photos},{id:"videos",label:n.videos},{id:"press",label:e.press}];
  return <div lang={locale} className={`site locale-${locale}`}><SiteHeader locale={locale} page="blog"/>
    <main id="main">
      <section className="blog-hero" id="blog-top"><div className="container"><Link className="back-link" href={`/${locale}`}><ArrowLeft size={15}/>{n.home}</Link><span className="eyebrow">{n.blogEyebrow}</span><h1>{n.blogTitle}</h1><p>{n.blogIntro}</p></div></section>
      <article className="section inauguration-article" id={inauguration.slug}><div className="container">
        <div className="article-heading"><span className="eyebrow">{n.category}</span><h2>{n.title}</h2><p>{n.excerpt}</p><div className="article-meta"><CalendarDays size={15}/><time dateTime="2026-07-03">{e.eventDate}</time><span>·</span><Camera size={15}/><span>{n.mediaSummary}</span></div></div>
        <nav className="article-contents" aria-label={e.contents}><span>{e.contents}</span>{anchors.map(a=><a key={a.id} href={`#${a.id}`}>{a.label}</a>)}</nav>
        <div className="article-cover"><Image src="/inauguration/photo-2.jpg" alt={n.photoCaptions[1]} width={1280} height={853} sizes="(max-width: 1300px) 95vw, 1200px" priority/></div>
        <section className="event-overview" id="event-overview" aria-labelledby="event-details-title"><h3 id="event-details-title">{e.eventDetails}</h3><dl className="event-facts"><div><dt><CalendarDays size={17}/>{e.eventDateLabel}</dt><dd>{e.eventDate}</dd></div><div><dt><Clock3 size={17}/>{e.eventTimeLabel}</dt><dd>{e.eventTime}</dd></div><div><dt><MapPin size={17}/>{e.venueLabel}</dt><dd>{e.venue}</dd></div><div><dt>{e.chiefGuest}</dt><dd>{e.chiefGuestName}</dd></div></dl><p className="fine-print">{e.sourceTime}</p></section>
        <div className="article-story">{e.blogBody.map(text=><p key={text}>{text}</p>)}</div>
        <section className="article-media" id="invitation" aria-labelledby="invitation-title"><div className="media-heading"><span className="icon-box"><FileText size={23}/></span><div><h3 id="invitation-title">{e.invitation}</h3><p>{e.invitationIntro}</p></div></div><PressGallery locale={locale} kind="invitation"/></section>
        <section className="article-media" id="photographs" aria-labelledby="photo-title"><div className="media-heading"><span className="icon-box"><Camera size={23}/></span><div><h3 id="photo-title">{n.photos}</h3><p>{n.photoIntro}</p></div></div><PhotoGallery locale={locale}/></section>
        <section className="article-media video-section" id="videos" aria-labelledby="video-title"><div className="media-heading"><span className="icon-box"><Play size={23}/></span><div><h3 id="video-title">{n.videos}</h3><p>{n.videoIntro}</p></div></div><div className="video-grid">{inauguration.videos.map((video,i)=><figure key={video.src}>
          <video controls playsInline preload="none" poster={video.poster} aria-label={n.clipTitles[i]} aria-describedby={`clip-description-${i}`}><source src={video.src} type="video/mp4"/>{n.videoFallback} <a href={video.src}>{n.openClip}</a></video>
          <figcaption><div><h4>{n.clipTitles[i]}<span className="video-duration">{video.duration}</span></h4><p id={`clip-description-${i}`}>{e.clipDescriptions[i]}</p></div><a href={video.src} target="_blank" rel="noopener noreferrer">{n.openClip}<ArrowUpRight size={14}/></a></figcaption>
        </figure>)}</div><p className="fine-print video-transcript-note">{e.videoAccessibility}</p></section>
        <section className="article-media" id="press" aria-labelledby="press-title"><div className="media-heading"><span className="icon-box"><Newspaper size={23}/></span><div><h3 id="press-title">{e.press}</h3><p>{e.pressIntro}</p></div></div><PressGallery locale={locale} kind="press"/></section>
        <div className="article-end"><span className="eyebrow">{content[locale].brand}</span><Link className="text-button" href={`/${locale}#founder`}>{n.founderLabel}<ArrowUpRight size={17}/></Link></div>
      </div></article>
    </main><SiteFooter locale={locale} page="blog"/>
  </div>;
}
