import test from "node:test";
import assert from "node:assert/strict";
import { calculateDeposit, calculateMisPlan, getRate } from "../lib/calculators.ts";

test("FD uses simple interest and the new photo's tiers", () => {
  assert.deepEqual(calculateDeposit("fd", 100000, 12), {rate:8.5,principal:100000,interest:8500,maturity:108500});
  assert.equal(calculateDeposit("fd", 100000, 6).interest, 3750);
  assert.equal(calculateDeposit("fd", 100000, 24).maturity, 119000);
  assert.equal(calculateDeposit("fd", 100000, 60).maturity, 147500);
});
test("senior bonus is 0.5 percentage points and applies only to FD", () => {
  assert.equal(calculateDeposit("fd",100000,12,true).maturity,109000);
  assert.equal(getRate("rd",12,true),7.5);
});
test("RD calculates each instalment's simple interest independently", () => {
  for (const [months, rate] of [[12,7.5],[24,8],[36,9]]) {
    const monthly = 5000;
    let expectedInterest = 0;
    for (let remaining = months; remaining >= 1; remaining--) expectedInterest += monthly * rate / 100 * remaining / 12;
    const actual = calculateDeposit("rd",monthly,months);
    assert.ok(Math.abs(actual.interest - expectedInterest) < 0.00001);
    assert.equal(actual.principal,monthly * months);
    assert.equal(actual.rate,rate);
  }
  assert.equal(calculateDeposit("rd",5000,24).maturity,130000);
});
test("rejects invalid amounts and unsupported tenures", () => {
  for (const amount of [NaN,Infinity,0,-1,100000001]) assert.throws(() => calculateDeposit("fd",amount,12));
  for (const tenure of [0,7,13,24.5,Infinity]) assert.throws(() => calculateDeposit("fd",1000,tenure));
  assert.throws(() => calculateDeposit("rd",1000,6));
});

test("enforces FD and RD minimums at their exact boundaries", () => {
  assert.throws(() => calculateDeposit("fd",49999,12));
  assert.equal(calculateDeposit("fd",50000,12).principal,50000);
  assert.throws(() => calculateDeposit("rd",999,12));
  assert.equal(calculateDeposit("rd",1000,12).principal,12000);
});

test("MIS uses separate 8% / 8.5% rates and only reinvests eligible payouts", () => {
  const low = calculateMisPlan(50000,24);
  assert.equal(low.rate,8);
  assert.equal(low.rdEligible,false);
  assert.equal(low.rdInterest,0);
  assert.equal(low.totalValue,50000 + low.totalIncome);
  assert.equal(calculateMisPlan(50000,24,true).rate,8.5);
  assert.equal(calculateMisPlan(150000,24).rdEligible,true);
  assert.equal(calculateMisPlan(149999,24).rdEligible,false);
  assert.throws(()=>calculateMisPlan(49999,24));
  assert.throws(()=>calculateMisPlan(200000,6));
});

test("MIS+RD uses month-end instalments without double-counting income or principal", () => {
  const plan = calculateMisPlan(150000,24);
  assert.equal(plan.monthlyIncome,1000);
  let expectedInterest=0;
  for(let remaining=23;remaining>=0;remaining--) expectedInterest += 1000 * 0.08 * remaining / 12;
  assert.ok(Math.abs(plan.rdInterest - expectedInterest)<0.00001);
  assert.equal(plan.rdMaturity,25840);
  assert.equal(plan.totalValue,175840);
  const fractional = calculateMisPlan(200000,24);
  assert.equal(fractional.rdInstalment,1333);
  assert.ok(fractional.uninvestedIncome>0);
  assert.ok(Math.abs(fractional.totalValue - (200000 + fractional.rdMaturity + fractional.uninvestedIncome))<0.00001);
});
