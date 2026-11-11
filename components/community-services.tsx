import { ArrowUpRight, ShieldPlus, HeartPulse, ShieldCheck, ReceiptText, ScrollText, Users, Clock3, MessageCircle, Phone, MapPin } from "lucide-react";
import { society, deposits } from "@/lib/society";
import { type Locale } from "@/lib/content";
import { enhancements } from "@/lib/enhancements";

export function Membership({ locale }: {locale: Locale}) {
  const e = enhancements[locale];
  return <section className="section membership-section" id="membership"><div className="container membership-card"><div className="membership-icon"><Users size={32}/></div><div><span className="eyebrow">{e.membershipEyebrow}</span><h2>{e.membershipTitle}</h2><p>{e.membershipText}</p><p className="fine-print">{e.membershipNote}</p></div><div className="membership-action"><strong>₹{society.shareMembership.toLocaleString("en-IN")}</strong><span>{locale === "en" ? "Share membership + SB account" : "ಷೇರು ಸದಸ್ಯತ್ವ + ಎಸ್‌ಬಿ ಖಾತೆ"}</span><a className="button button-navy" href="#contact">{e.membershipAction}<ArrowUpRight size={17}/></a></div></div></section>;
}

export function DepositComparison({locale}: {locale:Locale}) {
  const e = enhancements[locale];
  const en = locale === "en";
  return <div className="comparison"><h3>{e.compare}</h3><div className="comparison-scroll" role="region" aria-label={e.compare} tabIndex={0}><table><thead><tr><th>{e.product}</th><th>{e.minimum}</th><th>{en ? "Tenure" : "ಅವಧಿ"}</th><th>{e.payout}</th></tr></thead><tbody><tr><th>{en ? "Fixed deposit" : "ನಿಶ್ಚಿತ ಠೇವಣಿ"}</th><td>₹{deposits.minimum.fd.toLocaleString("en-IN")}+</td><td>6, 12, 24+ {en ? "months" : "ತಿಂಗಳು"}</td><td>{e.fdPayout}</td></tr><tr><th>{en ? "Recurring deposit" : "ಮರುಕಳಿಸುವ ಠೇವಣಿ"}</th><td>₹{deposits.minimum.rd.toLocaleString("en-IN")} / {en ? "month" : "ತಿಂಗಳು"}+</td><td>12, 24, 36 {en ? "months" : "ತಿಂಗಳು"}</td><td>{e.rdPayout}</td></tr></tbody></table></div><p className="fine-print">{e.eligibility}: {e.memberRequired}. <a href="#membership">₹{society.shareMembership.toLocaleString("en-IN")}</a></p></div>;
}

export function InsuranceServices({locale}: {locale:Locale}) {
  const e = enhancements[locale];
  const icons = [ShieldPlus,HeartPulse,ShieldCheck,ReceiptText,ScrollText];
  return <section className="section insurance-section" id="services"><div className="container"><div className="section-heading"><div><span className="eyebrow">{e.servicesEyebrow}</span><h2>{e.servicesTitle}</h2></div><p>{e.servicesIntro}</p></div><div className="insurance-grid">{e.services.map((title,i)=>{const Icon=icons[i];return <article key={title}><Icon size={25}/><h3>{title}</h3><p>{e.serviceDescriptions[i]}</p></article>;})}</div><p className="fine-print">{e.serviceNote}</p></div></section>;
}

export function OfficeMap({locale}: {locale:Locale}) {
  const e = enhancements[locale];
  return <div className="office-map"><h3><MapPin size={19}/>{e.map}</h3><iframe title={e.map} src={society.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/><p className="fine-print">{e.mapNote}</p><div className="office-hours"><Clock3 size={19}/><span>{e.officeHours}<strong>{e.hours}</strong></span></div></div>;
}

export function MobileContactBar({locale}: {locale:Locale}) {
  const e = enhancements[locale];
  return <nav className="mobile-contact-bar" aria-label={locale === "en" ? "Quick contact" : "ತ್ವರಿತ ಸಂಪರ್ಕ"}><a href={`tel:+91${society.officePhone}`}><Phone size={19}/>{e.call}</a><a href={`https://wa.me/${society.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={20}/>{e.whatsapp}</a><a href={society.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={19}/>{e.directions}</a></nav>;
}
