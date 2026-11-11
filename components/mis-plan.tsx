"use client";
import { useState } from "react";
import { ArrowRight, HandCoins, Info } from "lucide-react";
import { deposits } from "@/lib/society";
import { calculateMisPlan } from "@/lib/calculators";
import { content, type Locale } from "@/lib/content";
import { enhancements } from "@/lib/enhancements";

export function MisPlan({ locale }: { locale: Locale }) {
  const e = enhancements[locale], t = content[locale];
  const [amount,setAmount] = useState("200000"), [months,setMonths] = useState(24), [senior,setSenior] = useState(false);
  const value = Number(amount);
  const valid = amount.trim() !== "" && Number.isFinite(value) && value >= deposits.minimum.fd && value <= 100_000_000;
  const result = valid ? calculateMisPlan(value,months,senior) : null;
  const money = (n: number) => new Intl.NumberFormat(locale === "kn" ? "kn-IN" : "en-IN", {style:"currency",currency:"INR",maximumFractionDigits:2}).format(n);
  return <section className="section mis-section" id="monthly-income"><div className="container">
    <div className="section-heading"><div><span className="eyebrow">{e.misEyebrow}</span><h2>{e.misTitle}</h2></div><p>{e.misIntro}</p></div>
    <div className="mis-rates"><div><HandCoins size={27}/><span>{e.misStandard}</span><strong>{deposits.monthlyIncome.toFixed(2)}%<small>{t.pa}</small></strong></div><div><span>{e.misSenior}</span><strong>{(deposits.monthlyIncome + deposits.misSeniorBonus).toFixed(2)}%<small>{t.pa}</small></strong></div></div>
    <ol className="mis-steps">{e.misSteps.map((title,i) => <li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{e.misStepDescriptions[i]}</p>{i < 2 && <ArrowRight size={18} aria-hidden="true"/>}</li>)}</ol>
    <div className="mis-calculator"><div className="mis-inputs"><h3>{e.misCalc}</h3><label htmlFor="mis-amount">{e.misAmount}</label><input id="mis-amount" inputMode="decimal" type="number" step="any" min={deposits.minimum.fd} max="100000000" value={amount} onChange={ev=>setAmount(ev.target.value)} aria-invalid={!valid} aria-describedby={!valid ? "mis-error" : undefined}/>{!valid && <p className="error" id="mis-error">{e.minimum}: ₹{deposits.minimum.fd.toLocaleString("en-IN")} · {locale === "en" ? "Maximum" : "ಗರಿಷ್ಠ"}: ₹10,00,00,000</p>}<label htmlFor="mis-tenure">{e.misTenure}</label><select id="mis-tenure" value={months} onChange={ev=>setMonths(Number(ev.target.value))}>{deposits.rd.map(tier=><option key={tier.months} value={tier.months}>{tier.months} {t.months} · RD {tier.rate.toFixed(2)}%</option>)}</select><label className="checkbox-label"><input type="checkbox" checked={senior} onChange={ev=>setSenior(ev.target.checked)}/><span>{t.seniorLabel}<small>{(deposits.monthlyIncome + deposits.misSeniorBonus).toFixed(2)}% {t.pa}</small></span></label></div>
    <div className="mis-results" aria-live="polite"><dl><div className="mis-monthly"><dt>{e.misMonthly}</dt><dd data-testid="mis-monthly">{result ? money(result.monthlyIncome) : "—"}</dd></div><div><dt>{e.misInstalment}</dt><dd>{result?.rdEligible ? money(result.rdInstalment) : "—"}</dd></div><div><dt>{e.misExtra}</dt><dd data-testid="mis-extra">{result?.rdEligible ? money(result.rdInterest) : "—"}</dd></div><div className="mis-total"><dt>{e.misTotal}</dt><dd data-testid="mis-total">{result ? money(result.totalValue) : "—"}</dd></div></dl>{result && !result.rdEligible && <p className="mis-warning"><Info size={17}/>{e.misNotEligible}</p>}</div></div>
    <p className="fine-print mis-note">{e.misNote}</p>
  </div></section>;
}
