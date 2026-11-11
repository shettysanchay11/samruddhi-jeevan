import { deposits } from "./society.ts";

export type DepositKind = "fd" | "rd";
export function getRate(kind: DepositKind, months: number, senior = false) {
  if (!Number.isInteger(months)) throw new Error("Tenure must be whole months.");
  let rate: number;
  if (kind === "fd") {
    if (![6, 12, 24, 36, 48, 60].includes(months)) throw new Error("Unsupported FD tenure.");
    rate = [...deposits.fd].reverse().find(tier => months >= tier.months)!.rate;
  } else {
    const tier = deposits.rd.find(tier => months === tier.months);
    if (!tier) throw new Error("Unsupported RD tenure.");
    rate = tier.rate;
  }
  return rate + (kind === "fd" && senior ? deposits.seniorBonus : 0);
}

export function calculateDeposit(kind: DepositKind, amount: number, months: number, senior = false) {
  if (!Number.isFinite(amount) || amount < deposits.minimum[kind] || amount > 100_000_000) {
    throw new Error(`Enter an amount from ₹${deposits.minimum[kind]} to ₹10,00,00,000.`);
  }
  const rate = getRate(kind, months, senior);
  const principal = kind === "fd" ? amount : amount * months;
  // FD: P*r*t. RD: sum simple interest on monthly instalments for n, n-1, ... 1 months.
  const interest = kind === "fd"
    ? amount * rate * months / 1200
    : amount * rate * months * (months + 1) / 2400;
  return { rate, principal, interest, maturity: principal + interest };
}

export function calculateMisPlan(amount: number, months: number, senior = false) {
  if (!Number.isFinite(amount) || amount < deposits.minimum.fd || amount > 100_000_000) throw new Error("Invalid MIS principal.");
  const rdRate = getRate("rd", months);
  const rate = deposits.monthlyIncome + (senior ? deposits.misSeniorBonus : 0);
  // Round DOWN to whole rupees so the illustrated RD instalment never exceeds the payout.
  const monthlyIncome = amount * rate / 1200;
  const rdInstalment = Math.floor(monthlyIncome);
  const rdEligible = rdInstalment >= deposits.minimum.rd;
  const totalIncome = monthlyIncome * months;
  // MIS interest is received at month-end: RD instalments earn for n-1, ... 0 months.
  const rdInterest = rdEligible ? rdInstalment * rdRate * months * (months - 1) / 2400 : 0;
  const rdPrincipal = rdEligible ? rdInstalment * months : 0;
  const uninvestedIncome = totalIncome - rdPrincipal;
  return { rate, rdRate, monthlyIncome, rdInstalment, rdEligible, totalIncome, rdInterest,
    rdPrincipal, uninvestedIncome, rdMaturity: rdPrincipal + rdInterest,
    totalValue: amount + totalIncome + rdInterest };
}
