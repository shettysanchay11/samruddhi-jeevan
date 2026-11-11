"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { type Locale } from "@/lib/content";
import { news, inauguration } from "@/lib/news";

export function PhotoGallery({ locale }: { locale: Locale }) {
  const n = news[locale];
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  function show(index: number) { setSelected(index); setOpen(true); dialog.current?.showModal(); }
  function close() { dialog.current?.close(); setOpen(false); }
  function move(delta: number) { setSelected(index => (index + delta + inauguration.photos.length) % inauguration.photos.length); }
  return <>
    <div className="photo-grid">{inauguration.photos.map((src,i) => <figure className={i === 0 ? "gallery-lead" : ""} key={src}>
      <button className="photo-button" type="button" onClick={() => show(i)} aria-label={`${n.photo} ${i+1}: ${n.photoCaptions[i]}`}><Image src={src} alt={n.photoCaptions[i]} width={1280} height={853} sizes={i === 0 ? "(max-width: 700px) calc(100vw - 40px), 60vw" : "(max-width: 500px) calc(100vw - 40px), (max-width: 700px) 45vw, 30vw"}/><span className="expand-photo"><Expand size={17}/></span></button>
      <figcaption><span>0{i+1}</span>{n.photoCaptions[i]}</figcaption>
    </figure>)}</div>
    <dialog className="photo-dialog" ref={dialog} aria-label={n.photos} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} onClick={e => { if(e.target === e.currentTarget) close(); }} onKeyDown={e => { if(e.key === "ArrowRight") { e.preventDefault(); move(1); } if(e.key === "ArrowLeft") { e.preventDefault(); move(-1); } }}>
      <div className="dialog-body"><button autoFocus className="dialog-close" type="button" aria-label={n.close} onClick={close}><X size={23}/></button>
        {open && <Image src={inauguration.photos[selected]} alt={n.photoCaptions[selected]} width={1280} height={853} sizes="95vw" className="dialog-photo"/>}
        <div className="dialog-controls"><button type="button" aria-label={n.previous} onClick={() => move(-1)}><ArrowLeft size={21}/></button><p aria-live="polite">{selected+1} / {inauguration.photos.length}<span>{n.photoCaptions[selected]}</span></p><button type="button" aria-label={n.next} onClick={() => move(1)}><ArrowRight size={21}/></button></div>
      </div>
    </dialog>
  </>;
}
