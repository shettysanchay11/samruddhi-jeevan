"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, MapPin, Menu, X } from "lucide-react";
import { content, type Locale } from "@/lib/content";
import { news } from "@/lib/news";
import { society } from "@/lib/society";
import { MobileContactBar } from "./community-services";

const ids = ["home", "about", "deposits", "loans", "calculator", "contact"];
type Props = { locale: Locale; page?: "home" | "blog" };

export function SiteHeader({ locale, page = "home" }: Props) {
  const t = content[locale], n = news[locale];
  const [menu, setMenu] = useState(false);
  const [active,setActive] = useState("home");
  const [scrolled,setScrolled] = useState(false);
  const home = `/${locale}`;
  const href = (id: string) => page === "home" ? `#${id}` : `${home}#${id}`;
  const blog = `${home}/blog`;
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  useEffect(() => {
    let frame = 0;
    const sections = page === "home" ? Array.from(document.querySelectorAll<HTMLElement>("main > section[id]")) : [];
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
      if(page === "home") {
        const cutoff = (document.querySelector(".header-inner")?.getBoundingClientRect().height ?? 90) + 35;
        let current = "home";
        for(const section of sections) if(section.getBoundingClientRect().top <= cutoff) current = section.id;
        setActive(current);
      }
    };
    const schedule = () => { if(!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll",schedule,{passive:true});
    window.addEventListener("resize",schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll",schedule); window.removeEventListener("resize",schedule); };
  },[page,locale]);
  const links = ids.map((id,i) => ({ href: href(id), label: t.nav[i] }));
  const founder = { href: href("founder"), label: n.founderLabel };
  const extras = [{href:href("membership"),label:locale === "en" ? "Membership" : "ಸದಸ್ಯತ್ವ"},{href:href("services"),label:locale === "en" ? "Insurance services" : "ವಿಮಾ ಸೇವೆಗಳು"},{href:href("monthly-income"),label:locale === "en" ? "Monthly income scheme" : "ಮಾಸಿಕ ಆದಾಯ ಯೋಜನೆ"},{href:href("questions"),label:locale === "en" ? "FAQs" : "ಪ್ರಶ್ನೋತ್ತರಗಳು"}];
  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <div className="topbar"><div className="container topbar-inner"><span><MapPin size={13} aria-hidden="true"/>{t.location}</span><a href={`tel:+91${society.officePhone}`}>{society.officePhone}<ArrowUpRight size={13} aria-hidden="true"/></a></div></div>
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}><div className="container header-inner">
      <Link className="brand" href={home} aria-label={`${t.brand} ${t.nav[0]}`}><Image src="/society-logo.jpg" alt="" width={58} height={58} priority/><span><strong>{t.brand}</strong><small>{t.legal}</small></span></Link>
      <nav className="desktop-nav" aria-label={locale === "en" ? "Main navigation" : "ಮುಖ್ಯ ಸಂಚರಣೆ"}>{links.slice(0,5).map(link => <a key={link.href} href={link.href} aria-current={page === "home" && link.href === `#${active}` ? "location" : undefined}>{link.label}</a>)}<Link href={blog} aria-current={page === "blog" ? "page" : undefined}>{n.blog}</Link></nav>
      <div className="header-actions"><Link className="language-switch" href={`/${locale === "en" ? "kn" : "en"}${page === "blog" ? "/blog" : ""}`} lang={locale === "en" ? "kn" : "en"} aria-label={t.language}>{locale === "en" ? "ಕನ್ನಡ" : "English"}</Link><a href={href("contact")} className="header-contact">{t.contact}<ArrowUpRight size={15} aria-hidden="true"/></a><button type="button" className="menu-toggle" aria-label={menu ? t.closeMenu : t.mobileMenu} aria-expanded={menu} aria-controls={menu ? "mobile-navigation" : undefined} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button></div>
    </div>{menu && <nav id="mobile-navigation" className="mobile-nav" aria-label={t.mobileMenu}>{[...links.slice(0,2),founder,...links.slice(2),...extras,{href:blog,label:n.blog}].map(link => <a key={link.href} href={link.href} aria-current={link.href === blog && page === "blog" ? "page" : page === "home" && link.href === `#${active}` ? "location" : undefined} onClick={() => setMenu(false)}>{link.label}<ArrowUpRight size={15} aria-hidden="true"/></a>)}</nav>}</header>
  </>;
}

export function SiteFooter({ locale, page = "home" }: Props) {
  const t = content[locale], n = news[locale];
  const home = `/${locale}`;
  const href = (id: string) => page === "home" ? `#${id}` : `${home}#${id}`;
  return <><footer className="footer"><div className="container"><div className="footer-top"><div><Link href={home} className="brand footer-brand"><Image src="/society-logo.jpg" alt="" width={52} height={52}/><span><strong>{t.brand}</strong><small>{t.legal}</small></span></Link><p>{t.footer}</p></div><nav aria-label={locale === "en" ? "Footer navigation" : "ಕೆಳಭಾಗದ ಸಂಚರಣೆ"}>{ids.slice(1).map((id,i) => <a href={href(id)} key={id}>{t.nav[i+1]}</a>)}<a href={href("founder")}>{n.founderLabel}</a><a href={href("membership")}>{locale === "en" ? "Membership" : "ಸದಸ್ಯತ್ವ"}</a><a href={href("services")}>{locale === "en" ? "Services" : "ಸೇವೆಗಳು"}</a><a href={href("monthly-income")}>MIS</a><a href={href("questions")}>{locale === "en" ? "FAQs" : "ಪ್ರಶ್ನೋತ್ತರಗಳು"}</a><Link href={`${home}/blog`}>{n.blog}</Link></nav><a className="back-top" href={page === "blog" ? "#blog-top" : "#home"} aria-label={t.back}><ArrowUp size={20}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {t.brand}. {t.rights}</span><span>{t.registration} {society.registration}</span></div></div></footer><MobileContactBar locale={locale}/></>;
}
