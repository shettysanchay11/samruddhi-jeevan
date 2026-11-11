"use client";
import Image from "next/image";
import { FrequentlyAsked } from "./faq";
import Link from "next/link";
import { useState } from "react";
import { type DepositKind } from "@/lib/calculators";
import { enhancements } from "@/lib/enhancements";
import { news } from "@/lib/news";
import { MisPlan } from "./mis-plan";
import { Membership, DepositComparison, InsuranceServices, OfficeMap } from "./community-services";
import { ArrowRight, ArrowUpRight, Sprout, MapPin, Phone, Mail, Landmark, Coins, CalendarDays, HandCoins, Wallet, HeartHandshake, FileCheck2, Users, Building2, BriefcaseBusiness, CarFront, GraduationCap, UserRound, Leaf, ShieldCheck } from "lucide-react";
import { society, deposits } from "@/lib/society";
import { content, type Locale } from "@/lib/content";
import { Calculator } from "./calculator";
import { Enquiry } from "./enquiry";
import { SiteHeader, SiteFooter } from "./site-chrome";
import { Leadership, BlogPreview } from "./leadership";

export function Website({ locale }: { locale: Locale }) {
  const t = content[locale], e = enhancements[locale], n = news[locale];
  const [calculatorChoice,setCalculatorChoice] = useState({kind:"fd" as DepositKind,revision:0});
  const values = [HeartHandshake, FileCheck2, Users];
  const loanIcons = [Building2, BriefcaseBusiness, CarFront, GraduationCap, UserRound];
  return <div lang={locale} className={`site locale-${locale}`}>
    <SiteHeader locale={locale}/>
    <main id="main">
      <section className="hero" id="home"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow"><span className="tiny-line"/>{t.eyebrow}</span><h1>{t.hero}<em>{t.heroAccent}</em></h1><p>{t.intro}</p><div className="hero-buttons"><a className="button button-navy" href="#deposits">{t.explore}<ArrowUpRight size={18}/></a><a className="text-button" href="#calculator">{t.calculate}<ArrowRight size={17}/></a></div><div className="hero-bottom"><span className="leaf-medallion"><Leaf size={20}/></span><span>{t.scroll}</span></div></div><div className="hero-real-photo"><Image src="/inauguration/photo-1.jpg" alt={n.photoCaptions[0]} width={1280} height={853} sizes="(max-width: 700px) calc(100vw - 40px), 50vw" priority/><Link href={`/${locale}/blog`} className="hero-photo-caption"><span>{n.category}<strong>{e.eventDate} · Hubballi</strong></span><ArrowUpRight size={20}/></Link></div></div></section>
      <div className="highlights"><div className="container highlights-inner">{[`${Math.max(...deposits.fd.map(tier => tier.rate)).toFixed(2)}%`, `+${deposits.seniorBonus.toFixed(2)}%`, `${deposits.savings.toFixed(2)}%`].map((rate,i) => <div className="highlight" key={rate}><span className="highlight-icon">{i === 0 ? <Landmark/> : i === 1 ? <HeartHandshake/> : <Wallet/>}</span><div><span>{t.highlights[i]}</span><strong>{rate}<small>{t.pa}</small></strong></div></div>)}</div></div>
      <section className="section about" id="about"><div className="container about-grid"><div><span className="eyebrow">{t.aboutEyebrow}</span><h2>{t.aboutTitle}</h2><p className="section-intro">{t.aboutBody}</p><div className="registration"><ShieldCheck size={20}/><span>{t.registration}<strong>{society.registration}</strong></span></div></div><div className="value-list">{t.values.map((value,i) => { const Icon = values[i]; return <div className="value" key={value}><span className="icon-box"><Icon size={23}/></span><div><h3>{value}</h3><p>{t.valueDescriptions[i]}</p></div><span className="value-number">0{i+1}</span></div>; })}</div></div></section>
      <Leadership locale={locale}/>
      <section className="section deposits" id="deposits"><div className="container"><div className="section-heading"><div><span className="eyebrow">{t.depositEyebrow}</span><h2>{t.depositTitle}</h2></div><p>{t.depositIntro}</p></div><div className="deposit-grid">{(["fd", "rd"] as const).map(kind => <article className={`deposit-card ${kind}`} key={kind}><div className="deposit-card-top"><span className="icon-box">{kind === "fd" ? <Landmark/> : <CalendarDays/>}</span><span className="pill">{kind.toUpperCase()}</span></div><h3>{t[kind]}</h3><p>{kind === "fd" ? t.fdText : t.rdText}</p><div className="deposit-minimum">{e.minimum} <strong>₹{deposits.minimum[kind].toLocaleString("en-IN")}+</strong></div><table><thead><tr><th>{t.tenure}</th><th>{t.interestRate}</th></tr></thead><tbody>{deposits[kind].map(row => <tr key={row.months}><td>{row.months} {t.months} {kind === "fd" && row.months === 24 ? t.andAbove : ""}</td><td>{row.rate.toFixed(2)}<span>%</span></td></tr>)}</tbody></table><a className="card-link" href="#calculator" onClick={() => setCalculatorChoice(previous=>({kind,revision:previous.revision+1}))}>{t.estimate}<ArrowUpRight size={18}/></a></article>)}</div><div className="senior-banner"><HeartHandshake size={22}/><p>{t.senior}</p><span>+{deposits.seniorBonus.toFixed(2)}%</span></div><div className="small-deposits">{[{icon: Wallet,title: t.savings,rate: `${deposits.savings.toFixed(2)}%`,text:t.savingsText},{icon: HandCoins,title:t.monthly,rate:`${deposits.monthlyIncome.toFixed(2)}%`,text:t.monthlyText},{icon: Coins,title:t.pigmy,rate:`${deposits.pigmy.standard}–${deposits.pigmy.aboveTwoYears}%`,text:t.pigmyText}].map(({icon: Icon,title,rate,text}) => <article key={title}><Icon size={25}/><h3>{title}</h3><strong>{rate}<small>{t.pa}</small></strong><p>{text}</p></article>)}</div><details className="double-scheme"><summary><Sprout size={20}/>{t.double}<span>+</span></summary><p>{t.doubleText}</p></details><DepositComparison locale={locale}/><p className="fine-print rates-note">{t.terms}</p></div></section>
      <Membership locale={locale}/>
      <section className="section calculator-section" id="calculator"><div className="container"><div className="section-heading"><div><span className="eyebrow">{t.calcEyebrow}</span><h2>{t.calcTitle}</h2></div><p>{t.calcIntro}</p></div><Calculator key={calculatorChoice.revision} locale={locale} initialKind={calculatorChoice.kind}/></div></section>
      <section className="section loans" id="loans"><div className="container"><div className="section-heading"><div><span className="eyebrow">{t.loanEyebrow}</span><h2>{t.loanTitle}</h2></div><p>{t.loanIntro}</p></div><div className="loan-callout"><p>{e.loanHelp}</p><a className="button button-gold" href="#contact">{e.loanCta}<ArrowUpRight size={18}/></a></div><div className="loan-grid">{t.loans.map((title,i) => { const Icon = loanIcons[i]; return <a className="loan-card" href="#contact" key={title}><span className="icon-box"><Icon size={25}/></span><h3>{title}</h3><p>{t.loanTexts[i]}</p><ArrowUpRight className="loan-arrow" size={20}/></a>; })}</div></div></section>
      <InsuranceServices locale={locale}/>
      <MisPlan locale={locale}/>
      <BlogPreview locale={locale}/>
      <FrequentlyAsked locale={locale}/>
      <section className="section contact-section" id="contact"><div className="container"><div className="contact-heading"><span className="eyebrow">{t.contactEyebrow}</span><h2>{t.contactTitle}</h2><p>{t.contactIntro}</p></div><div className="contact-grid"><div className="contact-details"><div className="contact-item"><MapPin/><div><h3>{t.visit}</h3><p>{locale === "en" ? society.address : "ನಂ. 39, ಜೀವನ ಸಮೃದ್ಧಿ, 1ನೇ ಕ್ರಾಸ್, ವಿನಾಯಕನಗರ, ತತ್ವದರ್ಶ ಆಸ್ಪತ್ರೆ ಎದುರು, ವಿದ್ಯಾನಗರ, ಹುಬ್ಬಳ್ಳಿ – 580021"}</p><a href={society.mapsUrl} target="_blank" rel="noopener noreferrer">{t.directions}<ArrowUpRight size={15}/></a></div></div><div className="contact-item"><Phone/><div><h3>{t.call}</h3><a href={`tel:+91${society.officePhone}`}>{society.officePhone}</a><a href={`tel:+91${society.mobile}`}>+91 {society.mobile}</a>{society.additionalPhones.map(phone=><a href={`tel:+91${phone}`} key={phone}>+91 {phone}</a>)}<a className="whatsapp-link" href={`https://wa.me/${society.whatsapp}`} target="_blank" rel="noopener noreferrer">{e.whatsapp}<ArrowUpRight size={14}/></a></div></div><div className="contact-item"><Mail/><div><h3>{t.email}</h3><a className="email-link" href={`mailto:${society.email}`}>{society.email}</a></div></div><OfficeMap locale={locale}/></div><Enquiry locale={locale}/></div></div></section>
    </main>
    <SiteFooter locale={locale}/>
  </div>;
}
