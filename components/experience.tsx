"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancements: server-rendered content remains visible without JS. */
export function Experience() {
  const path = usePathname();
  const progress = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = available > 0 ? Math.min(1,Math.max(0,window.scrollY / available)) : 0;
      if(progress.current) progress.current.style.transform = `scaleX(${fraction})`;
    };
    const onScroll = () => { if(!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",onScroll);
    const selector = ".section-heading, .value, .founder-grid, .deposit-card, .small-deposits article, .membership-card, .loan-card, .insurance-grid article, .mis-calculator, .news-feature, .faq-item, .article-cover, .event-overview, .media-heading, .press-grid figure";
    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
    let observer: IntersectionObserver | undefined;
    if(!reduced.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        for(const entry of entries) if(entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.dataset.reveal = "visible";
          observer?.unobserve(element);
        }
      },{threshold:0,rootMargin:"0px 0px 20px 0px"});
      for(const target of targets) {
        if(target.getBoundingClientRect().top > window.innerHeight) {
          target.dataset.reveal = "pending";
          observer.observe(target);
        }
      }
    }
    const onMotionChange = () => {
      if(reduced.matches) { observer?.disconnect(); for(const target of targets) delete target.dataset.reveal; }
    };
    reduced.addEventListener("change",onMotionChange);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll",onScroll);
      window.removeEventListener("resize",onScroll);
      reduced.removeEventListener("change",onMotionChange);
      for(const target of targets) delete target.dataset.reveal;
    };
  },[path]);
  return <div className="reading-progress" aria-hidden="true"><span ref={progress}/></div>;
}
