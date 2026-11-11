import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { type Locale } from "@/lib/content";
import { enhancements } from "@/lib/enhancements";

export function PressGallery({locale, kind}: {locale: Locale; kind: "invitation" | "press"}) {
  const e = enhancements[locale];
  const images = kind === "invitation" ? ["invitation.jpg","inauguration-highlights.jpg"] : ["sanje-darpana.jpg","english-press.jpg","kannada-press.jpg"];
  const titles = kind === "invitation" ? e.invitationTitles : e.pressTitles;
  return <div className={`press-grid ${kind === "invitation" ? "invitation-grid" : ""}`}>{images.map((file,i)=><figure key={file}><a href={`/press/${file}`} target="_blank" rel="noopener noreferrer" aria-label={`${titles[i]} · ${e.openOriginal}`}><div className="press-image"><Image src={`/press/${file}`} alt={titles[i]} width={1000} height={1300} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 45vw, 35vw"/></div><figcaption><span>{titles[i]}</span><ArrowUpRight size={17}/></figcaption></a></figure>)}</div>;
}
