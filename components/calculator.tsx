"use client";
import { useState } from "react";
import { ArrowUpRight, Info, Printer } from "lucide-react";
import { calculateDeposit, type DepositKind } from "@/lib/calculators";
import { content, type Locale } from "@/lib/content";
import { enhancements } from "@/lib/enhancements";
import { deposits, society } from "@/lib/society";
import { flushSync } from "react-dom";

export function Calculator({ locale, initialKind = "fd" }: { locale: Locale; initialKind?: DepositKind }) {
  const t = content[locale], e = enhancements[locale];
  const [printDate, setPrintDate] = useState("");
  const [kind, setKind] = useState<DepositKind>(initialKind);
  const [amount, setAmount] = useState(initialKind === "fd" ? "100000" : "5000");
  const [months, setMonths] = useState(12);
  const [senior, setSenior] = useState(false);
  const value = Number(amount);
  const valid = amount.trim() !== "" && Number.isFinite(value) && value >= deposits.minimum[kind] && value <= 100_000_000;
  const result = valid ? calculateDeposit(kind, value, months, senior) : null;
  const money = (n: number) => new Intl.NumberFormat(locale === "kn" ? "kn-IN" : "en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
  function changeKind(next: DepositKind) {
    setKind(next); setMonths(12); setAmount(next === "fd" ? "100000" : "5000");
  }
  return <div className="calculator-shell">
    <div className="calculator-inputs">
      <div className="segmented" role="group" aria-label={locale === "en" ? "Deposit type" : "ಠೇವಣಿಯ ವಿಧ"}>
        <button type="button" aria-pressed={kind === "fd"} className={kind === "fd" ? "selected" : ""} onClick={() => changeKind("fd")}>{t.fd} <span>FD</span></button>
        <button type="button" aria-pressed={kind === "rd"} className={kind === "rd" ? "selected" : ""} onClick={() => changeKind("rd")}>{t.rd} <span>RD</span></button>
      </div>
      <label htmlFor="deposit-amount">{kind === "fd" ? t.amount : t.monthlyAmount}</label>
      <div className={`currency-input ${!valid ? "invalid" : ""}`}><span aria-hidden="true">₹</span><input id="deposit-amount" type="number" min={deposits.minimum[kind]} max="100000000" step="any" inputMode="decimal" value={amount} aria-invalid={!valid} aria-describedby={!valid ? "amount-error" : undefined} onChange={e => setAmount(e.target.value)} /></div>
      {!valid && <p className="error" id="amount-error">{locale === "en" ? `Enter an amount from ₹${deposits.minimum[kind].toLocaleString("en-IN")} to ₹10,00,00,000.` : `₹${deposits.minimum[kind].toLocaleString("en-IN")} ರಿಂದ ₹10,00,00,000 ಒಳಗಿನ ಮೊತ್ತ ನಮೂದಿಸಿ.`}</p>}
      <label htmlFor="deposit-tenure">{t.tenure}</label>
      <select id="deposit-tenure" value={months} onChange={e => setMonths(Number(e.target.value))}>
        {(kind === "fd" ? [6, 12, 24, 36, 48, 60] : [12, 24, 36]).map(n => <option key={n} value={n}>{n} {t.months}</option>)}
      </select>
      {kind === "fd" && <label className="checkbox-label"><input type="checkbox" checked={senior} onChange={e => setSenior(e.target.checked)} /><span>{t.seniorLabel}<small>{t.seniorHint}</small></span></label>}
      <p className="calculation-method"><Info size={15} aria-hidden="true" />{locale === "en" ? "Simple interest. Clear estimates." : "ಸರಳ ಬಡ್ಡಿ. ಸ್ಪಷ್ಟ ಅಂದಾಜು."}</p>
    </div>
    <div className="calculator-result" aria-live="polite" aria-atomic="true">
      <div className="result-top"><span>{t.maturity}</span><ArrowUpRight size={22} aria-hidden="true" /></div>
      <strong className="maturity" data-testid="maturity">{result ? money(result.maturity) : "—"}</strong>
      <div className="result-bar" aria-hidden="true"><span style={{ width: result ? `${result.principal / result.maturity * 100}%` : "100%" }} /></div>
      <dl><div><dt><i className="dot principal-dot" />{t.principal}</dt><dd>{result ? money(result.principal) : "—"}</dd></div><div><dt><i className="dot interest-dot" />{t.earned}</dt><dd data-testid="interest">{result ? money(result.interest) : "—"}</dd></div><div className="rate-row"><dt>{t.applicable}</dt><dd>{result ? `${result.rate.toFixed(2)}%` : "—"}</dd></div></dl>
      <p>{t.calcNote}</p>
      <button type="button" className="print-button" disabled={!result} onClick={() => { flushSync(() => setPrintDate(new Intl.DateTimeFormat(locale === "kn" ? "kn-IN" : "en-IN", { dateStyle: "long", timeZone: "Asia/Kolkata" }).format(new Date()))); window.print(); }}><Printer size={16}/>{e.print}</button>
    </div>
    <div className="print-estimate" aria-hidden="true"><h2>{t.brand}</h2><p>{t.legal}</p><p>{t.registration} {society.registration}</p><hr/><h3>{e.estimateTitle}</h3><p>{e.estimateDate}: {printDate}</p><dl><div><dt>{e.estimateKind}</dt><dd>{kind === "fd" ? t.fd : t.rd}</dd></div><div><dt>{kind === "fd" ? t.amount : t.monthlyAmount}</dt><dd>{money(value || 0)}</dd></div><div><dt>{t.tenure}</dt><dd>{months} {t.months}</dd></div><div><dt>{t.applicable}</dt><dd>{result?.rate.toFixed(2)}%</dd></div>{kind === "fd" && senior && <div><dt>{t.seniorLabel}</dt><dd>{locale === "en" ? "Yes" : "ಹೌದು"}</dd></div>}<div><dt>{t.principal}</dt><dd>{result ? money(result.principal) : "—"}</dd></div><div><dt>{t.earned}</dt><dd>{result ? money(result.interest) : "—"}</dd></div><div><dt>{t.maturity}</dt><dd>{result ? money(result.maturity) : "—"}</dd></div></dl><p>{t.calcNote}</p><p>{e.printNote}</p><hr/><p>{society.address}</p><p>{society.officePhone} · {society.email}</p></div>
  </div>;
}
