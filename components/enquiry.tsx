"use client";
import { ArrowUpRight } from "lucide-react";
import { content, type Locale } from "@/lib/content";
import { society } from "@/lib/society";
export function Enquiry({ locale }: { locale: Locale }) {
  const t = content[locale];
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Website enquiry: ${data.get("subject")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
    window.location.href = `mailto:${society.email}?subject=${subject}&body=${body}`;
  }
  return <form className="enquiry-form" onSubmit={submit}>
    <h3>{t.enquiry}</h3>
    <div className="form-pair"><div><label htmlFor="enquiry-name">{t.name}</label><input id="enquiry-name" name="name" autoComplete="name" required maxLength={100} /></div><div><label htmlFor="enquiry-email">{t.enquiryEmail}</label><input id="enquiry-email" name="email" type="email" autoComplete="email" required maxLength={200} /></div></div>
    <label htmlFor="enquiry-subject">{t.interested}</label><select name="subject" id="enquiry-subject">{t.subjects.map(s => <option key={s}>{s}</option>)}</select>
    <label htmlFor="enquiry-message">{t.message}</label><textarea id="enquiry-message" name="message" required rows={4} maxLength={2000} />
    <button className="button button-navy" type="submit">{t.send}<ArrowUpRight size={18} aria-hidden="true" /></button>
    <p className="fine-print">{t.formNote}</p>
  </form>;
}
