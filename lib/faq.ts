import { deposits, society } from "./society";
const rupees = (value: number) => `₹${value.toLocaleString("en-IN")}`;
export const faq = {
  en: {
    eyebrow:"A LITTLE CLARITY GOES A LONG WAY", title:"Questions? Let's make it simple.",
    intro:"A few useful answers before you take your next step. Our team can help with the details.",
    items:[
      {question:"How do I become a share member?",answer:`Share membership is ${rupees(society.shareMembership)} with a savings bank (SB) account. Visit our Hubballi office to discuss membership, required documents and account-opening steps.`},
      {question:"What is the minimum amount for FD and RD?",answer:`Fixed deposits start at ${rupees(deposits.minimum.fd)}. Recurring deposits start at ${rupees(deposits.minimum.rd)} per month. You can compare published rates and estimate your returns on this page.`},
      {question:"Are there additional benefits for senior citizens?",answer:`Senior citizens receive an additional ${deposits.seniorBonus.toFixed(2)} percentage points on fixed deposits. The Monthly Income Scheme offers ${(deposits.monthlyIncome + deposits.misSeniorBonus).toFixed(2)}% p.a. for senior citizens. Ask our team about eligibility.`},
      {question:"Can I put my monthly MIS interest into an RD?",answer:`Yes, this is an optional saving approach. If the monthly payout reaches the ${rupees(deposits.minimum.rd)} RD minimum, it can fund the monthly instalment. A smaller payout would need an additional contribution. The MIS + RD illustration explains the assumptions; confirm matching scheme terms with our team.`},
      {question:"How can I speak with the society?",answer:`Call ${society.officePhone}, use WhatsApp on +91 ${society.mobile}, or visit our Hubballi office between 10 am and 6 pm. All contact numbers, the address and directions are listed below.`},
    ],
  },
  kn: {
    eyebrow:"ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸ್ಪಷ್ಟ ಉತ್ತರ", title:"ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ಉತ್ತರಗಳನ್ನು ತಿಳಿಯಿರಿ.",
    intro:"ನಿಮ್ಮ ಮುಂದಿನ ಹೆಜ್ಜೆಗೆ ಉಪಯುಕ್ತ ಮಾಹಿತಿ. ಹೆಚ್ಚಿನ ವಿವರಗಳಿಗೆ ನಮ್ಮ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    items:[
      {question:"ಷೇರು ಸದಸ್ಯರಾಗುವುದು ಹೇಗೆ?",answer:`ಉಳಿತಾಯ ಬ್ಯಾಂಕ್ (ಎಸ್‌ಬಿ) ಖಾತೆಯೊಂದಿಗೆ ಷೇರು ಸದಸ್ಯತ್ವದ ಮೊತ್ತ ${rupees(society.shareMembership)}. ಸದಸ್ಯತ್ವ, ಅಗತ್ಯ ದಾಖಲೆಗಳು ಮತ್ತು ಖಾತೆ ತೆರೆಯುವ ಕ್ರಮದ ಬಗ್ಗೆ ತಿಳಿಯಲು ಹುಬ್ಬಳ್ಳಿಯ ಕಚೇರಿಗೆ ಭೇಟಿ ನೀಡಿ.`},
      {question:"ಎಫ್‌ಡಿ ಮತ್ತು ಆರ್‌ಡಿಗೆ ಕನಿಷ್ಠ ಮೊತ್ತ ಎಷ್ಟು?",answer:`ನಿಶ್ಚಿತ ಠೇವಣಿಯ ಕನಿಷ್ಠ ಮೊತ್ತ ${rupees(deposits.minimum.fd)}. ಮರುಕಳಿಸುವ ಠೇವಣಿಯ ಕನಿಷ್ಠ ಮಾಸಿಕ ಕಂತು ${rupees(deposits.minimum.rd)}. ಈ ಪುಟದಲ್ಲಿ ಬಡ್ಡಿದರಗಳನ್ನು ಹೋಲಿಸಿ, ಅಂದಾಜು ಆದಾಯವನ್ನು ಲೆಕ್ಕಹಾಕಬಹುದು.`},
      {question:"ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಹೆಚ್ಚುವರಿ ಸೌಲಭ್ಯವಿದೆಯೇ?",answer:`ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ನಿಶ್ಚಿತ ಠೇವಣಿಗಳ ಮೇಲೆ ಹೆಚ್ಚುವರಿ ${deposits.seniorBonus.toFixed(2)} ಶೇಕಡಾ ಅಂಕಗಳ ಬಡ್ಡಿ ಇದೆ. ಮಾಸಿಕ ಆದಾಯ ಯೋಜನೆಯಲ್ಲಿ ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ವಾರ್ಷಿಕ ${(deposits.monthlyIncome + deposits.misSeniorBonus).toFixed(2)}% ಬಡ್ಡಿ ಇದೆ. ಅರ್ಹತೆಯ ವಿವರಗಳನ್ನು ನಮ್ಮ ತಂಡದಲ್ಲಿ ತಿಳಿಯಿರಿ.`},
      {question:"ಎಂಐಎಸ್‌ನ ಮಾಸಿಕ ಬಡ್ಡಿಯನ್ನು ಆರ್‌ಡಿಯಲ್ಲಿ ಉಳಿಸಬಹುದೇ?",answer:`ಹೌದು, ಇದು ಐಚ್ಛಿಕ ಉಳಿತಾಯದ ಆಯ್ಕೆ. ಮಾಸಿಕ ಪಾವತಿಯು ಆರ್‌ಡಿಯ ಕನಿಷ್ಠ ${rupees(deposits.minimum.rd)} ತಲುಪಿದರೆ, ಅದನ್ನು ಮಾಸಿಕ ಕಂತಾಗಿ ಬಳಸಬಹುದು. ಕಡಿಮೆ ಪಾವತಿಗೆ ಹೆಚ್ಚುವರಿ ಕೊಡುಗೆ ಬೇಕಾಗುತ್ತದೆ. ಎಂಐಎಸ್ + ಆರ್‌ಡಿ ಉದಾಹರಣೆಯ ಪರಿಗಣನೆಗಳನ್ನು ನೋಡಿ; ಯೋಜನೆಗಳ ಷರತ್ತುಗಳನ್ನು ನಮ್ಮ ತಂಡದಲ್ಲಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.`},
      {question:"ಸಂಘವನ್ನು ಹೇಗೆ ಸಂಪರ್ಕಿಸಬಹುದು?",answer:`${society.officePhone} ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ, +91 ${society.mobile} ಸಂಖ್ಯೆಗೆ ವಾಟ್ಸಾಪ್ ಮಾಡಿ ಅಥವಾ ಬೆಳಿಗ್ಗೆ 10ರಿಂದ ಸಂಜೆ 6ರೊಳಗೆ ಹುಬ್ಬಳ್ಳಿಯ ಕಚೇರಿಗೆ ಭೇಟಿ ನೀಡಿ. ಸಂಪರ್ಕ ಸಂಖ್ಯೆಗಳು, ವಿಳಾಸ ಮತ್ತು ದಾರಿ ಕೆಳಗೆ ನೀಡಲಾಗಿದೆ.`},
    ],
  },
};
