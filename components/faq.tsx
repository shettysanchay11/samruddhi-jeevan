import { Plus } from "lucide-react";
import { type Locale } from "@/lib/content";
import { faq } from "@/lib/faq";

export function FrequentlyAsked({locale}: {locale:Locale}) {
  const f = faq[locale];
  return <section className="section faq-section" id="questions"><div className="container faq-layout"><div className="faq-heading"><span className="eyebrow">{f.eyebrow}</span><h2>{f.title}</h2><p>{f.intro}</p></div><div className="faq-list">{f.items.map((item,index)=><details className="faq-item" name={`society-questions-${locale}`} key={item.question}><summary><span className="faq-number">0{index+1}</span><span>{item.question}</span><Plus size={19} aria-hidden="true"/></summary><div className="faq-answer"><p>{item.answer}</p></div></details>)}</div></div></section>;
}
