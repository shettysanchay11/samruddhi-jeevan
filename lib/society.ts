// Developer-managed source of truth. Rates are from the latest supplied photograph.
// Update this file, run npm test and npm run build, then redeploy to Vercel.
export const society = {
  name: "Samruddhi Jeevan Souharda Credit Co-operative Society Ltd.",
  registration: "DRZ/RSR/RGN/7296/2026-27",
  email: "samruddhijeevan1@gmail.com",
  officePhone: "08363145422",
mobile: "7625038036",
additionalPhones: ["9448273803", "8310964082"],
whatsapp: "917625038036",
  officeHours: { open: "10:00", close: "18:00" },
  shareMembership: 2500,
  address: "No. 39, Jeevan Samruddhi, 1st Cross, Vinayaknagar, Opp. Tatwadarsha Hospital, Vidyanagar, Hubballi – 580021",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=No.+39+Jeevan+Samruddhi+1st+Cross+Vinayaknagar+Tatwadarsha+Hospital+Vidyanagar+Hubballi+580021",
  
  mapEmbedUrl: "https://www.google.com/maps?q=No.+39+Jeevan+Samruddhi+1st+Cross+Vinayaknagar+Tatwadarsha+Hospital+Vidyanagar+Hubballi+580021&output=embed",
};
export const deposits = {
  fd: [{ months: 6, rate: 7.5 }, { months: 12, rate: 8.5 }, { months: 24, rate: 9.5 }],
  rd: [{ months: 12, rate: 7.5 }, { months: 24, rate: 8 }, { months: 36, rate: 9 }],
  seniorBonus: 0.5,
  savings: 4,
  monthlyIncome: 8,
  misSeniorBonus: 0.5,
  minimum: { fd: 50000, rd: 1000 },
  pigmy: { standard: 4, aboveTwoYears: 5, minimum: 500 },
};
